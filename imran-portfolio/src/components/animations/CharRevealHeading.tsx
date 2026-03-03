'use client';

interface CharRevealLine {
  text: string;
  accentWord?: string;
}

interface CharRevealHeadingProps {
  lines: CharRevealLine[];
  className?: string;
  lineClassName?: string;
  charClassName?: string;
  accentClassName?: string;
  tag?: 'h1' | 'h2' | 'h3';
}

export default function CharRevealHeading({
  lines,
  className = '',
  lineClassName = '',
  charClassName = '',
  accentClassName = 'text-accent',
  tag: Tag = 'h2',
}: CharRevealHeadingProps) {
  return (
    <Tag className={className}>
      {lines.map((line, lineIdx) => {
        const accentStart = line.accentWord ? line.text.indexOf(line.accentWord) : -1;
        const accentEnd = accentStart > -1 ? accentStart + line.accentWord!.length : -1;

        return (
          <span key={lineIdx} className={`block ${lineClassName}`} data-line>
            {line.text.split('').map((char, charIdx) => {
              const isAccent = accentStart > -1 && charIdx >= accentStart && charIdx < accentEnd;
              return (
                <span
                  key={charIdx}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <span
                    className={`inline-block will-change-transform ${charClassName} ${
                      isAccent ? accentClassName : ''
                    }`}
                    data-char
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
