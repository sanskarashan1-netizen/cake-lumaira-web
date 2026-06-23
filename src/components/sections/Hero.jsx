import { motion } from 'framer-motion';
import Button from '../common/Button';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary dark:bg-gray-950 transition-colors duration-300">
      
      {/* Editorial Background Image - Clean & Premium */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=1600&q=80" 
          alt="Premium Patisserie Cake" 
          className="w-full h-full object-cover opacity-90 dark:opacity-40"
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent dark:from-gray-950 dark:via-gray-950/80"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="text-sm md:text-base tracking-[0.3em] uppercase text-primary font-poppins font-medium mb-6">
              Maison de Pâtisserie
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-light text-text dark:text-white leading-tight mb-8">
              Artisan Cakes <br />
              <span className="italic font-playfair text-primary">Reimagined.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-poppins font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Experience the pinnacle of French pastry craftsmanship. Minimalist designs, extraordinary flavors, curated for your most elegant moments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                variant="primary" 
                className="!rounded-full !px-10 !py-4 text-sm tracking-widest uppercase shadow-xl hover:shadow-primary/30"
                onClick={() => document.getElementById('cakes').scrollIntoView({ behavior: 'smooth' })}
              >
                View Collection
              </Button>
              <Button 
                variant="outline" 
                className="!rounded-full !px-10 !py-4 text-sm tracking-widest uppercase border-gray-300 text-text hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900"
                onClick={() => document.getElementById('flavours').scrollIntoView({ behavior: 'smooth' })}
              >
                Our Flavours
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
