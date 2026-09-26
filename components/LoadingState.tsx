import { Loader2 } from "lucide-react";

export default function LoadingState({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-white/50">
      <Loader2 className="h-8 w-8 animate-spin text-accent" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
