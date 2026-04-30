'use client';

import React from 'react';

/* ─────────────────────────────────────────────────────────
   Inline keyframes injected once via a <style> tag so the
   component is fully self-contained (no Tailwind plugin needed).
───────────────────────────────────────────────────────── */
const skeletonStyles = `
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  @keyframes orb-pulse {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50%       { opacity: 0.30; transform: scale(1.08); }
  }
  @keyframes bar-slide {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(400%);  }
  }
  @keyframes spin-ring {
    to { transform: rotate(360deg); }
  }
  @keyframes dots-bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40%            { transform: scale(1.0); opacity: 1;   }
  }
  .sk-shimmer {
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.04) 0%,
      rgba(255,255,255,0.10) 40%,
      rgba(255,255,255,0.04) 80%
    );
    background-size: 600px 100%;
    animation: shimmer 1.6s infinite linear;
  }
  .sk-orb { animation: orb-pulse 3s ease-in-out infinite; }
  .sk-orb-2 { animation: orb-pulse 3s ease-in-out infinite; animation-delay: 1.5s; }
  .sk-ring {
    border: 3px solid rgba(99,102,241,0.15);
    border-top-color: #6366f1;
    animation: spin-ring 0.9s linear infinite;
  }
  .sk-dot { animation: dots-bounce 1.2s ease-in-out infinite; }
  .sk-dot:nth-child(1) { animation-delay: 0.00s; }
  .sk-dot:nth-child(2) { animation-delay: 0.16s; }
  .sk-dot:nth-child(3) { animation-delay: 0.32s; }
  .sk-bar-track { position:relative; overflow:hidden; }
  .sk-bar-slide {
    position:absolute; inset:0;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent);
    animation: bar-slide 1.6s ease-in-out infinite;
  }
`;

/* ── tiny reusable shim block ── */
export function Shim({ className = '' }: { className?: string }) {
  return (
    <div
      className={`sk-shimmer rounded-lg ${className}`}
      style={{ background: 'rgba(255,255,255,0.04)' }}
    />
  );
}

/* ── skeleton card (mirrors the glassmorphism Card atom) ── */
export function SkeletonCard({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="glass rounded-2xl p-6 flex flex-col gap-4 border border-white/5"
      style={{ opacity: 0, animation: `fadeIn 0.5s ease-out ${delay}ms forwards` }}
    >
      {/* icon + title row */}
      <div className="flex items-center gap-4">
        <Shim className="w-12 h-12 rounded-xl shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <Shim className="h-4 w-2/3" />
          <Shim className="h-3 w-1/3" />
        </div>
      </div>
      {/* content lines */}
      <Shim className="h-3 w-full" />
      <Shim className="h-3 w-5/6" />
      <Shim className="h-3 w-4/6" />
      {/* bottom badge row */}
      <div className="flex gap-2 mt-2">
        <Shim className="h-6 w-20 rounded-full" />
        <Shim className="h-6 w-16 rounded-full" />
        <Shim className="h-6 w-24 rounded-full" />
      </div>
    </div>
  );
}

/* ── top progress bar ── */
function TopProgressBar() {
  return (
    <div
      className="sk-bar-track fixed top-0 left-0 right-0 h-[3px] z-[9999]"
      style={{ background: 'rgba(99,102,241,0.08)' }}
    >
      <div className="sk-bar-slide" />
    </div>
  );
}

/* ── centre spinner + dots ── */
function SpinnerBlock() {
  return (
    <div className="flex flex-col items-center gap-6 mb-16">
      {/* ring */}
      <div className="relative">
        <div className="sk-ring w-16 h-16 rounded-full" />
        {/* inner glow dot */}
        <div
          className="absolute inset-0 m-auto w-5 h-5 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)' }}
        />
      </div>
      {/* bouncing dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="sk-dot w-2 h-2 rounded-full"
            style={{ background: 'rgba(99,102,241,0.7)' }}
          />
        ))}
      </div>
      {/* label */}
      <p className="text-sm font-medium" style={{ color: 'rgba(148,163,184,0.7)' }}>
        Loading…
      </p>
    </div>
  );
}

/* ── section title shim ── */
function SkeletonSectionTitle() {
  return (
    <div className="flex flex-col items-center gap-3 mb-12">
      <Shim className="h-8 w-64 md:w-96" />
      <Shim className="h-4 w-48 md:w-72" />
      <div
        className="mt-2 h-1 w-24 rounded-full"
        style={{ background: 'linear-gradient(90deg, #6366f1, #94a3b8, #3b82f6)' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main export – drop this in any loading.tsx / Suspense fallback
   variant: 'page' (full-screen) | 'section' (inline within a page)
───────────────────────────────────────────────────────── */
interface PageSkeletonProps {
  variant?: 'page' | 'section';
  /** Number of skeleton cards to render (default 6) */
  cards?: number;
  /** Show the spinner above the skeleton cards */
  showSpinner?: boolean;
}

export const SkeletonStyles = () => <style dangerouslySetInnerHTML={{ __html: skeletonStyles }} />;

export default function PageSkeleton({
  variant = 'page',
  cards = 6,
  showSpinner = true,
}: PageSkeletonProps) {
  const isPage = variant === 'page';

  return (
    <>
      <SkeletonStyles />

      {/* sliding top-bar only for full-page variant */}
      {isPage && <TopProgressBar />}

      <div
        className={`relative w-full overflow-hidden ${isPage ? 'min-h-screen' : 'min-h-[60vh]'}`}
      >
        {/* ── decorative background orbs ── */}
        <div
          className="sk-orb absolute top-20 left-1/4 w-[30rem] h-[30rem] rounded-full -z-10 pointer-events-none"
          style={{ background: 'rgba(59,130,246,0.12)', filter: 'blur(120px)' }}
        />
        <div
          className="sk-orb-2 absolute bottom-20 right-1/4 w-[35rem] h-[35rem] rounded-full -z-10 pointer-events-none"
          style={{ background: 'rgba(139,92,246,0.08)', filter: 'blur(120px)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 relative">
          {/* Section title shimmer */}
          <SkeletonSectionTitle />

          {/* Spinner */}
          {showSpinner && <SpinnerBlock />}

          {/* Grid of skeleton cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: cards }).map((_, i) => (
              <SkeletonCard key={i} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
