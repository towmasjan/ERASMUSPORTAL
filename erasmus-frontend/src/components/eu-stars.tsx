'use client';

/**
 * EU Stars Component - Decorative EU flag stars
 */
export function EuStars({ className = '' }: { className?: string }) {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const radius = 40;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { x, y, delay: i * 0.1 };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {stars.map((star, i) => (
        <g
          key={i}
          transform={`translate(${star.x}, ${star.y})`}
          style={{
            animation: `pulse 2s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <polygon
            points="0,-6 1.5,-2 6,-2 2.5,1 4,5 0,2.5 -4,5 -2.5,1 -6,-2 -1.5,-2"
            fill="currentColor"
            className="text-secondary"
          />
        </g>
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </svg>
  );
}

export function EuStarsBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute top-10 right-10 w-32 h-32 opacity-10">
        <EuStars />
      </div>
      <div className="absolute bottom-20 left-10 w-24 h-24 opacity-5">
        <EuStars />
      </div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 opacity-5">
        <EuStars />
      </div>
    </div>
  );
}

