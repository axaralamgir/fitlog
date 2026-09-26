import { Workout } from "./types";

export const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return res.json();
}

export async function getWorkoutById(id: string | number): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      // Some APIs return an array even for single lookups — normalize it.
      const workout = Array.isArray(data) ? data[0] : data;
      if (workout && workout.id) return workout;
    }
  } catch {
    // fall through to the list-based lookup below
  }

  // Fallback: fetch the full list and find the match by id, in case the
  // single-item endpoint behaves unexpectedly.
  try {
    const all = await getAllWorkouts();
    const numericId = Number(id);
    return all.find((w) => w.id === numericId) ?? null;
  } catch {
    return null;
  }
}
