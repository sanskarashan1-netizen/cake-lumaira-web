import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';

export default function CakeCard({ id, image, name, description, price, available = true }) {
  const { addToCart } = useCart();
  const isOutOfStock = available === false || available === "false" || available === 0;

  return (
    <motion.div 
      whileHover={{ y: isOutOfStock ? 0 : -5 }}
      className={`group flex flex-col h-full bg-transparent transition-all duration-500 ${isOutOfStock ? 'opacity-85' : ''}`}
    >
      <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl shrink-0 mb-4 sm:mb-6">
        <img 
          src={image} 
          alt={name} 
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${
            isOutOfStock ? 'grayscale-[40%] opacity-80' : 'group-hover:scale-105 opacity-95 group-hover:opacity-100'
          }`}
        />

        {/* Out of stock badge */}
        {isOutOfStock && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-red-600 text-white font-poppins text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md z-10">
            Out of Stock
          </div>
        )}

        {/* Minimalist Price Tag */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 font-poppins text-xs sm:text-sm font-semibold tracking-wide text-text dark:text-white shadow-sm border border-gray-100 dark:border-gray-800 rounded-xl">
          {price}
        </div>
        
        {/* Overlay Add to Cart Button */}
        <div className={`absolute inset-0 bg-black/30 md:bg-black/20 transition-opacity duration-300 flex items-end justify-center pb-4 sm:pb-8 ${
          isOutOfStock ? 'opacity-100' : 'opacity-100 md:opacity-0 group-hover:opacity-100'
        }`}>
          {isOutOfStock ? (
            <button 
              disabled
              className="bg-red-600 text-white font-semibold cursor-not-allowed rounded-full px-5 py-2 sm:px-8 sm:py-3 text-xs sm:text-sm font-poppins uppercase tracking-widest shadow-lg border border-red-500"
            >
              Out of Stock
            </button>
          ) : (
            <Button 
              className="!rounded-full !px-5 !py-2 sm:!px-8 sm:!py-3 text-xs sm:text-sm tracking-widest uppercase transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl flex items-center gap-2" 
              variant="primary"
              onClick={() => addToCart({ id, name, price, image })}
            >
              <ShoppingBag size={14} /> Add to Cart
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col flex-grow text-center px-2 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
          <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-text dark:text-white group-hover:text-primary transition-colors">{name}</h3>
          {isOutOfStock && (
            <span className="bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 text-[10px] font-bold font-poppins uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-red-200 dark:border-red-900">
              Out of Stock
            </span>
          )}
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-poppins font-light text-xs sm:text-sm line-clamp-2 leading-relaxed max-w-sm mx-auto">{description}</p>
      </div>
    </motion.div>
  );
}
