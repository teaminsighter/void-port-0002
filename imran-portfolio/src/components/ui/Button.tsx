import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button({ variant = 'primary', href, children, className, onClick }: ButtonProps) {
  const base =
    'hoverable inline-block px-10 py-4 text-xs font-bold uppercase tracking-[2px] font-sans rounded-sm transition-all duration-300 will-change-transform text-center';

  const variants = {
    primary:
      'bg-accent text-bg border border-accent hover:bg-[#3bca6e] hover:border-[#3bca6e] hover:scale-[1.04]',
    secondary:
      'bg-transparent text-white border border-white/40 hover:bg-white hover:text-bg hover:border-white',
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
