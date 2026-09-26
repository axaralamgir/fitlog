import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 rounded-2xl border border-white/5 bg-base-850 p-8 sm:p-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-white/60">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a href="#library" className="btn-primary mt-8">
            Browse Workouts
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <Image
            src="/assets/banner.png"
            alt="FitLog hero illustration"
            fill
            sizes="(max-width: 1024px) 60vw, 400px"
            className="rounded-2xl object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
