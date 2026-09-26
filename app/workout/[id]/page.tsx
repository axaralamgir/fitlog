import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkoutById } from "@/lib/api";
import WorkoutDetail from "@/components/WorkoutDetail";

interface PageProps { params: Promise<{ id: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(id);
  return { title: workout ? `${workout.name} — FitLog` : "Workout not found — FitLog" };
}

export default async function WorkoutPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);
  if (!workout) notFound();
  return <WorkoutDetail workout={workout} />;
}
