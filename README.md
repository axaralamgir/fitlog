# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a
library of twelve lifts, dive into detailed instructions and stats for each
one, and build out **today's plan** or a **saved-for-later** list that
persists across page reloads.

## 🚀 Live Data

All workout data is pulled from a public REST API:

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## 🛠️ Technologies Used

- **Next.js 14 (App Router)** — routing, server + client components
- **React 18** & **TypeScript**
- **Tailwind CSS** — styling and full responsiveness
- **lucide-react** — icon set
- **react-hot-toast** — toast notifications
- **Browser localStorage** — persists the plan/saved lists across reloads

## ✨ Key Features

1. **Full workout library** — a responsive 3×4 card grid on desktop
   (collapsing to 2 and 1 columns on tablet/mobile) with category tags,
   equipment, and a duration/calories/rating stat row for all twelve lifts.
2. **Workout detail pages** — a two-column layout with a large hero image,
   a specs table (equipment, difficulty, sets, reps, duration, calories,
   rating), a numbered instructions list, and primary/secondary CTAs to add
   the lift to today's plan or save it for later.
3. **My Plan dashboard** — live "Exercises / Minutes / Calories" summary
   cards, a Today's Plan / Saved tab switcher, a 5-lift daily cap with a
   disabled "plan full" state, "Mark as Done" and remove (×) actions, and
   friendly empty states with a CTA back to the library.
4. **Persistent state with toast feedback** — the plan and saved lists are
   stored in `localStorage` so they survive a refresh, and every action
   (add, save, mark done, remove) fires a themed toast notification. The
   navbar's `Plan` and `Saved` badge counters update live and both link to
   `/my-plan`.
5. **Sort & search** — a "Sort By" dropdown (Duration / Calories / Rating)
   on both the library and My Plan lists, plus a search box to filter
   workouts by name or muscle-group tag.
6. **Polished states & routing** — animated loading states while data is
   fetched, a custom 404 page for unknown routes or invalid workout ids,
   and a fully responsive dark UI (mobile, tablet, desktop) matching the
   Figma design end-to-end.

## 📦 Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
app/
  layout.tsx          Root layout — fonts, Navbar, Footer, providers
  page.tsx             Home page — hero + library grid
  not-found.tsx        Global 404 page
  workouts/[id]/       Workout detail route
  my-plan/             My Plan page (tabs, metrics, plan/saved lists)
components/            Reusable UI building blocks
context/PlanContext.tsx  Plan/Saved state, localStorage persistence, toasts
lib/                   API client, shared types, localStorage helpers
```
