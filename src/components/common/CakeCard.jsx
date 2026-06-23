import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';

export default function CakeCard({ id, image, name, description, price }) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group flex flex-col h-full bg-transparent transition-all duration-500"
    >
      <div className="relative h-[400px] overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-sm shrink-0 mb-6">
        <img 
          src={image} 
          alt={name} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out opacity-95 group-hover:opacity-100"
        />
        {/* Minimalist Price Tag */}
        <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2 font-poppins text-sm tracking-wide text-text dark:text-white shadow-sm border border-gray-100 dark:border-gray-800">
          {price}
        </div>
        
        {/* Overlay Add to Cart Button */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
          <Button 
            className="!rounded-full !px-8 !py-3 text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl flex items-center gap-2" 
            variant="primary"
            onClick={() => addToCart({ id, name, price, image })}
          >
            <ShoppingBag size={16} /> Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow text-center px-4">
        <h3 className="text-2xl font-playfair font-normal mb-3 text-text dark:text-white group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400 font-poppins font-light text-sm line-clamp-2 leading-relaxed max-w-sm mx-auto">{description}</p>
      </div>
    </motion.div>
  );
}
