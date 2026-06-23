import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl"
        >
          🍰
        </motion.div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="font-poppins text-text dark:text-gray-100 bg-secondary dark:bg-gray-950 transition-colors duration-500 min-h-screen">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>

          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-pink-700 hover:shadow-xl transition-all z-50 focus:outline-none"
                aria-label="Back to top"
              >
                <ChevronUp size={24} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
