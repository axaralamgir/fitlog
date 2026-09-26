"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { SortKey, SORT_LABELS, Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import PlanCard from "@/components/PlanCard";

interface Props {
  workouts: Workout[];
  tab: "plan" | "saved";
  query: string;
  sortKey: SortKey;
}

export default function MyPlanClient({ workouts, tab, query, sortKey }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { planIds, savedIds, isHydrated, isDone, removeFromPlan, removeSaved, markAsDone } = usePlan();

  const byId = useMemo(() => new Map(workouts.map((workout) => [workout.id, workout])), [workouts]);
  const planWorkouts = planIds.map((id) => byId.get(id)).filter((workout): workout is Workout => Boolean(workout));
  const savedWorkouts = savedIds.map((id) => byId.get(id)).filter((workout): workout is Workout => Boolean(workout));
  const activeList = tab === "plan" ? planWorkouts : savedWorkouts;
  const normalizedQuery = query.toLowerCase();

  const visibleList = activeList
    .filter((workout) => !normalizedQuery || workout.name.toLowerCase().includes(normalizedQuery) || workout.muscleGroups.some((tag) => tag.toLowerCase().includes(normalizedQuery)))
    .slice()
    .sort((a, b) => sortKey === "duration" ? a.duration - b.duration : sortKey === "calories" ? a.caloriesBurned - b.caloriesBurned : a.rating - b.rating);

  const metrics = {
    exercises: planWorkouts.length,
    minutes: planWorkouts.reduce((sum, workout) => sum + workout.duration, 0),
    calories: planWorkouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0),
  };

  function updateUrl(next: { tab?: "plan" | "saved"; search?: string; sort?: SortKey }) {
    const params = new URLSearchParams();
    const nextTab = next.tab ?? tab;
    const nextSearch = next.search ?? query;
    const nextSort = next.sort ?? sortKey;
    if (nextTab === "saved") params.set("tab", "saved");
    if (nextSearch) params.set("search", nextSearch);
    if (nextSort !== "duration") params.set("sort", nextSort);
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">My Plan</h1>
      <p className="mt-2 text-white/50">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="card-surface mt-8 grid grid-cols-3 divide-x divide-white/5 p-6 text-center sm:text-left">
        <Metric label="Exercises" value={isHydrated ? metrics.exercises : 0} />
        <Metric label="Minutes" value={isHydrated ? metrics.minutes : 0} className="pl-4" />
        <Metric label="Calories" value={isHydrated ? metrics.calories : 0} className="pl-4" />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-fit gap-2 rounded-full border border-white/10 bg-base-850 p-1">
          <button type="button" onClick={() => updateUrl({ tab: "plan" })} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tab === "plan" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}>Today&apos;s Plan</button>
          <button type="button" onClick={() => updateUrl({ tab: "saved" })} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tab === "saved" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}>Saved</button>
        </div>

        {isHydrated && activeList.length > 0 && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); updateUrl({ search: String(data.get("search") ?? "").trim() }); }} className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input key={query} name="search" defaultValue={query} placeholder="Search this list…" aria-label="Search this list" className="w-full rounded-lg border border-white/10 bg-base-850 py-2 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent" />
            </form>
            <label className="flex items-center gap-2 text-sm text-white/60">
              <span className="hidden sm:inline">Sort By</span>
              <div className="relative">
                <select value={sortKey} onChange={(event) => updateUrl({ sort: event.target.value as SortKey })} className="appearance-none rounded-lg border border-white/10 bg-base-850 py-2 pl-3 pr-9 text-sm font-medium text-white outline-none focus:border-accent" aria-label="Sort list">
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => <option key={key} value={key}>{SORT_LABELS[key]}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              </div>
            </label>
          </div>
        )}
      </div>

      <div className="mt-6">
        {!isHydrated ? <LoadingState label="Loading workouts…" /> : activeList.length === 0 ? (
          <EmptyState title="Nothing Here Yet" message={tab === "plan" ? "Browse the library and add a lift to get today moving." : "Save a lift for later and it will show up here."} ctaLabel="Go to workouts" ctaHref="/" />
        ) : visibleList.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 py-16 text-center text-white/50">No workouts match “{query}”.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleList.map((workout) => (
              <PlanCard key={workout.id} workout={workout} done={tab === "plan" && isDone(workout.id)} onRemove={() => tab === "plan" ? removeFromPlan(workout.id, workout.name) : removeSaved(workout.id, workout.name)} onMarkDone={tab === "plan" ? () => markAsDone(workout.id, workout.name) : undefined} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value, className = "" }: { label: string; value: number; className?: string }) {
  return <div className={className}><p className="text-xs font-semibold uppercase tracking-wide text-white/40">{label}</p><p className="mt-1 font-display text-3xl font-bold">{value}</p></div>;
}
