import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const flavours = [
  { name: 'Chocolate', icon: '🍫', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },
  { name: 'Strawberry', icon: '🍓', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80' },
  { name: 'Vanilla', icon: '🍦', image: 'https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=400&q=80' },
  { name: 'Blueberry', icon: '🫐', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80' },
  { name: 'Cherry', icon: '🍒', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80' },
  { name: 'Pineapple', icon: '🍍', image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&q=80' },
];

export default function Flavours() {
  const { addToCart } = useCart();

  const handleFlavourClick = (flavour) => {
    addToCart({
      id: `flavour-${flavour.name.toLowerCase()}`,
      name: `${flavour.name} Signature`,
      price: '₹350',
      image: flavour.image
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.0, ease: [0.215, 0.61, 0.355, 1] } // Power3.out
    }
  };

  return (
    <section id="flavours" className="py-32 bg-white dark:bg-gray-950 transition-colors duration-300">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto px-6 max-w-6xl"
      >
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-400 font-poppins font-medium mb-4">Taste Profile</h2>
          <h3 className="text-4xl md:text-5xl font-playfair font-normal text-text dark:text-white">Curated Ingredients</h3>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {flavours.map((flavour, index) => (
            <motion.div
              key={flavour.name}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group cursor-pointer text-center"
              onClick={() => handleFlavourClick(flavour)}
            >
              <div className="relative w-full aspect-square mb-6 overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-sm">
                <img 
                  src={flavour.image} 
                  alt={flavour.name} 
                  className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
                  <span className="text-3xl filter drop-shadow-md">{flavour.icon}</span>
                </div>
              </div>
              <h4 className="font-poppins font-light tracking-widest text-sm uppercase text-gray-500 group-hover:text-primary transition-colors">{flavour.name}</h4>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
