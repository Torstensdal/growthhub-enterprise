Build: Latest update
# GrowthHub Vækstportal - Installation

## Sådan installerer du filerne:

### Trin 1: Kopier filerne
1. Download alle filerne fra denne mappe
2. Placer dem i din `growthhub-projekt` mappe på:
   `C:\Users\Kaj T. Sørensen\OneDrive\Desktop\growthhub-projekt`

### Trin 2: Erstat package.json
⚠️ **VIGTIGT**: Du skal erstatte din eksisterende `package.json` med den nye!

### Trin 3: Installer nye packages
Åbn PowerShell i projektmappen og kør:
```powershell
npm install
```

Dette vil installere Vite og alle nødvendige packages.

### Trin 4: Tjek din .env fil
Sørg for at du har en `.env` fil med din Gemini API-nøgle:
```
API_KEY=din_gemini_api_nøgle_her
```

### Trin 5: Start appen
Du skal åbne TO terminaler:

**Terminal 1 - Backend (API server):**
```powershell
npm run server
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

### Trin 6: Besøg appen
Gå til: http://localhost:3000

## Filstruktur
```
growthhub-projekt/
├── src/
│   ├── main.tsx          (React entry point)
│   ├── App.tsx           (Login-side komponent)
│   └── index.css         (Tailwind CSS)
├── api/                  (Din eksisterende backend)
├── components/           (Dine eksisterende komponenter)
├── index.html            (HTML entry point)
├── vite.config.ts        (Vite konfiguration)
├── package.json          (Nye dependencies)
└── .env                  (API nøgle)
```

## Troubleshooting

**Hvis `npm run server` fejler:**
- Tjek at `api/index.ts` eksisterer
- Tjek at din `.env` fil har `API_KEY` sat

**Hvis styling ikke virker:**
- Tjek at `tailwind.config.js` og `postcss.config.js` eksisterer

**Hvis du får TypeScript fejl:**
- Kør `npm install` igen
- Tjek at `tsconfig.json` eksisterer
