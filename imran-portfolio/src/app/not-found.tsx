import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 text-center">
      <div>
        <h1 className="text-[clamp(5rem,15vw,12rem)] font-black leading-none text-white/[0.06] mb-4">
          404
        </h1>
        <p className="text-xl text-text-secondary mb-8">
          This page doesn&apos;t exist yet.
        </p>
        <Button href="/">Back to Home</Button>
      </div>
    </section>
  );
}
