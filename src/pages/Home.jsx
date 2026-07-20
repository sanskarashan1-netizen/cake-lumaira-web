import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/common/Navbar';
import Hero from '../components/sections/Hero';
import FeaturedCakes from '../components/sections/FeaturedCakes';
import CustomCakeBuilder from '../components/sections/CustomCakeBuilder';
import Flavours from '../components/sections/Flavours';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import SpecialOffer from '../components/sections/SpecialOffer';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';
import CartDrawer from '../components/common/CartDrawer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home({ darkMode, setDarkMode }) {
  
  useEffect(() => {
    // 1. Heading Split Word Mask Reveal: "Artisan Cakes" style
    const mainTitles = document.querySelectorAll('main section:not(#hero) h3, main section:not(#hero) .section-heading h3');
    
    mainTitles.forEach((heading) => {
      const text = heading.innerText;
      if (!text) return;
      
      // Split text into words safely
      heading.innerHTML = '';
      const words = text.split(/\s+/);
      
      words.forEach((word) => {
        const outerSpan = document.createElement('span');
        outerSpan.className = 'inline-block overflow-hidden mr-3 pb-2';
        
        const innerSpan = document.createElement('span');
        innerSpan.innerText = word;
        innerSpan.className = 'inline-block';
        
        outerSpan.appendChild(innerSpan);
        heading.appendChild(outerSpan);
      });
      
      const targets = heading.querySelectorAll('span > span');
      gsap.fromTo(targets,
        { opacity: 0, y: 80, filter: 'blur(15px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 2. Overlines (h2 headings) Fade Down
    const overlines = document.querySelectorAll('main section:not(#hero) h2');
    overlines.forEach((overline) => {
      gsap.fromTo(overline,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: overline,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 3. Paragraphs Fade Up & Blur Removal
    const paragraphs = document.querySelectorAll('main section:not(#hero) p');
    paragraphs.forEach((p) => {
      gsap.fromTo(p,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 4. Cards Staggered Entry (stagger child cards of columns or grids)
    const grids = document.querySelectorAll('main section:not(#hero) .grid, main section:not(#hero) [class*="columns-"]');
    grids.forEach((grid) => {
      const cards = grid.children;
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 80, scale: 0.95, rotation: 1 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main>
        <Hero />
        <FeaturedCakes />
        <CustomCakeBuilder />
        <Flavours />
        <WhyChooseUs />
        <SpecialOffer />
        <Gallery />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
