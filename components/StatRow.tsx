import { Clock, Flame, Star } from "lucide-react";

export default function StatRow({
  duration,
  calories,
  rating,
  className = "",
}: {
  duration: number;
  calories: number;
  rating: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <span className="stat-row">
        <Clock className="h-4 w-4" />
        {duration} min
      </span>
      <span className="stat-row">
        <Flame className="h-4 w-4" />
        {calories} kcal
      </span>
      <span className="stat-row">
        <Star className="h-4 w-4 fill-accent text-accent" />
        {rating}
      </span>
    </div>
  );
}
