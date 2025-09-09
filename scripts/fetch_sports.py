# scripts/fetch_sports.py
import os, json, datetime, time
from typing import Dict, Any, List
import requests, feedparser

OUT_PATH = "data/sports-latest.json"

def daterange_days_back(days_back: int = 3):
    # window: Fri..Mon around "now" in America/New_York (approx using UTC offset -4/-5 naive)
    today = datetime.date.today()
    start = today - datetime.timedelta(days=days_back)
    end = today
    return start, end

def get_json(url: str, headers: Dict[str, str] = None, params: Dict[str, str] = None, timeout: int = 20):
    r = requests.get(url, headers=headers or {}, params=params or {}, timeout=timeout)
    r.raise_for_status()
    return r.json()

def get_rss_top(url: str, n: int = 5) -> List[Dict[str, Any]]:
    d = feedparser.parse(url)
    out = []
    for e in d.entries[:n]:
        out.append({
            "title": getattr(e, "title", ""),
            "link": getattr(e, "link", ""),
            "published": getattr(e, "published", ""),
        })
    return out

def scan_nfl(espan_ok: bool, start: datetime.date, end: datetime.date):
    data = {"headlines": [], "scores": []}
    # news via ESPN RSS
    try:
        data["headlines"] = get_rss_top("https://www.espn.com/espn/rss/nfl/news", 6)
    except Exception as e:
        data.setdefault("errors", []).append(f"nfl_rss:{e}")
    # scores (optional unofficial ESPN JSON)
    if espan_ok:
        try:
            # ESPN scoreboard supports single date; pull multiple days and merge
            day = start
            seen = set()
            while day <= end:
                url = f"https://site.api.espn.com/apis/v2/sports/football/nfl/scoreboard"
                js = get_json(url, params={"dates": day.strftime("%Y%m%d")})
                for ev in js.get("events", []):
                    comp = ev.get("competitions", [{}])[0]
                    teams = comp.get("competitors", [])
                    if len(teams) == 2:
                        away = [t for t in teams if t.get("homeAway") == "away"][0]
                        home = [t for t in teams if t.get("homeAway") == "home"][0]
                        key = (away["team"]["abbreviation"], home["team"]["abbreviation"], ev.get("id"))
                        if key in seen: 
                            continue
                        seen.add(key)
                        data["scores"].append({
                            "date": day.isoformat(),
                            "away": away["team"]["displayName"],
                            "awayScore": away.get("score"),
                            "home": home["team"]["displayName"],
                            "homeScore": home.get("score"),
                            "status": comp.get("status", {}).get("type", {}).get("state")
                        })
                day += datetime.timedelta(days=1)
        except Exception as e:
            data.setdefault("errors", []).append(f"nfl_scores:{e}")
    return data

def scan_nba(start: datetime.date, end: datetime.date):
    data = {"headlines": [], "scores": []}
    try:
        data["headlines"] = get_rss_top("https://www.espn.com/espn/rss/nba/news", 6)
    except Exception as e:
        data.setdefault("errors", []).append(f"nba_rss:{e}")
    # optional: balldontlie season scores (in-season). Keep as headlines-only for preseason.
    return data

def scan_mlb(start: datetime.date, end: datetime.date):
    data = {"headlines": [], "scores": []}
    try:
        data["headlines"] = get_rss_top("https://www.espn.com/espn/rss/mlb/news", 6)
    except Exception as e:
        data.setdefault("errors", []).append(f"mlb_rss:{e}")
    # MLB Stats API schedule
    try:
        js = get_json("https://statsapi.mlb.com/api/v1/schedule", params={
            "sportId": 1,
            "startDate": start.isoformat(),
            "endDate": end.isoformat()
        })
        for d in js.get("dates", []):
            for g in d.get("games", []):
                data["scores"].append({
                    "date": d.get("date"),
                    "away": g.get("teams", {}).get("away", {}).get("team", {}).get("name"),
                    "awayScore": g.get("teams", {}).get("away", {}).get("score"),
                    "home": g.get("teams", {}).get("home", {}).get("team", {}).get("name"),
                    "homeScore": g.get("teams", {}).get("home", {}).get("score"),
                    "status": g.get("status", {}).get("detailedState")
                })
    except Exception as e:
        data.setdefault("errors", []).append(f"mlb_scores:{e}")
    return data

