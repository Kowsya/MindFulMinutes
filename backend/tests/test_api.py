from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app, raise_server_exceptions=False)


def test_health():
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_research_list_is_valid_and_https():
    r = client.get("/api/research")
    assert r.status_code == 200
    items = r.json()
    assert len(items) >= 3
    assert all(i["url"].startswith("https://") for i in items)


def test_research_filter_by_type():
    r = client.get("/api/research", params={"type": "Official guidance"})
    assert r.status_code == 200
    assert all(i["type"] == "Official guidance" for i in r.json())


def test_research_item_found_and_missing():
    first = client.get("/api/research").json()[0]["id"]
    assert client.get(f"/api/research/{first}").status_code == 200
    missing = client.get("/api/research/nope")
    assert missing.status_code == 404
    assert missing.json()["detail"] == "Research item not found"


def test_unexpected_error_hides_details(monkeypatch):
    def boom():
        raise RuntimeError("secret internal path /etc/passwd")

    monkeypatch.setattr("app.main.load_research", boom)
    r = client.get("/api/research")
    assert r.status_code == 500
    assert "secret" not in r.text and "Traceback" not in r.text


def test_cors_allows_only_configured_origin():
    ok = client.get("/api/health", headers={"Origin": "http://localhost:5173"})
    assert ok.headers.get("access-control-allow-origin") == "http://localhost:5173"
    bad = client.get("/api/health", headers={"Origin": "https://evil.example"})
    assert "access-control-allow-origin" not in bad.headers
