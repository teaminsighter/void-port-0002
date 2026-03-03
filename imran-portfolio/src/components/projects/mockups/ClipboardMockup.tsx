export default function ClipboardMockup() {
  return (
    <div className="relative w-[45%] h-[55%]">
      {[
        { bottom: '0', left: '0', z: 1, rotate: '', accent: false },
        { bottom: '12%', left: '5%', z: 2, rotate: 'rotate-[-2deg]', accent: false },
        { bottom: '24%', left: '10%', z: 3, rotate: 'rotate-[1deg]', accent: true },
      ].map((card, i) => (
        <div
          key={i}
          className={`absolute w-full h-[50%] bg-white/[0.03] border p-[6%] flex flex-col gap-2 ${card.rotate} ${
            card.accent ? 'border-[rgba(244,114,182,0.2)]' : 'border-white/[0.08]'
          }`}
          style={{ bottom: card.bottom, left: card.left, zIndex: card.z }}
        >
          <div className={`h-[5px] rounded-sm ${card.accent ? 'bg-[rgba(244,114,182,0.25)] w-3/4' : 'bg-white/[0.08] w-4/5'}`} />
          <div className={`h-[5px] rounded-sm w-3/5 ${card.accent ? 'bg-[rgba(244,114,182,0.25)]' : 'bg-white/[0.08]'}`} />
        </div>
      ))}
    </div>
  );
}
