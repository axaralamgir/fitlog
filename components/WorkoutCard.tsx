import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import StatRow from "./StatRow";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card-surface group flex flex-col overflow-hidden transition hover:border-accent/40 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-700">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold uppercase tracking-wide">
          {workout.name}
        </h3>

        <p className="text-sm text-white/50">{workout.equipment}</p>

        <div className="mt-auto border-t border-white/5 pt-3">
          <StatRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
