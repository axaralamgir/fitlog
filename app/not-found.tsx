import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-display text-7xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
        This page skipped leg day
      </h1>
      <p className="mt-3 max-w-md text-white/50">
        We couldn&apos;t find the page you&apos;re looking for. It may have been moved,
        renamed, or never existed.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Workouts
      </Link>
    </div>
  );
}
