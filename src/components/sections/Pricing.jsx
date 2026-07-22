import { motion } from 'framer-motion';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

const plans = [
  {
    name: "Classic",
    price: "₹350",
    description: "Elegant, minimalist designs for intimate gatherings.",
    highlight: false,
    image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=600&q=80"
  },
  {
    name: "Signature",
    price: "₹550",
    description: "Our renowned combinations with premium ingredients.",
    highlight: true,
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&q=80"
  },
  {
    name: "Bespoke",
    price: "₹999",
    description: "Custom artisan creations tailored exclusively for you.",
    highlight: false,
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&q=80"
  }
];

export default function Pricing() {
  const { addToCart } = useCart();

  const handlePlanSelect = (plan) => {
    addToCart({
      id: `plan-${plan.name.toLowerCase()}`,
      name: `${plan.name} Collection`,
      price: plan.price,
      image: plan.image
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
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
    <section id="pricing" className="py-16 sm:py-20 bg-secondary dark:bg-gray-950 transition-colors duration-300">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6 max-w-6xl"
      >
        <motion.div variants={itemVariants} className="text-center mb-6 sm:mb-10">
          <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-primary font-poppins font-semibold mb-2 sm:mb-3">Collections</h2>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-normal tracking-wide text-text dark:text-white">Pricing Tiers</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ 
                y: -6, 
                borderColor: "#D4AF37", 
                boxShadow: plan.highlight 
                  ? "0 30px 60px -15px rgba(212, 175, 55, 0.22)" 
                  : "0 25px 50px -12px rgba(212, 175, 55, 0.15)"
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className={`p-6 sm:p-10 flex flex-col items-center justify-between text-center transition-all duration-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-3xl ${
                plan.highlight ? 'py-8 sm:py-14 shadow-2xl scale-100 md:scale-105 z-10 border-primary/40' : 'shadow-sm'
              }`}
            >
              <div className="w-full flex flex-col items-center">
                <h3 className="text-xl font-playfair font-normal tracking-wide text-text dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-light font-poppins text-primary tracking-tight">{plan.price}</span>
                  <span className="text-gray-400 text-sm ml-1">/ base</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-light font-poppins text-sm leading-relaxed mb-10 h-10">
                  {plan.description}
                </p>
              </div>
              
              <Button 
                variant={plan.highlight ? 'primary' : 'outline'} 
                className="w-full !rounded-full uppercase tracking-widest text-xs cursor-pointer"
                onClick={() => handlePlanSelect(plan)}
              >
                Select Collection
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
