import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const defaultSlides = [
  {
    slideId: 1,
    title: "Luxury Wedding Cake",
    subtitle: "Maison de Pâtisserie",
    description: "A multi-tiered masterpiece adorned with handcrafted white chocolate roses, delicate lace icing, and 24k gold leaf accents.",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200&q=80",
    cta: "Order Bespoke"
  },
  {
    slideId: 2,
    title: "Chocolate Truffle Gateau",
    subtitle: "Signature Collection",
    description: "Decadent chocolate layers filled with smooth grand cru ganache, finished with a flawless mirror glaze.",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1200&q=80",
    cta: "Explore Flavours"
  },
  {
    slideId: 3,
    title: "Artisan Birthday Cake",
    subtitle: "Celebration Special",
    description: "Fluffy chiffon layers with fresh organic strawberries, Madagascan vanilla diplomat cream, and a whimsical watercolor frosting.",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200&q=80",
    cta: "Order Now"
  },
  {
    slideId: 4,
    title: "Strawberry Fraisier",
    subtitle: "French Classic",
    description: "Traditional French biscuit layered with fresh strawberries, light mousseline cream, and an elegant hand-rolled marzipan topper.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&q=80",
    cta: "Order Fraisier"
  },
  {
    slideId: 5,
    title: "Parisian Macaron Tower",
    subtitle: "Delicate Pâtisserie",
    description: "A showstopping display of crisp French almond macarons layered with white chocolate raspberry ganache and fresh garden fruits.",
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=1200&q=80",
    cta: "Discover More"
  },
  {
    slideId: 6,
    title: "Minimalist White Cake",
    subtitle: "Modern Luxury",
    description: "Sleek, textured white buttercream layers finished with single sculptural sugar-flower styling for the ultimate refined statement.",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1200&q=80",
    cta: "Request Quote"
  }
];

export default function CinematicHero() {
  const [slides, setSlides] = useState(defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const API_URL = import.meta.env.PROD
          ? 'https://cake-lumaira-backend.onrender.com/hero-slides'
          : 'http://localhost:5000/hero-slides';
        const res = await fetch(API_URL);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setSlides(data);
          }
        }
      } catch (err) {
        console.log("Using default hero slides fallback");
      }
    };
    fetchHeroSlides();

    const interval = setInterval(fetchHeroSlides, 3000);
    window.addEventListener('focus', fetchHeroSlides);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', fetchHeroSlides);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex] || defaultSlides[0];

  return (
    <section 
      id="hero"
      className="relative w-full min-h-[90vh] lg:min-h-screen overflow-hidden bg-secondary dark:bg-gray-950 transition-colors duration-500 flex flex-col justify-center items-center select-none pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16"
    >
      <div className="luxury-grain" />

      {/* Radial Champagne Aura Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        {/* Luxury Glass Hero Showcase Frame */}
        <div className="relative bg-white/50 dark:bg-gray-900/40 backdrop-blur-xl border border-white/80 dark:border-gray-800/60 rounded-3xl sm:rounded-[2.5rem] shadow-xl p-6 sm:p-10 lg:p-12 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Text & Details */}
            <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1 pr-0 lg:pr-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id || currentSlide.slideId || currentIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Badges Container */}
                  <div className="flex items-center gap-2.5 flex-wrap justify-center lg:justify-start mb-4 sm:mb-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3.5 py-1 rounded-full text-xs font-poppins font-semibold uppercase tracking-widest">
                      <Sparkles size={12} />
                      <span>{currentSlide.subtitle}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-[10px] font-poppins font-semibold uppercase tracking-widest">
                      <span>✦</span>
                      <span>100% Organic Pâtisserie</span>
                    </div>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-playfair font-normal tracking-wide text-text dark:text-white leading-[1.15] mb-4 sm:mb-6">
                    {currentSlide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-xs sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-poppins font-light max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
                    {currentSlide.description}
                  </p>

                  {/* CTA & Actions */}
                  <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                    <a 
                      href="#cakes" 
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('cakes');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                        if (window.history && window.history.pushState) window.history.pushState(null, '', window.location.pathname);
                      }}
                    >
                      <Button 
                        variant="primary"
                        className="!rounded-full !px-7 !py-3.5 sm:!px-9 sm:!py-4 text-xs sm:text-sm font-poppins tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center gap-2"
                      >
                        <span>{currentSlide.cta}</span>
                        <span>→</span>
                      </Button>
                    </a>
                    
                    <a 
                      href="#design"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('design');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                        if (window.history && window.history.pushState) window.history.pushState(null, '', window.location.pathname);
                      }}
                    >
                      <button className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:text-primary hover:border-primary font-poppins text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer">
                        Custom Cake
                      </button>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Clean Floating Hero Stage */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide.id || currentSlide.slideId || currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                    className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-800/20"
                  >
                    <img 
                      src={currentSlide.image} 
                      alt={currentSlide.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle vignette frame */}
                    <div className="absolute inset-0 ring-1 ring-black/10 rounded-3xl pointer-events-none" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* Clean Navigation Bar Controls */}
      <div className="mt-8 sm:mt-12 flex items-center justify-center gap-6 z-20">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:text-primary hover:border-primary/50 shadow-sm hover:shadow-md transition-all cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'bg-primary w-7' : 'bg-gray-300 dark:bg-gray-700 w-2 hover:bg-primary/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:text-primary hover:border-primary/50 shadow-sm hover:shadow-md transition-all cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
