# GRIDLINE — Motorsport Calendar

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
