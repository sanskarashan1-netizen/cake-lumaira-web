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
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-secondary/90 dark:bg-gray-950/90 backdrop-blur-xl border-gray-200 dark:border-gray-800 py-4 shadow-sm' : 'bg-transparent border-transparent py-8'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Left Links */}
        <div className="hidden lg:flex items-center gap-10 flex-1">
          {links.slice(0, 2).map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="font-poppins font-light tracking-widest text-xs uppercase text-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Center Logo */}
        <a href="#" className="flex-1 text-center text-3xl lg:text-4xl font-playfair font-normal tracking-wide text-text dark:text-white group">
          LUMAIRA
          <div className="text-[10px] tracking-[0.4em] uppercase font-poppins text-gray-400 dark:text-gray-500 mt-1 group-hover:text-primary transition-colors">
            Pâtisserie
          </div>
        </a>

        {/* Right Icons & Links */}
        <div className="hidden lg:flex items-center justify-end gap-10 flex-1">
          {links.slice(2).map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="font-poppins font-light tracking-widest text-xs uppercase text-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
          
          <div className="flex items-center gap-6 text-text dark:text-gray-300 border-l border-gray-300 dark:border-gray-700 pl-8">
            <button onClick={() => setDarkMode(!darkMode)} className="hover:text-primary transition-colors">
              {darkMode ? <Sun strokeWidth={1.5} size={20} /> : <Moon strokeWidth={1.5} size={20} />}
            </button>
            <button className="hover:text-primary transition-colors"><Search strokeWidth={1.5} size={20} /></button>
            <button onClick={() => setIsCartOpen(true)} className="hover:text-primary transition-colors relative">
              <ShoppingBag strokeWidth={1.5} size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-poppins font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex flex-1 justify-end items-center gap-5">
          <button onClick={() => setDarkMode(!darkMode)} className="text-text dark:text-gray-300">
            {darkMode ? <Sun strokeWidth={1.5} size={22} /> : <Moon strokeWidth={1.5} size={22} />}
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative text-text dark:text-gray-300">
            <ShoppingBag strokeWidth={1.5} size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-poppins font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-text dark:text-white ml-2"
          >
            {isOpen ? <X strokeWidth={1.5} size={26} /> : <Menu strokeWidth={1.5} size={26} />}
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
              <div className="mt-8">
                <Button variant="outline" className="!rounded-full !px-10 !py-3 font-poppins tracking-widest text-xs uppercase border-text text-text dark:border-white dark:text-white">
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
