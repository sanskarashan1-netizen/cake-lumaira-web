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

  return (
    <section id="pricing" className="py-32 bg-secondary dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-400 font-poppins font-medium mb-4">Collections</h2>
          <h3 className="text-4xl md:text-5xl font-playfair font-normal text-text dark:text-white">Pricing Tiers</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className={`p-10 flex flex-col items-center text-center transition-all duration-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 ${
                plan.highlight ? 'py-16 shadow-2xl scale-105 z-10' : 'shadow-sm hover:shadow-lg'
              }`}
            >
              <h3 className="text-xl font-playfair font-normal tracking-wide text-text dark:text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-light font-poppins text-primary tracking-tight">{plan.price}</span>
                <span className="text-gray-400 text-sm ml-1">/ base</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-light font-poppins text-sm leading-relaxed mb-10 h-10">
                {plan.description}
              </p>
              
              <Button 
                variant={plan.highlight ? 'primary' : 'outline'} 
                className="w-full !rounded-full uppercase tracking-widest text-xs"
                onClick={() => handlePlanSelect(plan)}
              >
                Select Collection
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
