'use client';

export default function WaveformMockup() {
  return (
    <div className="flex items-center justify-center gap-1 w-[60%] h-[50%]">
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="w-1 bg-[#60A5FA] rounded-sm opacity-50 animate-wave-bar"
          style={{
            animationDelay: `${i * 0.07}s`,
            height: `${20 + Math.random() * 60}%`,
          }}
        />
      ))}
    </div>
  );
}
