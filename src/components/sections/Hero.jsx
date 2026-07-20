import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Button from '../common/Button';

const slides = [
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
    image: "/strawberry-fraisier.png",
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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
    const firstSlide = slideRefs.current[0];
    if (firstSlide) {
      const image = firstSlide.querySelector('.slide-image');
      const subtitle = firstSlide.querySelector('.hero-subtitle');
      const title = firstSlide.querySelector('.hero-title');
      const description = firstSlide.querySelector('.hero-description');
      const btn = firstSlide.querySelector('.hero-btn-wrapper');
      const glow = firstSlide.querySelector('.light-glow');

      gsap.set(image, { opacity: 1, scale: 1.15, filter: 'blur(0px)', rotation: 0 });
      gsap.set(subtitle, { opacity: 1, y: 0 });
      gsap.set(title, { opacity: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(description, { opacity: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(btn, { opacity: 1, scale: 1 });
      gsap.set(glow, { opacity: 0.5, scale: 1 });
    }

    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    gsap.set(progressBarRef.current, { scaleX: 0 });
    
    // Autoplay speed (5.0 seconds)
    autoplayTween.current = gsap.to(progressBarRef.current, {
      scaleX: 1,
      duration: 5.0,
      ease: 'none',
      onComplete: () => {
        const nextIndex = (currentIndexRef.current + 1) % slides.length;
        goToSlide(nextIndex);
      }
    });
  };

  const stopAutoplay = () => {
    if (autoplayTween.current) {
      autoplayTween.current.kill();
    }
  };

  const goToSlide = (nextIndex) => {
    if (isAnimating || nextIndex === currentIndexRef.current) return;
    setIsAnimating(true);
    stopAutoplay();

    const prevSlide = slideRefs.current[currentIndexRef.current];
    const nextSlide = slideRefs.current[nextIndex];
    if (!prevSlide || !nextSlide) return;

    // Position next slide above prev
    gsap.set(nextSlide, { 
      display: 'block', 
      zIndex: 20, 
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' // bottom-up mask
    });
    gsap.set(prevSlide, { zIndex: 10 });

    const nextImage = nextSlide.querySelector('.slide-image');
    const nextSubtitle = nextSlide.querySelector('.hero-subtitle');
    const nextTitle = nextSlide.querySelector('.hero-title');
    const nextDescription = nextSlide.querySelector('.hero-description');
    const nextBtn = nextSlide.querySelector('.hero-btn-wrapper');
    const nextGlow = nextSlide.querySelector('.light-glow');

    const prevImage = prevSlide.querySelector('.slide-image');
    const prevSubtitle = prevSlide.querySelector('.hero-subtitle');
    const prevTitle = prevSlide.querySelector('.hero-title');
    const prevDescription = prevSlide.querySelector('.hero-description');
    const prevBtn = prevSlide.querySelector('.hero-btn-wrapper');

    // Reset next slide elements to initial hidden states
    gsap.set(nextImage, { opacity: 0, scale: 1.3, rotation: 6, filter: 'blur(20px)' });
    gsap.set(nextSubtitle, { opacity: 0, y: -15 });
    gsap.set(nextTitle, { opacity: 0, y: 25, filter: 'blur(8px)' });
    gsap.set(nextDescription, { opacity: 0, y: 20, filter: 'blur(6px)' });
    gsap.set(nextBtn, { opacity: 0, scale: 0.95 });
    gsap.set(nextGlow, { opacity: 0, scale: 0.75 });

    // Snappy transitions (0.3s total duration)
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(prevSlide, { display: 'none', zIndex: 1 });
        gsap.set(nextSlide, { zIndex: 10 });
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
        startAutoplay();
      }
    });

    // 1. Zoom out prev image and fade out prev text elements to prevent overlap
    tl.to(prevImage, {
      scale: 1.1,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut'
    }, 0);

    tl.to([prevSubtitle, prevTitle, prevDescription, prevBtn], {
      opacity: 0,
      y: -20,
      duration: 0.25,
      ease: 'power2.in'
    }, 0);

    // 2. Clip-path reveal next slide wrapper
    tl.to(nextSlide, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 0.3,
      ease: 'power3.inOut'
    }, 0);

    // 3. Zoom / rotate next image (starts immediately at 0.02s)
    tl.to(nextImage, {
      scale: 1.15,
      rotation: 0,
      filter: 'blur(0px)',
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, 0.02);

    // 4. Glow bloom reveal
    tl.to(nextGlow, {
      opacity: 0.5,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, 0.02);

    // 5. Text elements reveal concurrently in sync at 0.02s (no slow split-word delays)
    tl.to([nextSubtitle, nextTitle, nextDescription, nextBtn], {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.3,
      stagger: 0.02, // very tiny stagger for natural organic reveal
      ease: 'power3.out'
    }, 0.02);
  };

  // Mouse Parallax & 3D Tilt handlers
  const handleMouseMove = (e) => {
    if (isAnimating) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates (-1 to 1)
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;

    const activeSlide = slideRefs.current[currentIndexRef.current];
    if (!activeSlide) return;

    const img = activeSlide.querySelector('.slide-image');
    const wrapper = activeSlide.querySelector('.slide-image-wrapper');
    const text = activeSlide.querySelector('.slide-text-container');
    const glow = activeSlide.querySelector('.light-glow');

    // Only run parallax on larger pointer devices (desktops)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    if (img) {
      gsap.to(img, { x: x * 8, y: y * 8, rotation: x * 1.5, duration: 0.8, ease: 'power2.out' });
    }
    if (wrapper) {
      gsap.to(wrapper, {
        rotateY: x * 5,
        rotateX: -y * 5,
        transformPerspective: 1000,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
    if (text) {
      gsap.to(text, { x: x * 3, y: y * 3, duration: 0.8, ease: 'power2.out' });
    }
    if (glow) {
      gsap.to(glow, { x: x * 5, y: y * 5, duration: 0.8, ease: 'power2.out' });
    }
  };

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
      className="relative w-full h-screen overflow-hidden bg-secondary dark:bg-gray-950 transition-colors duration-500"
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
            className="absolute inset-0 w-full h-full"
            style={{ display: idx === currentIndex ? 'block' : 'none' }}
          >
            {/* Glowing Aura bloom */}
            <div 
              className="light-glow absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none z-0 opacity-0"
            />

            <div className="container mx-auto px-6 h-full flex items-center pt-24 pb-20 lg:pt-20 lg:pb-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
                
                {/* Left side: Text Details */}
                <div className="slide-text-container lg:col-span-7 text-center lg:text-left order-2 lg:order-1 select-none">
                  {/* Overline subtitle */}
                  <h2 className="hero-subtitle text-[10px] sm:text-xs md:text-sm tracking-[0.35em] uppercase text-primary font-poppins font-semibold mb-3 sm:mb-6 opacity-0">
                    {slide.subtitle}
                  </h2>

                  {/* Title (Full block reveal in sync) */}
                  <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playfair font-light text-text dark:text-white leading-tight mb-4 sm:mb-8 opacity-0">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="hero-description text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-poppins font-light max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-12 leading-relaxed opacity-0 line-clamp-2 sm:line-clamp-none">
                    {slide.description}
                  </p>

                  {/* Action CTA */}
                  <div className="hero-btn-wrapper opacity-0">
                    <Button 
                      variant="primary"
                      className="!rounded-full !px-8 !py-3 sm:!px-10 sm:!py-4 text-[10px] sm:text-xs tracking-widest uppercase shadow-lg hover:shadow-[0_10px_25px_-5px_rgba(212,175,55,0.45)] hover:-translate-y-[5px] transition-all duration-300 group cursor-pointer"
                    >
                      {slide.cta}
                      <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300 ml-1">→</span>
                    </Button>
                  </div>
                </div>

                {/* Right side: High quality Cake Image with 3D Tilt Wrapper */}
                <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
                  <div className="slide-image-wrapper relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 dark:border-gray-800/10">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="slide-image w-full h-full object-cover opacity-0 scale-120 animate-none"
                    />
                  </div>
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

      {/* Slide progress timer bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200 dark:bg-gray-800 z-30 origin-left">
        <div 
          ref={progressBarRef}
          className="w-full h-full bg-primary origin-left scale-x-0"
        />
      </div>
    </section>
  );
}
