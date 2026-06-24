# Renovision — Visualize your future home 🏠

A mobile-first interactive interior design prototype built for a Human-Centered Design school project.

## What it does

Renovision helps homeowners visualize their renovated rooms before making purchasing decisions. Users can:

- Browse and apply interior design styles (Japandi, Scandinavian, Modern, Industrial, Hotel Chic)
- Add furniture from real Dutch stores (IKEA, JYSK, Leen Bakker, Kwantum, H&M Home)
- Change wall and floor colors in real time
- Save multiple room designs and compare them side by side
- Track total furniture budget per design

## Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Onboarding | `/onboarding` | 4-slide intro with benefits |
| Home | `/home` | Recent designs, stats, quick start |
| New Room | `/new-room` | Choose room type, optional photo |
| Style Select | `/style-select` | Pick interior style with color swatches |
| Editor | `/editor/[id]` | Full room designer with furniture, colors, style panels |
| Projects | `/projects` | All saved designs with search + filter |
| Favorites | `/favorites` | Hearted designs |
| Compare | `/compare` | Side-by-side comparison of up to 3 designs |
| Profile | `/profile` | Stats and settings |

## Tech stack

- **Next.js 15** — App Router, TypeScript
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icons
- **localStorage** — Persistent state, no backend required

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Designed for 390px (iPhone) viewport.

## Folder structure

```
app/
  onboarding/     Onboarding slides
  home/           Home dashboard
  new-room/       Room type selector
  style-select/   Style picker
  editor/[id]/    Room editor (main screen)
  projects/       All designs
  favorites/      Saved favorites
  compare/        Side-by-side comparison
  profile/        User profile

components/
  BottomNavigation.tsx   Fixed bottom nav bar
  ProjectCard.tsx        Design preview card
  FurnitureCard.tsx      Product card with add button
  StyleSelector.tsx      Style choice list
  ColorPicker.tsx        Wall/floor color dots
  RoomPreview.tsx        Visual room renderer

lib/
  data.ts         All mock data (30 furniture items, styles, colors)
  store.ts        localStorage read/write helpers
```

## Design decisions

- **No images** — Emoji furniture avoids asset pipeline complexity while keeping the UI expressive and fast
- **Inline styles** — Used alongside Tailwind to keep component styles co-located and predictable for a prototype
- **localStorage only** — Keeps the project self-contained for portfolio demos without a server
- **Mobile-first 390px** — All layouts target iPhone-width; `mobile-container` class centers on desktop
- **Warm palette** — Beige, warm gray, and sage green (#6b8f71 accent) create a calm, premium feel consistent with apps like Airbnb and the IKEA app

---

Human-Centered Design · 2024
