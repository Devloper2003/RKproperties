"use client";

export function LotusLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer lotus petals */}
      <g strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6 C 20 14, 20 22, 24 28 C 28 22, 28 14, 24 6 Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M24 28 C 18 26, 12 22, 9 14 C 16 16, 22 20, 24 28 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M24 28 C 30 26, 36 22, 39 14 C 32 16, 26 20, 24 28 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M24 28 C 16 30, 8 30, 4 24 C 11 22, 18 24, 24 28 Z" fill="currentColor" fillOpacity="0.08" />
        <path d="M24 28 C 32 30, 40 30, 44 24 C 37 22, 30 24, 24 28 Z" fill="currentColor" fillOpacity="0.08" />
        <path d="M24 28 C 22 32, 18 36, 14 38 C 15 32, 19 29, 24 28 Z" fill="currentColor" fillOpacity="0.06" />
        <path d="M24 28 C 26 32, 30 36, 34 38 C 33 32, 29 29, 24 28 Z" fill="currentColor" fillOpacity="0.06" />
      </g>
      {/* Center bindu */}
      <circle cx="24" cy="26" r="3" fill="currentColor" />
      {/* Temple kalash spire on top */}
      <path d="M24 2 L 22 6 L 26 6 Z" fill="currentColor" />
      <line x1="24" y1="0" x2="24" y2="2" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function MandalaSVG({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.5">
        <circle cx="100" cy="100" r="95" />
        <circle cx="100" cy="100" r="80" />
        <circle cx="100" cy="100" r="65" />
        <circle cx="100" cy="100" r="50" />
        <circle cx="100" cy="100" r="35" />
        <circle cx="100" cy="100" r="20" />
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x1 = 100 + 20 * Math.cos(angle);
          const y1 = 100 + 20 * Math.sin(angle);
          const x2 = 100 + 95 * Math.cos(angle);
          const y2 = 100 + 95 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 100 + 57 * Math.cos(angle);
          const cy = 100 + 57 * Math.sin(angle);
          return <circle key={i} cx={cx} cy={cy} r="8" />;
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x = 100 + 35 * Math.cos(angle);
          const y = 100 + 35 * Math.sin(angle);
          return <circle key={i} cx={x} cy={y} r="2" fill="currentColor" />;
        })}
      </g>
    </svg>
  );
}

export function OmSymbol({ className = "" }: { className?: string }) {
  return (
    <span className={`font-devanagari ${className}`} aria-hidden="true">
      ॐ
    </span>
  );
}
