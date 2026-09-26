"use client";

import { ChevronDown } from "lucide-react";
import { SortKey, SORT_LABELS } from "@/lib/types";

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-white/60">
      <span className="hidden sm:inline">Sort By</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="appearance-none rounded-lg border border-white/10 bg-base-850 py-2 pl-3 pr-9 text-sm font-medium text-white outline-none transition hover:border-white/25 focus:border-accent"
        >
          {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
            <option key={key} value={key}>
              {SORT_LABELS[key]}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
      </div>
    </label>
  );
}
