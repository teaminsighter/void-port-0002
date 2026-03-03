interface ProficiencyDotsProps {
  level: number;
  max?: number;
}

export default function ProficiencyDots({ level, max = 5 }: ProficiencyDotsProps) {
  return (
    <span className="flex gap-[5px] items-center">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < level ? 'bg-white' : 'bg-white/[0.12]'
          }`}
        />
      ))}
    </span>
  );
}
