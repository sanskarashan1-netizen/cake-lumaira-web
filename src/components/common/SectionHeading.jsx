import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, className = '' }) {
  return (
    <div className={`text-center mb-16 md:mb-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-400 font-poppins font-medium mb-4">
          {subtitle && subtitle.split(' ')[0]} {/* Grab first word as overline */}
        </h2>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-normal text-text dark:text-white leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-6 text-gray-500 dark:text-gray-400 font-poppins font-light text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
