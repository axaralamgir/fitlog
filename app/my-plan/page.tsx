"use client";

import { useEffect, useMemo, useState, ReactNode } from "react";
import { usePlan } from "@/context/PlanContext";
import { getAllWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/lib/types";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import PlanCard from "@/components/PlanCard";
import SortDropdown from "@/components/SortDropdown";
import SearchInput from "@/components/SearchInput";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const { planIds, savedIds, isHydrated, isDone, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();

  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    getAllWorkouts()
      .then((data) => {
        if (isMounted) setAllWorkouts(data);
      })
      .catch(() => {
        if (isMounted) setError("Couldn't load your plan. Please try again.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const planWorkouts = useMemo(
    () => planIds.map((id) => allWorkouts.find((w) => w.id === id)).filter(Boolean) as Workout[],
    [planIds, allWorkouts]
  );

  const savedWorkouts = useMemo(
    () => savedIds.map((id) => allWorkouts.find((w) => w.id === id)).filter(Boolean) as Workout[],
    [savedIds, allWorkouts]
  );

  const activeList = tab === "plan" ? planWorkouts : savedWorkouts;

  const visibleList = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? activeList.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
        )
      : activeList;

    return [...filtered].sort((a, b) => {
      if (sortKey === "duration") return a.duration - b.duration;
      if (sortKey === "caloriesBurned") return a.caloriesBurned - b.caloriesBurned;
      return a.rating - b.rating;
    });
  }, [activeList, sortKey, query]);

  const metrics = useMemo(
    () => ({
      exercises: planWorkouts.length,
      minutes: planWorkouts.reduce((sum, w) => sum + w.duration, 0),
      calories: planWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
    }),
    [planWorkouts]
  );

  const showLoading = isLoading || !isHydrated;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-white/50">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="card-surface mt-8 grid grid-cols-3 divide-x divide-white/5 p-6 text-center sm:text-left">
        <Metric label="Exercises" value={metrics.exercises} />
        <Metric label="Minutes" value={metrics.minutes} className="pl-4" />
        <Metric label="Calories" value={metrics.calories} className="pl-4" />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 rounded-full border border-white/10 bg-base-850 p-1">
          <TabButton active={tab === "plan"} onClick={() => setTab("plan")}>
            Today&apos;s Plan
          </TabButton>
          <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
            Saved
          </TabButton>
        </div>

        {!showLoading && !error && activeList.length > 0 && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchInput value={query} onChange={setQuery} placeholder="Search this list…" />
            <SortDropdown value={sortKey} onChange={setSortKey} />
          </div>
        )}
      </div>

      <div className="mt-6">
        {showLoading && <LoadingState label="Loading workouts…" />}

        {!showLoading && error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center text-red-300">
            {error}
          </div>
        )}

        {!showLoading && !error && activeList.length === 0 && tab === "plan" && (
          <EmptyState
            title="Nothing Here Yet"
            message="Browse the library and add a lift to get today moving."
            ctaLabel="Go to workouts"
            ctaHref="/"
          />
        )}

        {!showLoading && !error && activeList.length === 0 && tab === "saved" && (
          <EmptyState
            title="Nothing Saved Yet"
            message="Save a lift for later and it will show up here."
            ctaLabel="Go to workouts"
            ctaHref="/"
          />
        )}

        {!showLoading && !error && activeList.length > 0 && visibleList.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 py-16 text-center text-white/50">
            No workouts match &ldquo;{query}&rdquo;.
          </div>
        )}

        {!showLoading && !error && visibleList.length > 0 && (
          <div className="flex flex-col gap-4">
            {visibleList.map((workout) => (
              <PlanCard
                key={workout.id}
                workout={workout}
                done={tab === "plan" && isDone(workout.id)}
                onRemove={() =>
                  tab === "plan"
                    ? removeFromPlan(workout.id, workout.name)
                    : removeFromSaved(workout.id, workout.name)
                }
                onMarkDone={
                  tab === "plan" ? () => markAsDone(workout.id, workout.name) : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  className = "",
}: {
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-white text-black" : "text-white/60 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
