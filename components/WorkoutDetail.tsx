"use client";

import Image from "next/image";
import { CalendarPlus, Bookmark, BookmarkCheck, CheckCircle2 } from "lucide-react";
import { Workout } from "@/lib/types";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";

const SPECS = (w: Workout) => [
  { label: "Equipment", value: w.equipment },
  { label: "Difficulty", value: w.difficulty },
  { label: "Sets", value: w.sets },
  { label: "Reps", value: w.reps },
  { label: "Duration", value: `${w.duration} min` },
  { label: "Calories", value: `${w.caloriesBurned} kcal` },
  { label: "Rating", value: w.rating },
];

export default function WorkoutDetail({ workout }: { workout: Workout }) {
  const { isInPlan, isSaved, isPlanFull, addToPlan, addToSaved } = usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const planDisabled = inPlan || isPlanFull;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-base-700 lg:aspect-auto lg:h-full lg:min-h-[420px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-white/60">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="card-surface mt-6 divide-y divide-white/5">
            {SPECS(workout).map((spec) => (
              <div key={spec.label} className="flex items-center justify-between px-5 py-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  {spec.label}
                </span>
                <span className="text-sm font-medium text-white">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/70">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToPlan(workout.id, workout.name)}
              disabled={planDisabled}
              className="btn-primary"
            >
              {inPlan ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  In Today&apos;s Plan
                </>
              ) : isPlanFull ? (
                <>Plan Full ({PLAN_CAP}/{PLAN_CAP})</>
              ) : (
                <>
                  <CalendarPlus className="h-4 w-4" />
                  Add to Today&apos;s Plan
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => addToSaved(workout.id, workout.name)}
              disabled={saved}
              className="btn-secondary"
            >
              {saved ? (
                <>
                  <BookmarkCheck className="h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  Save for Later
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
