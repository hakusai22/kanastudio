export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="lg" x1="0" x2="1">
          <stop offset="0" stopColor="#22d4fd"/>
          <stop offset="1" stopColor="#a977ff"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="64" height="64" rx="14" fill="#0f1117"/>
      <path d="M34 12c-3 8-3 16 0 24M18 28c5-3 12-2 18 1M20 44c8 4 18 4 26-1" fill="none" stroke="url(#lg)" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}