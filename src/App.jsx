import React from 'react';

function App() {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
  {/* Subtle Spotlight/Orb Glow Background - consulting.com style */}
  <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        
        {/* Large soft spotlight orb 1 */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 70%)',
            animation: 'spotlight-1 45s ease-in-out infinite alternate',
            filter: 'blur(60px)',
            willChange: 'transform, opacity',
            top: '10%',
            left: '-20%',
          }}
        />
        
        {/* Large soft spotlight orb 2 */}
        <div 
          className="absolute w-[900px] h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.10) 35%, transparent 70%)',
            animation: 'spotlight-2 50s ease-in-out infinite alternate',
            filter: 'blur(65px)',
            willChange: 'transform, opacity',
            bottom: '5%',
            right: '-25%',
          }}
        />
        
        {/* Medium spotlight orb 3 */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)',
            animation: 'spotlight-3 40s ease-in-out infinite alternate',
            filter: 'blur(55px)',
            willChange: 'transform, opacity',
            top: '40%',
            left: '30%',
          }}
        />
        
        {/* Sweeping satin ribbon bands for prominence */}
        <div
          className="absolute -left-1/3 -top-1/4 w-[180%] h-[60%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 60%, transparent 100%)',
            filter: 'blur(40px)',
            animation: 'ribbon-sweep-1 36s ease-in-out infinite',
            mixBlendMode: 'screen',
            borderRadius: '80px',
            willChange: 'transform, opacity',
          }}
        />

        <div
          className="absolute -right-1/3 bottom-0 w-[180%] h-[55%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 65%, transparent 100%)',
            filter: 'blur(36px)',
            animation: 'ribbon-sweep-2 40s ease-in-out infinite',
            mixBlendMode: 'screen',
            borderRadius: '80px',
            willChange: 'transform, opacity',
          }}
        />

        {/* Ambient background glow - static with pulse */}
        <div 
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 55%)',
            animation: 'ambient-pulse 12s ease-in-out infinite',
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* Minimal dark overlay for perfect text contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/5 to-black/20" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight leading-none">
          Context Flow.
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 tracking-tight">
          Coming Soon
        </p>

        {/* One-Liner remains the same */}
        <p className="mt-6 text-xl md:text-2xl lg:text-3xl font-light text-white/80 leading-relaxed max-w-4xl mx-auto">
          Reclaim your attention. We transform your scattered digital life into synthesized, queryable knowledge.
        </p>
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-white/5 to-transparent blur-2xl" />
    </div>
  );
}

export default App;
