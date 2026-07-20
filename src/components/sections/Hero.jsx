import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const defaultSlides = [
  {
    id: 1,
    title: "Luxury Wedding Cake",
    subtitle: "Maison de Pâtisserie",
    description: "A multi-tiered masterpiece adorned with handcrafted white chocolate roses, delicate lace icing, and 24k gold leaf accents.",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200&q=80",
    cta: "Order Bespoke"
  },
  {
    id: 2,
    title: "Chocolate Truffle Gateau",
    subtitle: "Signature Collection",
    description: "Decadent chocolate layers filled with smooth grand cru ganache, finished with a flawless mirror glaze.",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1200&q=80",
    cta: "Explore Flavours"
  },
  {
    id: 3,
    title: "Artisan Birthday Cake",
    subtitle: "Celebration Special",
    description: "Fluffy chiffon layers with fresh organic strawberries, Madagascan vanilla diplomat cream, and a whimsical watercolor frosting.",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200&q=80",
    cta: "Order Now"
  },
  {
    id: 4,
    title: "Strawberry Fraisier",
    subtitle: "French Classic",
    description: "Traditional French biscuit layered with fresh strawberries, light mousseline cream, and an elegant hand-rolled marzipan topper.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&q=80",
    cta: "Order Fraisier"
  },
  {
    id: 5,
    title: "Parisian Macaron Tower",
    subtitle: "Delicate Pâtisserie",
    description: "A showstopping display of crisp French almond macarons layered with white chocolate raspberry ganache and fresh garden fruits.",
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=1200&q=80",
    cta: "Discover More"
  },
  {
    id: 6,
    title: "Minimalist White Cake",
    subtitle: "Modern Luxury",
    description: "Sleek, textured white buttercream layers finished with single sculptural sugar-flower styling for the ultimate refined statement.",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1200&q=80",
    cta: "Request Quote"
  }
];

