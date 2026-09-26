import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import LoadingState from "@/components/LoadingState";
import LibraryControls from "@/components/LibraryControls";
import { getAllWorkouts } from "@/lib/api";
import { SortKey } from "@/lib/types";

interface HomePageProps {
  searchParams: Promise<{ search?: string; sort?: string }>;
}

function getSortKey(value?: string): SortKey {
  return value === "calories" || value === "rating" || value === "duration" ? value : "duration";
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const query = params.search?.trim() ?? "";
  const sortKey = getSortKey(params.sort);
  const workouts = await getAllWorkouts();
  const normalizedQuery = query.toLowerCase();

  const visibleWorkouts = workouts
    .filter((workout) => {
      if (!normalizedQuery) return true;
      return (
        workout.name.toLowerCase().includes(normalizedQuery) ||
        workout.muscleGroups.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      );
    })
    .slice()
    .sort((a, b) => {
      if (sortKey === "duration") return a.duration - b.duration;
      if (sortKey === "calories") return a.caloriesBurned - b.caloriesBurned;
      return a.rating - b.rating;
    });

  return (
    <>
      <Hero />
      <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              The Library
            </h2>
            <p className="mt-2 text-white/50">Twelve lifts covering every major muscle group.</p>
          </div>
          <LibraryControls query={query} sortKey={sortKey} />
        </div>

        {visibleWorkouts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 py-16 text-center text-white/50">
            {query ? `No workouts match “${query}”.` : "No workouts available."}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
