"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-base-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 font-display text-lg font-bold tracking-wide"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={32}
            height={32}
          />
          FITLOG
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${active ? "bg-white/10 text-accent" : "text-white/70 hover:text-white"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 text-sm">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5"
            aria-label={`Today's plan, ${planCount} workouts`}
          >
            <span className="hidden text-white/70 md:inline">Plan</span>
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-accent px-2 text-xs font-bold text-black">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5"
            aria-label={`Saved workouts, ${savedCount} workouts`}
          >
            <span className="hidden text-white/70 md:inline">Saved</span>
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full border border-white/30 px-2 text-xs font-bold text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 sm:hidden">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${active ? "bg-white/10 text-accent" : "text-white/70 hover:text-white"}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
