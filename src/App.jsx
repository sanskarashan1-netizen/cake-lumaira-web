import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Loader from './components/common/Loader';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(true);

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize Lenis Smooth Scroll after loading completes
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Synchronize ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [loading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="font-poppins text-text dark:text-gray-100 bg-secondary dark:bg-gray-950 transition-colors duration-500 min-h-screen">
          


          {/* Luxury Loading Screen */}
          <Loader onComplete={() => setLoading(false)} />

          {/* Smooth entrance for the main page after loader completes */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Routes>
                <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
              </Routes>

              <AnimatePresence>
                {showBackToTop && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-pink-700 hover:shadow-xl transition-all z-50 focus:outline-none cursor-pointer"
                    aria-label="Back to top"
                  >
                    <ChevronUp size={24} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
