import Link from "next/link";

export default function EmptyState({
  title,
  message,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  message: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/10 py-20 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide">{title}</h3>
      <p className="max-w-sm text-sm text-white/50">{message}</p>
      {ctaLabel && ctaHref && (
        <Link href={ctaHref} className="btn-primary mt-3">
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
