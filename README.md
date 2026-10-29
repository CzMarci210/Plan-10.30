# 🏁 GRIDLINE RaceHub

## Download

### [⬇ Download the server app ZIP](https://github.com/CzMarci210/Plan-10.30/archive/refs/heads/main.zip)

Unzip it, then on Windows double-click **Start-GRIDLINE.cmd**. It checks for Node.js 24+, starts GRIDLINE and opens your browser when ready. No npm install or additional packages are needed. If Node.js is missing, the launcher opens its official download page. Keep the server window open while using the app; Ctrl+C stops it.

On macOS/Linux: install Node.js 24+, open the extracted folder in a terminal, run `npm start`, and visit **http://127.0.0.1:3000**.

### [⬇ Download the simpler offline HTML](https://github.com/CzMarci210/Plan-10.30/raw/refs/heads/main/GRIDLINE.html)

Save the file and double-click it. This separate, earlier edition needs no installation and includes the calendar, event editor, five languages and standings snapshots. The expanded RaceHub features below belong to the server app, not this offline file. Browser edits and SQLite data do not synchronize.

## Server features

- Blue/black interface with English, Hungarian, German, French and Spanish.
- Home, month/week/day calendars, RaceHub weekend overview and overlap detection.
- Favorites for series, driver/team names and events; personalized weekend planner.
- Session editing, timezone display, countdowns, spoiler controls, results and standings.
- Circuit pages, visited collection, map/ticket/watch links and coordinate-based weather forecasts.
- Browser reminders while open, ICS alarms/export and a calendar subscription endpoint.
- SQLite storage, backup/restore, schedule imports and optional automatic authorized feeds.
- Championship requests/votes and a web-app manifest with cached shell.

**Coverage is explicit:** 36 series can be entered or imported, but the bundle currently contains only 14 sourced date-only events from 5 series. Standings are a 29 October 2026 snapshot. No live timing, full-season feed, background push, native widgets or paid subscriptions are active.

See [FEATURE-STATUS.md](FEATURE-STATUS.md) for the full implemented/pending checklist and [FEEDS.md](FEEDS.md) for provider setup and import format. The full product roadmap is not yet complete.

## Data

Existing custom SQLite events are retained. A one-time migration replaces untouched demo events with sourced fixtures. Driver/team following matches the names supplied in event metadata; bundled date-only events do not yet include participant rosters. Planner conflict detection and countdowns require verified session times, so date-only events are not given invented start times.

Preferences and saved plans belong to this browser; shared events belong to `data/motorsport.sqlite`. Back up this database while the server is stopped. JSON backup/restore is also available in the app. Editing an imported event detaches its source ID so a later feed refresh does not overwrite that manual edit.

The optional schedule feed refreshes every 15 minutes. Without a configured feed, refreshing the page only reloads SQLite; it does not fetch new official race schedules. Open-Meteo weather requires internet and coordinates; its free endpoint is for non-commercial use.

## Development

Node.js 24+; no runtime dependencies. `npm start`, `npm run dev`, `npm test`.

Tests cover event CRUD, import upserts/rollback, conflicts, date validation, ICS dates/alarms/folding, votes, origin checks and application routes. Browser preview verified Home and weekend views; broader browser automation was unavailable after those checks.

The service binds to localhost for personal use. Public hosting needs authentication, authorization, HTTPS and a deployment plan. A localhost subscription URL is only reachable from this computer; use ICS import for calendar services that cannot reach it.

Main API: `/api/events`, `/api/series`, `/api/standings`, `/api/status`, `/api/conflicts`, `/api/calendar.ics`, `/api/import`, `/api/replace`, `/api/requests`, `/api/vote`, `/api/weather?lat=...&lon=...`.
