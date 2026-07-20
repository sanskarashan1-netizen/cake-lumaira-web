import { motion } from 'framer-motion';
import Button from '../common/Button';

export default function SpecialOffer() {
  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-pink-500" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_10%,_transparent_10.5%)] bg-[length:20px_20px]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-white"
        >
          <span className="inline-block bg-white/20 px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm tracking-wide">
            Limited Time Offer
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold tracking-wide mb-6 sm:mb-8 leading-tight">
            🎉 Flat 15% OFF <br className="hidden sm:block" /> on Birthday Cakes
          </h2>
          <Button variant="secondary" className="mx-auto !px-6 !py-3 sm:!px-8 sm:!py-4 text-sm sm:text-lg tracking-wider" onClick={() => document.getElementById('cakes').scrollIntoView({ behavior: 'smooth' })}>
            Order Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
