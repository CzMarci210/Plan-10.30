# GRIDLINE feature status

## Implemented in the server edition

- SQLite event/session CRUD, preserving existing custom events during migration.
- Blue/black responsive UI; English, Hungarian, German, French and Spanish navigation.
- Home dashboard, monthly/weekly/daily calendars, Friday–Sunday RaceHub overview.
- 36 recognized series for manual entry and imports; 14 sourced date-only events bundled. This is not full-season coverage of 36 championships.
- Session types: practice, qualifying, sprint qualifying, sprint, Hyperpole, race, stage, test, weekend.
- Personal following for series, driver/team names, individual events; browser-local preferences.
- Countdown labels for timed sessions, date-only labels otherwise; no fabricated live status.
- Timed overlap detection and a favorites-prioritized weekend planner within viewing hours.
- Spoiler-free standings/results, editable/importable result summaries, sourced standings snapshots.
- Browser reminders while the page is open; downloadable ICS alarms and subscription endpoint.
- Circuit pages grouped from events, visited-circuit collection, map links, supplied ticket/watch links.
- Hourly Open-Meteo forecasts when an event includes coordinates; no invented track conditions.
- Championship requests and one vote per browser identifier (not an authenticated public voting system).
- Atomic schedule import/update by source_id; optional authorized HTTPS feed every 15 minutes.
- Installable web manifest and cached application shell. Data operations still require the server.
- JSON backups, restoration, Windows launcher and download instructions.

## Not complete / requires external services or additional product work

These are not claimed as functioning features:

- Complete, continuously verified schedules/results/standings across 30–100+ championships: requires a chosen authorized provider and coverage agreement. Feed adapter is ready; no provider is configured.
- Background web push and schedule-change push when closed: requires HTTPS deployment, push subscription storage, VAPID credentials and delivery infrastructure. Current reminders are foreground only.
- Country/season broadcaster rights, free/paid/replay/language availability: requires a maintained rights dataset. Watch URLs can be supplied per event; availability is not inferred.
- Native iOS/Android widgets, Live Activities, live lap counts and timing: native projects and authorized timing feeds are not included.
- Rich driver biographies, nationality/team history, full results history, circuit layouts, lengths, corners and category-specific lap records: require sourced datasets. Name following and event-based circuit pages are available.
- Public multi-user accounts, cross-device preference synchronization and abuse-resistant voting: authentication and deployment architecture remain to be built. Server intentionally binds only to loopback.
- Natural-language AI assistant, premium analytics, subscriptions/billing and affiliate partnerships: not implemented. These require provider/business choices; no charges or accounts were created.
- Multi-collection planner, weather alert delivery, personalized driver-result notifications and richer championship overview pages remain follow-up UI work.

## Data and privacy

Bundled schedule and standings snapshot: 2026-10-29. Existing source links are retained. Formula E standings refer to completed 2025–26; WEC standings cover Hypercar. NASCAR uses the attributed third-party standings source. Forecast coordinates are sent to Open-Meteo only when requested. The free weather endpoint is intended for non-commercial use; see https://open-meteo.com/en/terms before commercial deployment.
