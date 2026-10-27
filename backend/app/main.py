"""Small, read-only API for MindfulMinutes.

Purpose: serve the curated research list (single source of truth is the frontend JSON file)
and a health check. It stores nothing and accepts no user text.
"""
import json
import logging
import os
from functools import lru_cache
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, field_validator

logger = logging.getLogger("mindfulminutes")

DEFAULT_DATA = Path(__file__).resolve().parents[2] / "frontend" / "src" / "data" / "research.json"


class ResearchItem(BaseModel):
    id: str
    topic: str
    type: str
    title: str
    organisation: str
    investigated: str
    relevance: str
    url: str
    authors: str | None = None
    year: int | None = None
    caution: str | None = None
    manuallyVerified: bool = False

    @field_validator("url")
    @classmethod
    def url_must_be_https(cls, v: str) -> str:
        if not v.startswith("https://"):
            raise ValueError("url must start with https://")
        return v


@lru_cache(maxsize=1)
def load_research() -> list[ResearchItem]:
    path = Path(os.getenv("RESEARCH_DATA", DEFAULT_DATA))
    with path.open(encoding="utf-8") as fh:
        raw = json.load(fh)
    return [ResearchItem(**item) for item in raw["items"]]


def create_app() -> FastAPI:
    app = FastAPI(title="MindfulMinutes API", version="1.0.0", docs_url="/docs")

    origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",") if o.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_methods=["GET"],
        allow_headers=["Content-Type"],
    )

    @app.exception_handler(Exception)
    async def unexpected_error(_: Request, exc: Exception):
        # Log details on the server only; never return stack traces to the client.
        logger.error("Unhandled error: %s", type(exc).__name__)
        return JSONResponse(status_code=500, content={"detail": "Something went wrong. Please try again later."})

    @app.get("/api/health")
    def health():
        return {"status": "ok"}

    @app.get("/api/research", response_model=list[ResearchItem])
    def research(type: str | None = None):
        items = load_research()
        if type:
            items = [i for i in items if i.type.lower() == type.lower()]
        return items

    @app.get("/api/research/{item_id}", response_model=ResearchItem)
    def research_item(item_id: str):
        for item in load_research():
            if item.id == item_id:
                return item
        raise HTTPException(status_code=404, detail="Research item not found")

    return app


app = create_app()
