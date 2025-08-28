import { useEffect, useState } from 'react';

export const PulseLoader = () => {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBeat(prev => (prev + 1) % 3);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="relative w-48 h-16 mx-auto mb-6 flex items-center justify-center">
        {/* Heart rate line */}
        <svg 
          width="192" 
          height="64" 
          viewBox="0 0 192 64" 
          className="overflow-visible"
        >
          {/* Background grid lines */}
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Pulse line */}
          <path
            d="M0,32 L40,32 L45,10 L50,54 L55,32 L60,32 L65,20 L70,44 L75,32 L192,32"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-all duration-300 ${beat === 1 ? 'animate-pulse' : ''}`}
            style={{
              filter: beat === 1 ? 'drop-shadow(0 0 8px hsl(var(--primary)))' : 'none'
            }}
          />
          
          {/* Moving dot */}
          <circle
            cx="0"
            cy="32"
            r="3"
            fill="hsl(var(--primary))"
            className="animate-pulse"
            style={{
              filter: 'drop-shadow(0 0 4px hsl(var(--primary)))'
            }}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;192,0;0,0"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
      
      <div className="flex items-center justify-center space-x-2 mb-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <p className="text-muted-foreground font-mono text-sm tracking-wider">
          Loading Pulse Feed...
        </p>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <div className="text-xs text-muted-foreground/60 font-mono">
        Monitoring heartbeat of Bitcoin community
      </div>
    </div>
  );
};