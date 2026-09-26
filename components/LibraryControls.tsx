"use client";

import { FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { SortKey, SORT_LABELS } from "@/lib/types";

export default function LibraryControls({
  query,
  sortKey,
}: {
  query: string;
  sortKey: SortKey;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = String(formData.get("search") ?? "").trim();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (sortKey !== "duration") params.set("sort", sortKey);
    const queryString = params.toString();
    router.push(
      queryString
        ? `${pathname}?${queryString}#library`
        : `${pathname}#library`,
    );
  }

  function changeSort(value: SortKey) {
    const params = new URLSearchParams(window.location.search);
    if (value === "duration") params.delete("sort");
    else params.set("sort", value);
    router.push(
      `${pathname}${params.toString() ? `?${params.toString()}` : ""}#library`,
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <form onSubmit={submitSearch} className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          key={query}
          name="search"
          defaultValue={query}
          placeholder="Search by name or muscle group…"
          aria-label="Search workouts"
          className="w-full rounded-lg border border-white/10 bg-base-850 py-2 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-white/30 hover:border-white/25 focus:border-accent"
        />
      </form>
      <label className="flex items-center gap-2 text-sm text-white/60">
        <span className="hidden sm:inline">Sort By</span>
        <div className="relative">
          <select
            value={sortKey}
            onChange={(event) => changeSort(event.target.value as SortKey)}
            className="appearance-none rounded-lg border border-white/10 bg-base-850 py-2 pl-3 pr-9 text-sm font-medium text-white outline-none transition hover:border-white/25 focus:border-accent"
            aria-label="Sort workouts"
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
    </div>
  );
}
