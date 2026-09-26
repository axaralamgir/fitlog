export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export type SortKey = "duration" | "caloriesBurned" | "rating";

export const SORT_LABELS: Record<SortKey, string> = {
  duration: "Duration",
  caloriesBurned: "Calories",
  rating: "Rating",
};
