"""Evaluation script for MindfulMinutes. Standard library only.

Runs real checks against the repository files and writes evals/results.json.
Checks that cannot run here (browser accessibility, performance) are reported as "not_run",
never as passed.  Usage:  python evals/run_evals.py
"""
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "frontend" / "src" / "data"
SRC = ROOT / "frontend" / "src"

results = []


def check(name, category, passed, detail="", level="fail"):
    status = "pass" if passed else level  # level: "fail" or "warn"
    results.append({"name": name, "category": category, "status": status, "detail": detail})


def load(name):
    return json.loads((DATA / name).read_text(encoding="utf-8"))


article, exercise, research, reflect = (load(n) for n in ("article.json", "exercise.json", "research.json", "reflect.json"))

# ---- Content coverage -------------------------------------------------------
for theme in article["themes"]:
    covered = any(theme in s["themes"] for s in article["sections"])
    check(f"article covers theme: {theme}", "content", covered)

for s in article["sections"]:
    ok = all(s.get(k) for k in ("idea", "simple", "example"))
    check(f"section '{s['id']}' has idea/simple/example", "content", ok)

check("reflection prompts present (>=3)", "content", len(reflect["prompts"]) >= 3)

# ---- Research entries -------------------------------------------------------
required = ("id", "topic", "type", "title", "organisation", "investigated", "relevance", "url")
for item in research["items"]:
    missing = [f for f in required if not item.get(f)]
    check(f"research '{item.get('id')}' has required fields", "research", not missing, f"missing: {missing}")
    check(f"research '{item.get('id')}' url is https", "research", bool(re.match(r"^https://[^\s]+$", item.get("url", ""))))
    check(f"research '{item.get('id')}' has a caution/limitation", "research", bool(item.get("caution")), level="warn")
    check(
        f"research '{item.get('id')}' manually verified by author",
        "research",
        bool(item.get("manuallyVerified")),
        "Open the link and confirm the description, then set manuallyVerified to true.",
        level="warn",
    )
urls = [i["url"] for i in research["items"]]
check("no duplicate research URLs", "research", len(urls) == len(set(urls)))

# ---- Exercise safety / instruction adherence -------------------------------
check("exercise has >= 3 steps", "exercise", len(exercise["steps"]) >= 3)
check("every step has title, text and seconds", "exercise", all(s.get("title") and s.get("text") and s.get("seconds") for s in exercise["steps"]))
check("exercise declares stop-anytime", "exercise", exercise.get("stopAnytime") is True)
check("stop option stated in step text or safety note", "exercise", "stop at any time" in json.dumps(exercise).lower())

PROMISES = re.compile(r"(you will feel (calm|better|relaxed)|guarantee|cures?\b|will remove (your )?(stress|anxiety)|\bheal(ing|s)?\b)", re.I)
public_text = json.dumps({"article": article, "exercise": exercise, "research": research, "reflect": reflect})
hits = sorted(set(m.group(0).lower() for m in PROMISES.finditer(public_text)))
# "cure" legitimately appears in cautionary sentences such as "not a cure"; flag only as warning for review.
check("no outcome/cure promises detected (manual review of any hits)", "instruction", not hits, f"hits: {hits}", level="warn")

# ---- Source code hygiene ----------------------------------------------------
jsx_files = list(SRC.rglob("*.jsx")) + list(SRC.rglob("*.js"))
bad_links = []
for f in jsx_files:
    t = f.read_text(encoding="utf-8")
    if 'target="_blank"' in t and "noopener" not in t:
        bad_links.append(str(f.relative_to(ROOT)))
check("all target=_blank links use noopener", "security", not bad_links, str(bad_links))

secret_re = re.compile(r"(sk-[A-Za-z0-9]{20,}|api[_-]?key\s*[:=]\s*['\"][^'\"]+['\"]|password\s*[:=]\s*['\"][^'\"]+['\"])", re.I)
leaks = [str(f.relative_to(ROOT)) for f in ROOT.rglob("*") if f.is_file() and f.suffix in {".js", ".jsx", ".py", ".json", ".md", ".yml"} and "node_modules" not in f.parts and f.name != "run_evals.py" and secret_re.search(f.read_text(encoding="utf-8", errors="ignore"))]
check("no obvious secrets in repository files", "security", not leaks, str(leaks))

check("no dangerouslySetInnerHTML (safe rendering)", "security", not any("dangerouslySetInnerHTML" in f.read_text(encoding="utf-8") for f in jsx_files))
check("no console.log / debugger left in src", "quality", not any(re.search(r"console\.log|debugger", f.read_text(encoding="utf-8")) for f in jsx_files if ".test." not in f.name))

# ---- HTML shell -------------------------------------------------------------
html = (ROOT / "frontend" / "index.html").read_text(encoding="utf-8")
check("index.html has lang attribute", "accessibility", 'lang="en"' in html)
check("index.html has a meaningful <title>", "accessibility", bool(re.search(r"<title>[^<]{10,}</title>", html)))
check("index.html has viewport meta", "accessibility", 'name="viewport"' in html)

# ---- Not run here -----------------------------------------------------------
for name, how in (
    ("browser accessibility audit (axe / Lighthouse)", "Run Lighthouse in Chrome DevTools on the deployed URL and record the scores."),
    ("performance audit", "Run Lighthouse (Performance) on the deployed URL and record the score."),
    ("live link check", "cd frontend && npm run check:links (needs internet)."),
):
    results.append({"name": name, "category": "manual", "status": "not_run", "detail": how})

summary = {s: sum(1 for r in results if r["status"] == s) for s in ("pass", "fail", "warn", "not_run")}
report = {"generatedAt": datetime.now(timezone.utc).isoformat(), "summary": summary, "results": results}
(ROOT / "evals" / "results.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

print(json.dumps(summary))
for r in results:
    if r["status"] in ("fail", "warn"):
        print(f"[{r['status'].upper()}] {r['name']} {r['detail']}")
sys.exit(1 if summary["fail"] else 0)
