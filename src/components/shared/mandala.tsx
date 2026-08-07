interface MandalaProps {
  className?: string;
  size?: number;
  stroke?: string;
}

/**
 * Decorative mandala SVG used as a slowly rotating background ornament.
 */
export function Mandala({ className = "", size = 400, stroke = "rgba(197, 162, 62, 0.35)" }: MandalaProps) {
  const petals = Array.from({ length: 16 });
  const innerPetals = Array.from({ length: 8 });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g stroke={stroke} strokeWidth="0.6">
        <circle cx="100" cy="100" r="98" />
        <circle cx="100" cy="100" r="84" />
        <circle cx="100" cy="100" r="68" strokeDasharray="2 3" />
        <circle cx="100" cy="100" r="48" />
        <circle cx="100" cy="100" r="28" strokeDasharray="1 2" />
        <circle cx="100" cy="100" r="10" />
      </g>
      {petals.map((_, i) => {
        const angle = (i * 360) / petals.length;
        return (
          <g key={`p-${i}`} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M100 16 C108 38, 108 58, 100 68 C92 58, 92 38, 100 16 Z"
              stroke={stroke}
              strokeWidth="0.6"
              fill="none"
            />
            <circle cx="100" cy="20" r="1.6" fill={stroke} />
          </g>
        );
      })}
      {innerPetals.map((_, i) => {
        const angle = (i * 360) / innerPetals.length;
        return (
          <g key={`ip-${i}`} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M100 70 C104 80, 104 88, 100 92 C96 88, 96 80, 100 70 Z"
              stroke={stroke}
              strokeWidth="0.5"
              fill="none"
            />
          </g>
        );
      })}
      <circle cx="100" cy="100" r="3" fill={stroke} />
    </svg>
  );
}

/** Small inline lotus mark used in the logo. */
export function LotusMark({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 4 C18 10, 18 14, 16 18 C14 14, 14 10, 16 4 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M16 18 C11 12, 7 11, 3 13 C7 16, 11 18, 16 18 Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M16 18 C21 12, 25 11, 29 13 C25 16, 21 18, 16 18 Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M16 18 C12 22, 9 26, 10 30 C14 28, 16 24, 16 18 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M16 18 C20 22, 23 26, 22 30 C18 28, 16 24, 16 18 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <circle cx="16" cy="18" r="2.4" fill="currentColor" />
    </svg>
  );
}
