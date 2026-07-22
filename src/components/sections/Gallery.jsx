import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const galleryImages = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
  "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&q=80",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80",
  "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80",
  "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80",
  "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80",
  "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=600&q=80",
  "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&q=80",
  "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&q=80",
  "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=600&q=80"
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6"
      >
        <motion.div variants={itemVariants}>
          <SectionHeading 
            title="Our Masterpieces" 
            overline="Visual Feast"
            subtitle="Explore our handcrafted gallery with uniform, high-resolution artisanal creations."
          />
        </motion.div>
        
        {/* Uniform Grid with Identical 4:3 Aspect Ratios */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -4,
                boxShadow: "0 20px 30px -10px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => setSelectedImg(src)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 dark:bg-gray-800/80 shadow-md border border-gray-100 dark:border-gray-800"
            >
              <img 
                src={src} 
                alt={`Cake Gallery ${index + 1}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              
              {/* Dark Hover Mask with Zoom Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                <ZoomIn size={22} className="transform scale-95 group-hover:scale-105 transition-transform" />
                <span className="font-playfair text-sm tracking-wider font-medium">View Full</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button 
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors cursor-pointer p-2 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              <X size={28} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImg} 
              alt="Selected Cake" 
              className="max-w-full max-h-[88vh] rounded-2xl shadow-2xl object-contain border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
