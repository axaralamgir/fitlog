"use client";

import Image from "next/image";
import { CalendarPlus, Bookmark, BookmarkCheck, CheckCircle2 } from "lucide-react";
import { Workout } from "@/lib/types";
import { PLAN_CAP, usePlan } from "@/context/PlanContext";

export default function WorkoutDetail({ workout }: { workout: Workout }) {
  const { isInPlan, isSaved, isPlanFull, addToPlan, saveWorkout } = usePlan();
  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  const specs = [
    ["Equipment", workout.equipment], ["Difficulty", workout.difficulty], ["Sets", workout.sets],
    ["Reps", workout.reps], ["Duration", `${workout.duration} min`], ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-base-700 lg:aspect-auto lg:min-h-[520px]">
          <Image src={workout.image} alt={workout.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-5xl">{workout.name}</h1>
          <p className="mt-4 text-white/60">{workout.description}</p>

          <div className="card-surface mt-6 divide-y divide-white/5">
            {specs.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between px-5 py-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/40">{label}</span>
                <span className="text-sm font-medium text-white">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide">Instructions</h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((step, index) => (
                <li key={`${workout.id}-${index}`} className="flex gap-3 text-sm text-white/70">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">{index + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => addToPlan(workout.id, workout.name)} disabled={inPlan || isPlanFull} className="btn-primary">
              {inPlan ? <><CheckCircle2 className="h-4 w-4" /> In Today&apos;s Plan</> : isPlanFull ? <>Plan Full ({PLAN_CAP}/{PLAN_CAP})</> : <><CalendarPlus className="h-4 w-4" /> Add to today&apos;s plan</>}
            </button>
            <button type="button" onClick={() => saveWorkout(workout.id, workout.name)} disabled={saved} className="btn-secondary">
              {saved ? <><BookmarkCheck className="h-4 w-4" /> Saved</> : <><Bookmark className="h-4 w-4" /> Save for later</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
