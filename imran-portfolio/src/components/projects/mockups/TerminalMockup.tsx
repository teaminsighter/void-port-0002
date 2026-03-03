export default function TerminalMockup() {
  return (
    <div className="w-[60%] h-[60%] bg-white/[0.02] border border-white/[0.08] flex flex-col">
      <div className="h-7 border-b border-white/[0.06] flex items-center px-2.5 gap-[5px]">
        <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
      </div>
      <div className="flex-1 p-3 flex flex-col gap-1.5">
        <div className="h-1 rounded-sm bg-white/[0.06] w-[70%]" />
        <div className="h-1 rounded-sm bg-white/[0.06]" />
        <div className="h-1 rounded-sm bg-[rgba(167,139,250,0.25)] w-[70%]" />
        <div className="h-1 rounded-sm bg-white/[0.06] w-[40%]" />
        <div className="h-1 rounded-sm bg-[rgba(167,139,250,0.25)]" />
        <div className="h-1 rounded-sm bg-white/[0.06] w-[40%]" />
        <span className="inline-block w-[7px] h-3 bg-[#A78BFA] animate-blink mt-1" />
      </div>
    </div>
  );
}