export default function Hero() {
  const [slides, setSlides] = useState(defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

    // Real-time automatic background sync every 2.5 seconds & on window focus
    const interval = setInterval(fetchHeroSlides, 2500);
    window.addEventListener('focus', fetchHeroSlides);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', fetchHeroSlides);
    };
  }, []);
  const slideRefs = useRef([]);
  const progressBarRef = useRef(null);
  const autoplayTween = useRef(null);
  const containerRef = useRef(null);

  // Sync ref with current state to solve closure captures
  const currentIndexRef = useRef(0);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Setup initial slide element layouts
  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const firstSlide = slideRefs.current[0];
    if (firstSlide) {
      const image = firstSlide.querySelector('.slide-image');
      const subtitle = firstSlide.querySelector('.hero-subtitle');
      const title = firstSlide.querySelector('.hero-title');
      const description = firstSlide.querySelector('.hero-description');
      const btn = firstSlide.querySelector('.hero-btn-wrapper');
      const glow = firstSlide.querySelector('.light-glow');

      if (image) gsap.set(image, { opacity: 1, scale: 1.15, filter: 'blur(0px)', rotation: 0 });
      if (subtitle) gsap.set(subtitle, { opacity: 1, y: 0 });
      if (title) gsap.set(title, { opacity: 1, y: 0, filter: 'blur(0px)' });
      if (description) gsap.set(description, { opacity: 1, y: 0, filter: 'blur(0px)' });
      if (btn) gsap.set(btn, { opacity: 1, scale: 1 });
      if (glow) gsap.set(glow, { opacity: 0.5, scale: 1 });
    }

  }, [slides]);

  const startAutoplay = () => {};
  const stopAutoplay = () => {};

  const goToSlide = (nextIndex) => {
    if (isAnimating || nextIndex === currentIndexRef.current) return;
    setIsAnimating(true);

    const prevSlide = slideRefs.current[currentIndexRef.current];
    const nextSlide = slideRefs.current[nextIndex];

    if (!prevSlide || !nextSlide) {
      setCurrentIndex(nextIndex);
      setIsAnimating(false);
      return;
    }

    // Position next slide on top with 0 opacity to prepare crossfade
    gsap.set(nextSlide, { 
      display: 'flex', 
      opacity: 0,
      zIndex: 20, 
      clipPath: 'none'
    });
    gsap.set(prevSlide, { zIndex: 10 });

    const nextElements = nextSlide.querySelectorAll('.slide-image, .hero-subtitle, .hero-title, .hero-description, .hero-btn-wrapper');
    gsap.set(nextElements, { opacity: 1, y: 0, scale: 1, filter: 'none' });

    // Smooth fast crossfade without white screen gap (0.2s)
    gsap.to(nextSlide, {
      opacity: 1,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        gsap.set(prevSlide, { display: 'none', zIndex: 1, opacity: 1 });
        gsap.set(nextSlide, { zIndex: 10 });
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      }
    });
  };

  // Mouse Parallax & 3D Tilt handlers (disabled per user request)
  const handleMouseMove = () => {};

  const handleMouseEnter = () => {
    if (autoplayTween.current) autoplayTween.current.pause();
  };

  const handleMouseLeave = () => {
    if (autoplayTween.current && !isAnimating) autoplayTween.current.play();
  };

  const handlePrev = () => {
    if (isAnimating) return;
    const nextIndex = (currentIndexRef.current - 1 + slides.length) % slides.length;
    goToSlide(nextIndex);
  };

  const handleNext = () => {
    if (isAnimating) return;
    const nextIndex = (currentIndexRef.current + 1) % slides.length;
    goToSlide(nextIndex);
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[90vh] lg:h-screen overflow-hidden bg-secondary dark:bg-gray-950 transition-colors duration-500 flex flex-col justify-center"
    >
      {/* Film Grain Shader */}
      <div className="luxury-grain" />

      {/* Mesh background dust particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div 
            key={idx}
            className="absolute bg-primary/10 rounded-full blur-2xl opacity-15"
            style={{
              width: `${150 + idx * 80}px`,
              height: `${150 + idx * 80}px`,
              left: `${15 + idx * 12}%`,
              top: `${20 + (idx % 2) * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Fullscreen Slider Stack */}
      <div className="w-full h-full relative">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            ref={(el) => (slideRefs.current[idx] = el)}
            className="absolute inset-0 w-full h-full flex items-center"
            style={{ display: idx === currentIndex ? 'flex' : 'none' }}
          >
            {/* Glowing Aura bloom */}
            <div 
              className="light-glow absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none z-0 opacity-0"
            />

            <div className="container mx-auto px-4 sm:px-6 h-full flex items-center pt-20 sm:pt-28 pb-12 lg:pt-20 lg:pb-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center w-full">
                
                {/* Left side: Text Details */}
                <div className="slide-text-container lg:col-span-7 text-center lg:text-left order-2 lg:order-1 select-none">
                  {/* Overline subtitle */}
                  <h2 className="hero-subtitle text-[10px] sm:text-xs md:text-sm tracking-[0.35em] uppercase text-primary font-poppins font-semibold mb-2 sm:mb-6">
                    {slide.subtitle}
                  </h2>

                  {/* Title (Full block reveal in sync) */}
                  <h1 className="hero-title text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-playfair font-light text-text dark:text-white leading-tight mb-3 sm:mb-8">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="hero-description text-xs sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-poppins font-light max-w-2xl mx-auto lg:mx-0 mb-5 sm:mb-12 leading-relaxed line-clamp-2 sm:line-clamp-none px-2 sm:px-0">
                    {slide.description}
                  </p>

                  {/* Action CTA */}
                  <div className="hero-btn-wrapper">
                    <Button 
                      variant="primary"
                      className="!rounded-full !px-6 !py-2.5 sm:!px-10 sm:!py-4 text-[10px] sm:text-xs tracking-widest uppercase shadow-lg hover:shadow-[0_10px_25px_-5px_rgba(212,175,55,0.45)] hover:-translate-y-[5px] transition-all duration-300 group cursor-pointer"
                    >
                      {slide.cta}
                      <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300 ml-1">→</span>
                    </Button>
                  </div>
                </div>

                {/* Right side: High quality Cake Image with Smooth Floating Animation */}
                <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
                  <motion.div 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                    className="slide-image-wrapper relative w-44 h-44 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[480px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 dark:border-gray-800/10"
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="slide-image w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 sm:gap-6 w-full max-w-lg px-6">
        
        {/* Pagination Dots */}
        <div className="flex items-center gap-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'bg-primary w-6' : 'bg-gray-400 dark:bg-gray-700 hover:bg-primary/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-8 text-xs font-poppins tracking-[0.25em] text-gray-400">
          <button 
            onClick={handlePrev}
            className="hover:text-primary transition-colors uppercase cursor-pointer"
          >
            Prev
          </button>
          
          <span className="text-gray-300 dark:text-gray-700">|</span>
          
          <button 
            onClick={handleNext}
            className="hover:text-primary transition-colors uppercase cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

    </section>
  );
}