def scan_wnba(start: datetime.date, end: datetime.date):
    data = {"headlines": [], "scores": []}
    try:
        data["headlines"] = get_rss_top("https://www.espn.com/espn/rss/wnba/news", 6)
    except Exception as e:
        data.setdefault("errors", []).append(f"wnba_rss:{e}")
    # Score endpoints often blocked; keep to headlines.
    return data

def scan_ncaaf(cfbd_key: str, start: datetime.date, end: datetime.date):
    data = {"headlines": [], "scores": []}
    try:
        data["headlines"] = get_rss_top("https://www.espn.com/espn/rss/college-football/news", 6)
    except Exception as e:
        data.setdefault("errors", []).append(f"ncaaf_rss:{e}")
    if cfbd_key:
        try:
            headers = {"Authorization": f"Bearer {cfbd_key}"}
            # Get games within window
            for day in (start + datetime.timedelta(n) for n in range((end-start).days+1)):
                js = get_json("https://api.collegefootballdata.com/games", headers=headers, params={
                    "year": day.year, "seasonType": "regular", "startWeek": "", "endWeek": "", "date": day.isoformat()
                })
                for g in js:
                    data["scores"].append({
                        "date": g.get("start_date") or day.isoformat(),
                        "away": g.get("away_team"),
                        "awayScore": g.get("away_points"),
                        "home": g.get("home_team"),
                        "homeScore": g.get("home_points"),
                        "status": g.get("status")
                    })
        except Exception as e:
            data.setdefault("errors", []).append(f"ncaaf_scores:{e}")
    return data

def scan_nhl(start: datetime.date, end: datetime.date):
    data = {"headlines": [], "scores": []}
    try:
        data["headlines"] = get_rss_top("https://www.espn.com/espn/rss/nhl/news", 6)
    except Exception as e:
        data.setdefault("errors", []).append(f"nhl_rss:{e}")
    try:
        js = get_json("https://statsapi.web.nhl.com/api/v1/schedule", params={
            "startDate": start.isoformat(),
            "endDate": end.isoformat()
        })
        for d in js.get("dates", []):
            for g in d.get("games", []):
                data["scores"].append({
                    "date": d.get("date"),
                    "away": g.get("teams", {}).get("away", {}).get("team", {}).get("name"),
                    "awayScore": g.get("teams", {}).get("away", {}).get("score"),
                    "home": g.get("teams", {}).get("home", {}).get("team", {}).get("name"),
                    "homeScore": g.get("teams", {}).get("home", {}).get("score"),
                    "status": g.get("status", {}).get("detailedState")
                })
    except Exception as e:
        data.setdefault("errors", []).append(f"nhl_scores:{e}")
    return data

def scan_nascar(start: datetime.date, end: datetime.date):
    data = {"headlines": [], "scores": []}
    try:
        data["headlines"] = get_rss_top("https://www.espn.com/espn/rss/racing/news", 6)  # includes NASCAR
    except Exception as e:
        data.setdefault("errors", []).append(f"nascar_rss:{e}")
    # Many NASCAR endpoints are unofficial; leave scores empty or add custom later.
    return data

def main():
    start, end = daterange_days_back(4)
    cfbd = os.environ.get("CFBD_API_KEY", "").strip()
    allow_espn = os.environ.get("ALLOW_UNOFFICIAL_ESPN", "").strip() == "1"

    out = {
        "generated": datetime.datetime.utcnow().isoformat() + "Z",
        "window": {"start": start.isoformat(), "end": end.isoformat()},
        "sources": {
            "rss": "ESPN sport-specific RSS feeds",
            "mlb": "MLB Stats API",
            "nhl": "NHL Stats API",
            "ncaaf": "College Football Data API (optional key)",
            "nfl": "ESPN scoreboard JSON (optional; unofficial)"
        },
        "sports": {
            "nfl": scan_nfl(allow_espn, start, end),
            "nba": scan_nba(start, end),
            "mlb": scan_mlb(start, end),
            "wnba": scan_wnba(start, end),
            "ncaaf": scan_ncaaf(cfbd, start, end),
            "nhl": scan_nhl(start, end),
            "nascar": scan_nascar(start, end)
        }
    }

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2)
    print(f"Wrote {OUT_PATH} with sections: {', '.join(out['sports'].keys())}")

if __name__ == "__main__":
    main()
