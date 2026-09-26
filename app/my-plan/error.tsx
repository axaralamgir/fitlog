"use client";
import { RefreshCcw } from "lucide-react";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold uppercase">Couldn&apos;t load your plan</h1>
      <p className="mt-3 text-white/50">The workout library could not be loaded. Your saved browser state is still safe.</p>
      <button type="button" onClick={() => reset()} className="btn-primary mt-8"><RefreshCcw className="h-4 w-4" /> Retry</button>
    </div>
  );
}
