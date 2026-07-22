import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Moon, Sun, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

export default function LuxuryNavbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  const links = [
    { name: 'Cakes', href: '#cakes' },
    { name: 'Custom Builder', href: '#design' },
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

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    if (!href || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-2.5 sm:py-3' : 'py-4 sm:py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-500 ${
            scrolled 
              ? 'bg-white/85 dark:bg-gray-900/85 backdrop-blur-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-lg shadow-black/5' 
              : 'bg-white/50 dark:bg-gray-950/50 backdrop-blur-lg border border-white/20 dark:border-gray-800/30'
          }`}
        >
          {/* BRAND LOGO BADGE */}
          <motion.a 
            href="#" 
            onClick={(e) => handleScrollTo(e, '#')}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 group cursor-pointer select-none"
          >
            {/* Generated Luxury Gold Emblem Logo */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-400/40 shadow-md group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/lumaira-logo.png" 
                alt="Lumaira Cakes Logo" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-playfair font-semibold tracking-[0.12em] text-text dark:text-white group-hover:text-primary transition-colors">
                  LUMAIRA
                </span>
                <span className="text-[9px] font-poppins font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                  Cakes
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] tracking-[0.35em] uppercase font-poppins text-gray-400 dark:text-gray-400 font-light -mt-0.5">
                Artisan Pâtisserie
              </span>
            </div>
          </motion.a>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-gray-100/60 dark:bg-gray-800/40 p-1 rounded-full border border-gray-200/50 dark:border-gray-700/50">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="font-poppins font-medium tracking-wider text-[11px] uppercase px-4 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-gray-900 shadow-none hover:shadow-sm transition-all duration-300 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              title="Toggle Theme"
            >
              {darkMode ? <Sun strokeWidth={1.8} size={18} /> : <Moon strokeWidth={1.8} size={18} />}
            </button>

            {/* Shopping Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              title="Open Shopping Cart"
            >
              <ShoppingBag strokeWidth={1.8} size={18} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-poppins font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Custom Order CTA */}
            <a href="#design" onClick={(e) => handleScrollTo(e, '#design')}>
              <Button 
                variant="primary" 
                className="!rounded-full !px-5 !py-2.5 text-xs font-poppins tracking-wider uppercase shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={14} /> Custom Cake
              </Button>
            </a>
          </div>

          {/* MOBILE TOGGLE & CART */}
          <div className="lg:hidden flex items-center gap-1.5">
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
              {isOpen ? <X strokeWidth={1.8} size={22} /> : <Menu strokeWidth={1.8} size={22} />}
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
            className="lg:hidden mx-4 mt-2 p-5 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-playfair font-semibold text-text dark:text-gray-200 hover:text-primary transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 mt-1">
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
