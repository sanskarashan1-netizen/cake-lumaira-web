import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, Moon, Sun } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  const links = ['Cakes', 'Design', 'Flavours', 'Gallery', 'Testimonials', 'Pricing'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        backgroundColor: scrolled 
          ? (darkMode ? 'rgba(15, 23, 42, 0.70)' : 'rgba(255, 255, 255, 0.70)') 
          : 'rgba(255, 255, 255, 0)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
      className={`fixed w-full z-50 border-b transition-all duration-500 ${
        scrolled 
          ? 'py-4 border-gray-200 dark:border-gray-800 shadow-sm' 
          : 'py-8 border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between relative">
        
        {/* Left Links */}
        <div className="hidden lg:flex items-center gap-10 flex-1">
          {links.slice(0, 2).map((link, idx) => (
            <motion.a 
              key={link} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.08, ease: "easeOut" }}
              href={`#${link.toLowerCase()}`}
              className="font-poppins font-light tracking-widest text-xs uppercase text-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors relative group"
            >
              {link}
              {/* Smooth Underline Micro Interaction */}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300 ease-out" />
            </motion.a>
          ))}
        </div>

        {/* Center Logo - Appears First (Centered absolutely on mobile, inline on desktop) */}
        <motion.a 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          href="#" 
          className="absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none text-center text-xl sm:text-2xl lg:text-4xl font-playfair font-normal tracking-wide text-text dark:text-white group cursor-pointer"
        >
          LUMAIRA
          <div className="text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.4em] uppercase font-poppins text-gray-400 dark:text-gray-500 mt-0.5 lg:mt-1 group-hover:text-primary transition-colors">
            Pâtisserie
          </div>
        </motion.a>

        {/* Right Icons & Links */}
        <div className="hidden lg:flex items-center justify-end gap-10 flex-1">
          {links.slice(2).map((link, idx) => (
            <motion.a 
              key={link} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (idx + 2) * 0.08, ease: "easeOut" }}
              href={`#${link.toLowerCase()}`}
              className="font-poppins font-light tracking-widest text-xs uppercase text-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors relative group"
            >
              {link}
              {/* Smooth Underline Micro Interaction */}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300 ease-out" />
            </motion.a>
          ))}
          
          {/* Icons - Fade In Last */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            className="flex items-center gap-6 text-text dark:text-gray-300 border-l border-gray-300 dark:border-gray-700 pl-8"
          >
            <button onClick={() => setDarkMode(!darkMode)} className="hover:text-primary transition-colors cursor-pointer">
              {darkMode ? <Sun strokeWidth={1.5} size={20} /> : <Moon strokeWidth={1.5} size={20} />}
            </button>
            <button className="hover:text-primary transition-colors cursor-pointer"><Search strokeWidth={1.5} size={20} /></button>
            <button onClick={() => setIsCartOpen(true)} className="hover:text-primary transition-colors relative cursor-pointer">
              <ShoppingBag strokeWidth={1.5} size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-poppins font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle (Right aligned) */}
        <div className="lg:hidden flex ml-auto items-center gap-3">
          <button onClick={() => setIsCartOpen(true)} className="relative text-text dark:text-gray-300 cursor-pointer p-1">
            <ShoppingBag strokeWidth={1.5} size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-poppins font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-text dark:text-white ml-2 cursor-pointer p-1"
          >
            {isOpen ? <X strokeWidth={1.5} size={24} /> : <Menu strokeWidth={1.5} size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-secondary dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col items-center py-12 gap-8 h-full">
              {links.map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-playfair text-text dark:text-gray-200 hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
              
              {/* Theme Selector inside drawer */}
              <div className="flex items-center gap-4 mt-2 border-t border-gray-200 dark:border-gray-800 pt-6 w-[80%] justify-center">
                <span className="font-poppins text-xs tracking-widest uppercase text-gray-500 dark:text-gray-400">Theme</span>
                <button onClick={() => setDarkMode(!darkMode)} className="text-text dark:text-gray-300 p-2 rounded-full border border-gray-200 dark:border-gray-800 hover:text-primary cursor-pointer">
                  {darkMode ? <Sun strokeWidth={1.5} size={18} /> : <Moon strokeWidth={1.5} size={18} />}
                </button>
              </div>

              <div className="mt-2">
                <Button variant="outline" className="!rounded-full !px-10 !py-3 font-poppins tracking-widest text-xs uppercase border-text text-text dark:border-white dark:text-white">
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
