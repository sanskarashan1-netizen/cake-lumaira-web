import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LuxuryNavbar from '../components/layout/LuxuryNavbar';
import CinematicHero from '../components/hero/CinematicHero';
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



    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <LuxuryNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main>
        <CinematicHero />
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
