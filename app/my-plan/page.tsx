import { getAllWorkouts } from "@/lib/api";
import MyPlanClient from "@/components/MyPlanClient";
import type { SortKey } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{ tab?: string; search?: string; sort?: string }>;
}

function getSortKey(value?: string): SortKey {
  return value === "calories" || value === "rating" || value === "duration" ? value : "duration";
}

export default async function MyPlanPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const workouts = await getAllWorkouts();
  return (
    <MyPlanClient
      workouts={workouts}
      tab={params.tab === "saved" ? "saved" : "plan"}
      query={params.search?.trim() ?? ""}
      sortKey={getSortKey(params.sort)}
    />
  );
}
