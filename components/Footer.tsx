import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-base-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-display font-bold tracking-wide">
          <Dumbbell className="h-4 w-4 rotate-45 text-accent" strokeWidth={2.5} />
          FITLOG
        </div>
        <p className="text-center text-white/40 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
