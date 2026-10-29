# Schedule feed contract

The personal SQLite server accepts `POST /api/import` or a JSON file selected in Profile & settings. Import validates the complete batch before writing and upserts by `source_id`. Missing rows are retained: publish explicit cancelled/postponed statuses when a schedule changes.

```json
{"events":[{"source_id":"your-provider:series:season:event:session","title":"Session title","series":"F1","session_type":"race","start_utc":"2027-01-01T14:00:00.000Z","end_utc":"2027-01-01T16:00:00.000Z","venue":"Circuit","country":"Country","description":"","status":"scheduled","all_day":false,"source":"https://example.org/official-event","source_date":"2026-10-29","drivers":"Driver names","teams":"Team names","result":"","lat":47.58,"lon":19.25}]}
```

The example is a schema example, not a race fixture. Optional HTTPS `watch_url` and `ticket_url` fields can be provided. `result` is free-text and respects spoiler mode. Dates must be normalized UTC ISO timestamps. For date-only entries use midnight start and 23:59:59 end on the inclusive final day, `all_day:true`. IDs must be stable and provider-namespaced. Session start/end times must come from verified sources; do not synthesize sessions from weekend dates.

Set `GRIDLINE_FEED_URL` to an authorized HTTPS endpoint returning this contract to enable a 15-minute refresh. Optionally set `GRIDLINE_FEED_TOKEN` in the process environment. Tokens are never sent to the browser, committed or included in the status endpoint. Redirects are rejected, requests have a timeout and a 5 MB limit. Invalid updates preserve the existing database. No feed is configured by default.

The app is for personal local use. Do not expose it to the public internet without authentication, authorization, rate limits, HTTPS and backups. A calendar subscriber must be able to reach the server; Google’s servers cannot subscribe to your localhost URL. Download/import ICS instead for local use.
