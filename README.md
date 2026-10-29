# 🏁 GRIDLINE RaceHub

## Download — one file, no installation

### [⬇ Download GRIDLINE.html](https://github.com/CzMarci210/Plan-10.30/raw/refs/heads/main/GRIDLINE.html)

1. Download and save **GRIDLINE.html**.
2. Double-click it to open in a modern desktop browser.
3. Keep the file and reopen it whenever you want. No Node.js, terminal, ZIP extraction or server needed.

Share the download link or the HTML file itself with friends. Each person gets their own browser-local data. Mobile browsers vary in how they open downloaded HTML files; the recommended experience is a desktop browser.

The single file includes Home, RaceHub weekend, month/week/day calendars, planner, favorites, event editing, standings, spoiler controls, circuit collection, JSON import/backup and ICS export with reminders. It has a blue/black theme and five interface languages.

**Important:** Events and preferences are saved in the browser, not written back into the HTML file. Export backups before clearing browser data, changing browsers or moving the file. Sharing the HTML does not share your edits. Browser notifications depend on browser support and require the file to remain open; use ICS alarms for external reminders. Weather and source/watch/ticket links need internet. Standings and race dates are snapshots, not automatic live updates. Series requests are a personal wishlist in this edition, not shared votes.

### Optional server edition

[Download server ZIP](https://github.com/CzMarci210/Plan-10.30/archive/refs/heads/main.zip) if you want SQLite storage and the configurable schedule-feed importer. Unzip and run **Start-GRIDLINE.cmd** on Windows (Node.js 24+ required). No npm install needed. On macOS/Linux run `npm start`.

The server and single-file editions do not synchronize. The full roadmap is still subject to the limitations in [FEATURE-STATUS.md](FEATURE-STATUS.md).

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

## Build the single-file edition

Run `node scripts/build-portable.cjs` from the repository root. It bundles the public UI and a browser-local adapter into `GRIDLINE.html`. Run `node --test tests/portable.test.js` to check storage/import/export behavior.
