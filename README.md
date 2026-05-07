# Vydria Výprava: Tajomstvo Rieky
Detská 2D auto-swimmer hra (Phaser 3 + TypeScript + Vite), komplet statická pre GitHub Pages.

## Spustenie
```bash
npm install
npm run dev
```
## Build
```bash
npm run build
npm run preview
```

## Ovládanie
- W A S D: pohyb
- SPACE: hod kamienkom
- ESC alebo II: pauza
- Enter/klik: potvrdenie

## Čo je implementované
- Kompletný menu flow (menu, výber postavy, režim, hra, výsledok, info scény)
- 8 vydier so statmi a odomykaním
- Dobrodružstvo + Nekonečný mód
- Auto-scroll pocit, kyslík, HP, skóre, vzdialenosť, regióny
- Procedurálne chunk spawnovanie so seeded RNG
- Lokálny save cez localStorage
- Otterpedia + edukatívne fakty

## GitHub Pages
Workflow v `.github/workflows/pages.yml` publikuje `dist`.
Vite base: `/vydrafelix/` (alebo `VITE_BASE_PATH`).

## Prvý user test
Pozri `USER_TEST_PLAN.md` pre scenár, checklist a metriky.
