"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import LoadingState from "@/components/LoadingState";
import SortDropdown from "@/components/SortDropdown";
import SearchInput from "@/components/SearchInput";
import { getAllWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getAllWorkouts()
      .then((data) => {
        if (isMounted) setWorkouts(data);
      })
      .catch(() => {
        if (isMounted) setError("Couldn't load the workout library. Please try again.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const visibleWorkouts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
        )
      : workouts;

    return [...filtered].sort((a, b) => {
      if (sortKey === "duration") return a.duration - b.duration;
      if (sortKey === "caloriesBurned") return a.caloriesBurned - b.caloriesBurned;
      return a.rating - b.rating;
    });
  }, [workouts, sortKey, query]);

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

          {!isLoading && !error && workouts.length > 0 && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchInput value={query} onChange={setQuery} />
              <SortDropdown value={sortKey} onChange={setSortKey} />
            </div>
          )}
        </div>

        {isLoading && <LoadingState label="Loading workouts…" />}

        {!isLoading && error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center text-red-300">
            {error}
          </div>
        )}

        {!isLoading && !error && visibleWorkouts.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 py-16 text-center text-white/50">
            No workouts match &ldquo;{query}&rdquo;.
          </div>
        )}

        {!isLoading && !error && visibleWorkouts.length > 0 && (
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
