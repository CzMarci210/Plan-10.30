# GRIDLINE — Motorsport Calendar

## Offline version — no installation needed

Download [GRIDLINE.html](https://github.com/CzMarci210/Plan-10.30/raw/refs/heads/main/GRIDLINE.html), then double-click the saved file in your browser.

- Single HTML file with inline CSS and JavaScript; no Node.js or internet required.
- Blue-and-black theme; English, Hungarian, German, French and Spanish.
- Calendar and list views, series filters, event editing, localStorage persistence, JSON backup/restore and ICS export.
- 14 sourced upcoming events for October–December 2026, imported as date-only events.
- Standings tab: top 10 for F1, MotoGP, WEC Hypercar drivers, WRC, IndyCar, Formula E and NASCAR Cup; also all eight WEC Hypercar manufacturers. Each table links to its data source.
- Standings snapshot checked 29 October 2026; not live. Formula E shows the completed 2025–26 season. Source links need internet. NASCAR totals are sourced from NASCAR Reference; an official NASCAR standings link is also provided.
- Existing custom events from the earlier offline file are preserved; demo events are replaced on first migration.

This is separate from the SQLite server application below. It does not synchronize with the server. Browser storage belongs to the browser and file location; export a backup before moving the file or clearing browser data.

Működő webes motorsportnaptár valódi SQLite adatbázissal.

## Indítás

Telepítsd a Node.js 22.13+ verzióját (ajánlott 24), majd a projekt mappájában:

```bash
npm start
```

Nyisd meg: **http://127.0.0.1:3000**

Az alkalmazás automatikusan létrehozza a `data/motorsport.sqlite` adatbázist. Nincs szükség külön adatbázisszerverre, API-kulcsra vagy npm-függőségekre.

Fejlesztés: `npm run dev`. Tesztek: `npm test`.

## Funkciók

- Havi naptár és versenylista, magyar nyelvű, mobilbarát megjelenéssel
- F1, MotoGP, WEC, WRC, IndyCar, Formula E, NASCAR sorozatok
- Szűrés, keresés, navigáció a hónapok között
- Események létrehozása, szerkesztése és törlése
- Valódi SQLite-adattárolás és REST API
- Egyéni vagy teljes naptár exportálása .ics fájlba

**Figyelem:** Az első indításkor megjelenő események DEMO események, nem hivatalosan ellenőrzött versenydátumok. Szabadon módosíthatók vagy törölhetők.

## API

- `GET /api/health`
- `GET /api/series`
- `GET /api/events` (opcionális: `series` és `q`)
- `GET /api/events/:id`
- `POST /api/events`
- `PUT /api/events/:id`
- `DELETE /api/events/:id`
- `GET /api/calendar.ics`
- `GET /api/events/:id.ics`

## Biztonság

A szerver alapértelmezés szerint csak a helyi gépen (`127.0.0.1`) érhető el. Nincs még bejelentkezés; ne tedd közzé nyilvános interneten hitelesítés és HTTPS nélkül.
