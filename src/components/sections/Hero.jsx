import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import CakeAnimation from './CakeAnimation';

export default function Hero() {
  const words = ["Reimagined.", "Handcrafted.", "Elevated."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 4000); // Swap words every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Floating background sparkles config
  const floatingParticles = [
    { id: 1, size: 10, left: '8%', top: '22%', delay: 0, duration: 18, isStar: true },
    { id: 2, size: 6, left: '82%', top: '15%', delay: 2, duration: 22, isStar: false },
    { id: 3, size: 12, left: '15%', top: '65%', delay: 4, duration: 25, isStar: false },
    { id: 4, size: 8, left: '92%', top: '70%', delay: 1, duration: 16, isStar: true },
    { id: 5, size: 14, left: '45%', top: '35%', delay: 3, duration: 24, isStar: true },
    { id: 6, size: 8, left: '72%', top: '48%', delay: 5, duration: 19, isStar: false },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary dark:bg-gray-950 transition-colors duration-500">
      
      {/* Luxury Ambient Glow Blobs with continuous smooth scale & rotate animations */}
      <motion.div 
        className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          x: [0, 30, -20, 10, 0],
          y: [0, -20, 40, -10, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          scale: [1, 0.85, 1.15, 0.95, 1],
          x: [0, -40, 20, -10, 0],
          y: [0, 30, -30, 20, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Elegant Geometric Accents */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      {/* Floating Sparkles & Dust Particles in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {floatingParticles.map((p) => (
          <motion.svg
            key={p.id}
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="none"
            className="absolute text-primary/20 dark:text-primary/10"
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: p.isStar ? [0, 360] : 0
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
          >
            {p.isStar ? (
              <path d="M12,2 L14.5,9.5 L22,12 L14.5,14.5 L12,22 L9.5,14.5 L2,12 L9.5,9.5 Z" fill="currentColor" />
            ) : (
              <circle cx="12" cy="12" r="8" fill="currentColor" />
            )}
          </motion.svg>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-28 pb-16 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h2 className="text-xs md:text-sm tracking-[0.35em] uppercase text-primary font-poppins font-semibold mb-6">
                Maison de Pâtisserie
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-light text-text dark:text-white leading-tight mb-8">
                Artisan Cakes <br />
                <span className="relative inline-block mt-2 min-w-[280px] sm:min-w-[360px] lg:min-w-[unset]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="italic font-playfair text-primary inline-block"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                  
                  {/* Dynamic underlying brushstroke */}
                  <svg 
                    className="absolute left-0 -bottom-2 w-full h-3 text-primary/60 dark:text-primary/45" 
                    viewBox="0 0 100 10" 
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      key={index}
                      d="M0,5 Q50,1 100,5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-poppins font-light max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed">
                Indulge in the finest French pastry artistry. Sculpted by hand, flavored by nature, and designed to elevate your most celebrated moments.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <Button 
                  variant="primary" 
                  className="!rounded-full !px-10 !py-4 text-xs tracking-widest uppercase shadow-lg hover:shadow-primary/30 w-full sm:w-auto transition-all"
                  onClick={() => document.getElementById('cakes').scrollIntoView({ behavior: 'smooth' })}
                >
                  View Collection
                </Button>
                <Button 
                  variant="outline" 
                  className="!rounded-full !px-10 !py-4 text-xs tracking-widest uppercase border-gray-300 text-text hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900 w-full sm:w-auto transition-all"
                  onClick={() => document.getElementById('flavours').scrollIntoView({ behavior: 'smooth' })}
                >
                  Our Flavours
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Animated Interactive Cake SVG */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[400px] relative flex items-center justify-center"
            >
              <CakeAnimation />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
