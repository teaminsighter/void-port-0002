export default function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 border border-accent/30 px-6 py-2.5 rounded-[30px] text-[11px] uppercase tracking-[2px] text-accent shadow-[0_0_20px_rgba(74,222,128,0.08)]">
      <span className="w-2 h-2 rounded-full bg-accent animate-avail-pulse" />
      Available for Work
    </div>
  );
}
