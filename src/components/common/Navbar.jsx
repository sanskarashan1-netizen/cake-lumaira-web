import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, Moon, Sun, Sparkles } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  const links = [
    { name: 'Cakes', href: '#cakes' },
    { name: 'Design Cake', href: '#design' },
    { name: 'Flavours', href: '#flavours' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between px-5 lg:px-8 py-3 rounded-full transition-all duration-500 ${
            scrolled 
              ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800/80 shadow-lg shadow-black/5' 
              : 'bg-white/40 dark:bg-gray-950/40 backdrop-blur-md border border-white/20 dark:border-gray-800/30'
          }`}
        >
          {/* LEFT: UNIQUE LUMAIRA CAKES BRANDING LOGO */}
          <motion.a 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#" 
            className="flex items-center gap-3 group cursor-pointer select-none"
          >
            {/* 3D Golden Cake Icon Badge */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-secondary dark:bg-gray-950 rounded-full flex items-center justify-center">
                <span className="text-xl filter drop-shadow">🍰</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-playfair font-bold tracking-wider text-text dark:text-white group-hover:text-primary transition-colors">
                  LUMAIRA
                </span>
                <span className="text-xs font-poppins font-semibold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  CAKES
                </span>
              </div>
              <span className="text-[9px] tracking-[0.3em] uppercase font-poppins text-gray-400 dark:text-gray-400 -mt-0.5">
                Artisan Pâtisserie
              </span>
            </div>
          </motion.a>

          {/* CENTER: UNIFIED NAVIGATION LINKS */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {links.map((link, idx) => (
              <motion.a 
                key={link.name} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.06 }}
                href={link.href}
                className="font-poppins font-medium tracking-wider text-xs uppercase px-4 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 relative group"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* RIGHT: ACTION HUB & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {darkMode ? <Sun strokeWidth={1.8} size={18} /> : <Moon strokeWidth={1.8} size={18} />}
            </button>

            {/* Shopping Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative cursor-pointer"
              title="Open Shopping Cart"
            >
              <ShoppingBag strokeWidth={1.8} size={18} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-poppins font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Custom Cake Builder CTA Button */}
            <a href="#design">
              <Button 
                variant="primary" 
                className="!rounded-full !px-5 !py-2.5 text-xs font-poppins tracking-wider uppercase shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={14} /> Custom Cake
              </Button>
            </a>
          </div>

          {/* MOBILE TOGGLE & CART */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative p-2 text-text dark:text-gray-300 cursor-pointer"
            >
              <ShoppingBag strokeWidth={1.8} size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] font-poppins font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text dark:text-white cursor-pointer"
            >
              {isOpen ? <X strokeWidth={1.8} size={24} /> : <Menu strokeWidth={1.8} size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-4 mt-2 p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-playfair font-semibold text-text dark:text-gray-200 hover:text-primary transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">
                <span className="font-poppins text-xs tracking-widest uppercase text-gray-400">Theme</span>
                <button 
                  onClick={() => setDarkMode(!darkMode)} 
                  className="text-text dark:text-gray-300 p-2 rounded-full border border-gray-200 dark:border-gray-800 hover:text-primary cursor-pointer"
                >
                  {darkMode ? <Sun strokeWidth={1.8} size={18} /> : <Moon strokeWidth={1.8} size={18} />}
                </button>
              </div>

              <a href="#design" onClick={() => setIsOpen(false)} className="mt-2 w-full">
                <Button variant="primary" className="w-full !rounded-full !py-3 text-xs tracking-widest uppercase flex items-center justify-center gap-2">
                  <Sparkles size={14} /> Design Custom Cake
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
