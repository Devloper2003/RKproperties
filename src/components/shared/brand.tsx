"use client";

import Image from "next/image";

// RK Properties Logo — uses the uploaded RK logo image
export function LotusLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/rk-logo.png"
      alt="RK Properties Logo"
      width={40}
      height={40}
      className={`object-contain ${className}`}
      priority
    />
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
