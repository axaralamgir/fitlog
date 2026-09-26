# FitLog

FitLog is a modern dark fitness workout library built with Next.js App Router. Browse workouts, inspect detailed instructions, build a five-lift daily plan, and save workouts for later.

## Technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- REST API
- localStorage
- react-hot-toast
- lucide-react

## Features

- Server-rendered workout library using the FitLog REST API
- Workout detail pages with equipment, difficulty, sets, reps, calories, rating, and instructions
- Today's Plan with a five-workout cap
- Saved workouts with persistent localStorage state
- Mark workouts as done and remove items instantly
- URL-based search, sorting, and My Plan tabs
- Responsive mobile, tablet, desktop, and large-screen layouts
- Loading, API error, and custom 404 states
- Accessible buttons, links, labels, image alt text, and keyboard focus states

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Project Structure

```text
app/
  page.tsx
  loading.tsx
  error.tsx
  not-found.tsx
  workout/[id]/
  my-plan/
components/
context/
lib/
```

API fetching stays in Server Components. Browser-only plan/saved state is isolated in `PlanContext`, with localStorage accessed only on the client.
