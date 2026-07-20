import { motion } from 'framer-motion';
import { Leaf, Truck, CheckCircle2, Gift } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const features = [
  { icon: Leaf, title: "Fresh Ingredients", description: "We use only the finest, freshest ingredients to bake our cakes daily." },
  { icon: Truck, title: "Same Day Delivery", description: "Get your fresh cake delivered to your doorstep the very same day." },
  { icon: CheckCircle2, title: "100% Eggless Available", description: "All our signature cakes are available in delicious eggless variants." },
  { icon: Gift, title: "Custom Birthday Cakes", description: "Make your day special with our beautifully crafted custom designs." }
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading 
          title="Why Choose Lumaira" 
          overline="Our Commitment"
          subtitle="We believe in baking not just cakes, but sweet memories for your special occasions."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-secondary/30 dark:bg-gray-800 p-6 sm:p-8 rounded-3xl text-center border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group flex flex-col items-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-sm mb-4 sm:mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-playfair tracking-wide mb-2 sm:mb-3 text-text dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-poppins font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
