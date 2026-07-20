import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, overline, className = '' }) {
  return (
    <div className={`text-center mb-8 sm:mb-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {overline ? (
          <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-primary font-poppins font-semibold mb-2 sm:mb-3">
            {overline}
          </h2>
        ) : subtitle ? (
          <h2 className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary font-poppins font-semibold mb-2 sm:mb-3">
            {subtitle.split(' ')[0]}
          </h2>
        ) : null}
        
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-normal tracking-wide text-text dark:text-white leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-3 sm:mt-4 text-gray-500 dark:text-gray-400 font-poppins font-light text-xs sm:text-base max-w-2xl mx-auto leading-relaxed px-2">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
