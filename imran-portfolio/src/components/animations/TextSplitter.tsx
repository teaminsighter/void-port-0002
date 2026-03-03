'use client';

import { createElement, useRef } from 'react';

interface TextSplitterProps {
  text: string;
  type: 'chars' | 'words';
  className?: string;
  charClassName?: string;
  wrapClassName?: string;
  accentWords?: string[];
  accentClassName?: string;
  tag?: string;
}

export default function TextSplitter({
  text,
  type,
  className = '',
  charClassName = '',
  wrapClassName = '',
  accentWords = [],
  accentClassName = 'text-accent',
  tag = 'span',
}: TextSplitterProps) {
  const ref = useRef<HTMLElement>(null);

  let children: React.ReactNode;

  if (type === 'chars') {
    children = text.split('').map((char, i) => (
      <span key={i} className={`inline-block overflow-hidden align-bottom ${wrapClassName}`}>
        <span className={`inline-block will-change-transform ${charClassName}`}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ));
  } else {
    const words = text.split(/\s+/);
    children = words.map((word, i) => (
      <span key={i}>
        <span className={`inline-block overflow-hidden align-bottom pb-[0.05em] ${wrapClassName}`}>
          <span
            className={`inline-block will-change-transform ${charClassName} ${
              accentWords.includes(word) ? accentClassName : ''
            }`}
          >
            {word}
          </span>
        </span>
        {i < words.length - 1 ? ' ' : ''}
      </span>
    ));
  }

  return createElement(tag, { ref, className }, children);
}
