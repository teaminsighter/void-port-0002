export default function DashboardMockup() {
  return (
    <div className="flex w-full h-full p-[8%] gap-[3%]">
      <div className="w-[16%] h-full bg-white/[0.04] border border-white/[0.06] flex flex-col p-[12%_10%] gap-[10%]">
        <div className="w-full h-1.5 bg-accent/50 rounded-sm" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full h-1.5 bg-white/[0.08] rounded-sm" />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-[3%]">
        <div className="h-[10%] bg-white/[0.03] border border-white/5" />
        <div className="flex-1 grid grid-cols-2 gap-[3%]">
          {[
            [40, 70, 55, 85, 60],
            [65, 45, 80, 35, 90],
            [50, 75, 60, 40, 70],
            [80, 55, 65, 90, 45],
          ].map((bars, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 flex items-end p-[10%] gap-[6%]">
              {bars.map((h, j) => (
                <div key={j} className="flex-1 bg-accent/20 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
