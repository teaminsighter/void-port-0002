export default function GridMonitorMockup() {
  const active = [0, 3, 5];
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 w-[70%] h-[60%]">
      {Array.from({ length: 8 }, (_, i) => {
        const isActive = active.includes(i);
        return (
          <div
            key={i}
            className={`bg-white/[0.03] border relative ${
              isActive ? 'border-[rgba(251,191,36,0.25)]' : 'border-white/[0.06]'
            }`}
          >
            {isActive && (
              <span className="absolute top-1.5 right-1.5 w-[5px] h-[5px] rounded-full bg-[#FBBF24] opacity-70" />
            )}
            <span className="absolute bottom-1.5 left-1.5 right-1.5 h-[3px] rounded-sm bg-[rgba(251,191,36,0.2)]" />
          </div>
        );
      })}
    </div>
  );
}
