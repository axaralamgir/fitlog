import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { Workout } from "@/lib/types";
import StatRow from "./StatRow";

export default function PlanCard({
  workout,
  onRemove,
  onMarkDone,
  done = false,
}: {
  workout: Workout;
  onRemove: () => void;
  onMarkDone?: () => void;
  done?: boolean;
}) {
  return (
    <div
      className={`card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between ${
        done ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-base-700">
          <Image src={workout.image} alt={workout.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-display text-base font-bold uppercase tracking-wide">
            {workout.name}
          </h3>
          <p className="text-sm text-white/50">{workout.equipment}</p>
          <StatRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <Link href={`/workouts/${workout.id}`} className="btn-secondary !px-4 !py-2 text-xs">
          View Details
        </Link>
        {onMarkDone && (
          <button
            type="button"
            onClick={onMarkDone}
            disabled={done}
            className="btn-primary !px-4 !py-2 text-xs"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/40 transition hover:bg-white/5 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
