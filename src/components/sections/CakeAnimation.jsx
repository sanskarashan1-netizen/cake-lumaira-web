import { motion } from 'framer-motion';

export default function CakeAnimation({ mouseX = 0, mouseY = 0 }) {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const floatDistance = isMobile ? -6 : -12;

  // Sparkles configuration
  const sparkles = [
    { id: 1, delay: 0, x: -65, y: -160, scale: 0.8 },
    { id: 2, delay: 0.6, x: 65, y: -200, scale: 1.1 },
    { id: 3, delay: 1.2, x: -90, y: -240, scale: 0.7 },
    { id: 4, delay: 0.8, x: 90, y: -150, scale: 0.9 },
    { id: 5, delay: 1.8, x: -35, y: -280, scale: 1.2 },
    { id: 6, delay: 2.2, x: 45, y: -260, scale: 0.8 },
    { id: 7, delay: 1.5, x: 0, y: -220, scale: 1.0 },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      {/* Outer wrapper: follows mouse parallax slightly (max 15px) */}
      <motion.svg 
        initial={{ opacity: 0, scale: 0.75, rotate: -8, y: 40 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
        transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
        style={{
          x: mouseX * 15,
          y: mouseY * 15,
        }}
        viewBox="0 0 350 400" 
        className="w-full h-full drop-shadow-[0_15px_35px_rgba(212,175,55,0.18)] dark:drop-shadow-[0_20px_50px_rgba(212,175,55,0.1)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2C76A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B08D2A" />
          </linearGradient>

          {/* Dusty Rose Gradient */}
          <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EABCB9" />
            <stop offset="60%" stopColor="#DDA7A5" />
            <stop offset="100%" stopColor="#C58B89" />
          </linearGradient>

          {/* Ivory Cream Gradient */}
          <linearGradient id="creamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FAF5E6" />
            <stop offset="100%" stopColor="#EADFBE" />
          </linearGradient>

          {/* Flame Gradient */}
          <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF4500" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="1" />
          </linearGradient>

          {/* Pedestal Stand Shadow */}
          <radialGradient id="standShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Glow Filter for Candle */}
          <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Stand Shadow on Table - reacts in sync with float */}
        <motion.ellipse 
          cx="175" 
          cy="340" 
          animate={{
            rx: [90, 80, 90], // gets smaller/tighter as stand floats higher
            ry: [12, 10, 12],
            opacity: [0.18, 0.10, 0.18] // grows fainter as it moves up
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="url(#standShadow)" 
        />

        {/* Slow Rotating Golden Ring of Magic */}
        <motion.ellipse
          cx="175"
          cy="200"
          rx="115"
          ry="32"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="1.2"
          strokeDasharray="6,8"
          opacity="0.35"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ originX: "175px", originY: "200px" }}
        />

        {/* Sparkles Floating Upwards */}
        {sparkles.map((s) => (
          <motion.path
            key={s.id}
            d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z"
            fill="#D4AF37"
            filter="url(#flameGlow)"
            initial={{ x: 175 + s.x, y: 260, opacity: 0, scale: 0 }}
            animate={{ 
              y: [260, 260 + s.y], 
              opacity: [0, 0.9, 0],
              scale: [0, s.scale, 0],
              rotate: [0, 90, 180]
            }}
            transition={{ 
              duration: 4.5, 
              repeat: Infinity, 
              delay: s.delay,
              ease: "easeOut"
            }}
          />
        ))}

        {/* --- CAKE SYSTEM GROUP (Continuous Anti Gravity Float) --- */}
        <motion.g
          animate={{
            y: [0, floatDistance, 0],
            rotate: [-0.8, 0.8, -0.8]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ originX: "175px", originY: "200px" }}
        >
          
          {/* --- PEDESTAL / CAKE STAND --- */}
          <g id="cakeStand">
            {/* Base */}
            <path 
              d="M 125,325 C 125,325 125,340 175,340 C 225,340 225,325 225,325 L 210,305 C 210,305 195,310 175,310 C 155,310 140,305 140,305 Z" 
              fill="url(#goldGrad)" 
            />
            {/* Stem */}
            <path 
              d="M 165,275 L 185,275 L 190,305 L 160,305 Z" 
              fill="url(#goldGrad)" 
              opacity="0.9" 
            />
            {/* Plate Bottom edge */}
            <path 
              d="M 85,265 C 85,275 125,285 175,285 C 225,285 265,275 265,265 L 265,270 C 265,280 225,290 175,290 C 125,290 85,280 85,270 Z" 
              fill="#B08D2A" 
            />
            {/* Plate top ellipse */}
            <ellipse cx="175" cy="265" rx="90" ry="15" fill="url(#goldGrad)" />
            <ellipse cx="175" cy="262" rx="86" ry="13" fill="#FFEAA7" opacity="0.15" />
          </g>

          {/* --- LAYER 1: BOTTOM (Dusty Rose) --- */}
          <g>
            {/* Cylinder Base */}
            <path 
              d="M 100,215 L 100,250 C 100,260 133,268 175,268 C 217,268 250,260 250,250 L 250,215 Z" 
              fill="url(#roseGrad)" 
            />
            {/* Top Face */}
            <ellipse cx="175" cy="215" rx="75" ry="15" fill="#EABCB9" />
            
            {/* Icing Drips decoration */}
            <path 
              d="M 100,215 C 105,225 110,227 115,220 C 120,212 125,228 135,224 C 145,220 150,230 160,225 C 170,220 175,228 185,225 C 195,222 200,232 210,226 C 220,220 225,229 235,222 C 245,215 248,223 250,215" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              opacity="0.85" 
            />
          </g>

          {/* --- LAYER 2: MIDDLE (Ivory Cream) --- */}
          <g>
            {/* Cylinder Base */}
            <path 
              d="M 112,165 L 112,200 C 112,208 140,215 175,215 C 210,215 238,208 238,200 L 238,165 Z" 
              fill="url(#creamGrad)" 
            />
            {/* Top Face */}
            <ellipse cx="175" cy="165" rx="63" ry="12" fill="#FFFDF5" />
            
            {/* Gold ribbon on middle layer */}
            <path 
              d="M 112,185 C 125,192 150,195 175,195 C 200,195 225,192 238,185" 
              fill="none" 
              stroke="url(#goldGrad)" 
              strokeWidth="4" 
              opacity="0.8" 
            />
          </g>

          {/* --- LAYER 3: TOP (Soft Gold & Toppings) --- */}
          <g>
            {/* Cylinder Base */}
            <path 
              d="M 125,120 L 125,150 C 125,158 147,163 175,163 C 203,163 225,158 225,150 L 225,120 Z" 
              fill="url(#goldGrad)" 
            />
            {/* Top Face */}
            <ellipse cx="175" cy="120" rx="50" ry="10" fill="#F3E5AB" />

            {/* Decorative cream swirls around top edge */}
            {Array.from({ length: 8 }).map((_, idx) => {
              const angle = (idx * Math.PI * 2) / 8;
              const rx = 45;
              const ry = 9;
              const cx = 175 + Math.cos(angle) * rx;
              const cy = 120 + Math.sin(angle) * ry;
              return (
                <circle 
                  key={idx} 
                  cx={cx} 
                  cy={cy - 2} 
                  r="3.5" 
                  fill="#FFF" 
                  opacity="0.9" 
                  className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
                />
              );
            })}

            {/* --- CANDLE AND FLAME --- */}
            <g id="candle">
              {/* Elegant Gold Patterned Candle */}
              <rect x="172" y="80" width="6" height="30" rx="1.5" fill="url(#goldGrad)" />
              {/* White spiral candle stripes */}
              <path d="M 172,105 L 178,101 M 172,95 L 178,91 M 172,85 L 178,81" stroke="#FFF" strokeWidth="1.5" opacity="0.7" />
              
              {/* Wick */}
              <line x1="175" y1="80" x2="175" y2="74" stroke="#5C3D11" strokeWidth="1.8" />

              {/* Glowing Aura (Behind Flame) */}
              <circle cx="175" cy="65" r="14" fill="#FFC048" opacity="0.25" filter="url(#flameGlow)" />

              {/* Flame (Animated Flickering Path - flickers scale, rotation, brightness) */}
              <motion.path
                d="M 175,74 C 170,68 170,60 175,52 C 180,60 180,68 175,74 Z"
                fill="url(#flameGrad)"
                filter="url(#flameGlow)"
                style={{ originX: "175px", originY: "74px" }}
                animate={{
                  scaleY: [1, 1.08, 0.96, 1.08, 1],
                  scaleX: [1, 0.94, 1.06, 0.94, 1],
                  rotate: [-2, 2, -1, 1, -2],
                  opacity: [0.95, 1, 0.9, 1, 0.95]
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          </g>
        </motion.g>
      </motion.svg>
    </div>
  );
}
