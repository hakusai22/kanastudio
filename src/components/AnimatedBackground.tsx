export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <radialGradient id="bg" cx="0.5" cy="0.2" r="1">
            <stop offset="0%" stopColor="#0b0b0f" />
            <stop offset="60%" stopColor="#0d0d12" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="1440" height="900" fill="url(#bg)" />
        <g className="twinkles">
          <circle cx="680" cy="240" r="2" fill="#fff" className="twinkle" />
          <circle cx="320" cy="300" r="1.8" fill="#fff" className="twinkle" />
          <circle cx="1020" cy="280" r="1.8" fill="#fff" className="twinkle" />
          <circle cx="1200" cy="420" r="1.6" fill="#fff" className="twinkle" />
        </g>
      </svg>
    </div>
  );
}