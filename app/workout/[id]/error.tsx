"use client";
import { RefreshCcw } from "lucide-react";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">FitLog</p>
      <h1 className="mt-3 font-display text-3xl font-bold uppercase">Couldn&apos;t load this workout</h1>
      <p className="mt-3 text-white/50">Please try again in a moment.</p>
      <button type="button" onClick={() => reset()} className="btn-primary mt-8"><RefreshCcw className="h-4 w-4" /> Retry</button>
    </div>
  );
}
