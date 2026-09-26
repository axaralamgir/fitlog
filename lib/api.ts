import { Workout } from "./types";

export const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

function isWorkout(value: unknown): value is Workout {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    typeof item.name === "string" &&
    typeof item.image === "string" &&
    Array.isArray(item.muscleGroups) &&
    typeof item.equipment === "string" &&
    typeof item.difficulty === "string" &&
    typeof item.duration === "number" &&
    typeof item.caloriesBurned === "number" &&
    typeof item.sets === "number" &&
    typeof item.reps === "string" &&
    typeof item.rating === "number" &&
    typeof item.description === "string" &&
    Array.isArray(item.instructions)
  );
}

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { next: { revalidate: 300, tags: ["fitlog-workouts"] } });
  if (!res.ok) throw new Error(`Workout API returned ${res.status}`);
  const data: unknown = await res.json();
  if (!Array.isArray(data) || !data.every(isWorkout)) throw new Error("Unexpected workout API response");
  return data;
}

export async function getWorkoutById(id: string | number): Promise<Workout | null> {
  const res = await fetch(`${API_BASE}/${id}`, { next: { revalidate: 300, tags: [`fitlog-workout-${id}`] } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Workout API returned ${res.status}`);
  const data: unknown = await res.json();
  const workout = Array.isArray(data) ? data[0] : data;
  if (!isWorkout(workout)) throw new Error("Unexpected workout API response");
  return workout;
}
