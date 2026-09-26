"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-base-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-wide">
          <Dumbbell className="h-5 w-5 rotate-45 text-accent" strokeWidth={2.5} />
          FITLOG
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/10 text-accent"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="hidden text-white/70 sm:inline">Plan</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-xs font-bold text-black">
              {planIds.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="hidden text-white/70 sm:inline">Saved</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-white/30 px-2 text-xs font-bold text-white">
              {savedIds.length}
            </span>
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-1 border-t border-white/5 px-4 py-2 sm:hidden">
        {links.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                isActive ? "bg-white/10 text-accent" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
