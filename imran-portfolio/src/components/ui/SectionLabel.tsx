interface SectionLabelProps {
  text: string;
  linePosition?: 'left' | 'right' | 'both';
}

export default function SectionLabel({ text, linePosition = 'left' }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4 mb-[clamp(1.5rem,3vh,2.5rem)]">
      {(linePosition === 'left' || linePosition === 'both') && (
        <span className="w-[60px] h-px bg-accent origin-left" />
      )}
      <span className="text-xs uppercase tracking-[4px] text-accent font-medium whitespace-nowrap">
        {text}
      </span>
      {(linePosition === 'right' || linePosition === 'both') && (
        <span className="w-[60px] h-px bg-accent origin-left" />
      )}
    </div>
  );
}
