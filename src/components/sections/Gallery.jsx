import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
    hidden: { opacity: 0, y: 80 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.0, ease: [0.215, 0.61, 0.355, 1] } // Power3.out
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto px-6"
      >
        <motion.div variants={itemVariants}>
          <SectionHeading 
            title="Our Masterpieces" 
            subtitle="Take a look at some of our beautifully crafted cakes."
          />
        </motion.div>
        
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.04,
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.12)"
              }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => setSelectedImg(src)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl break-inside-avoid bg-gray-50 dark:bg-gray-950"
            >
              <img 
                src={src} 
                alt={`Cake Gallery ${index + 1}`} 
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-1000 ease-in-out opacity-95 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white font-playfair text-lg tracking-wider pointer-events-none opacity-0">View Full</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button 
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors cursor-pointer"
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImg} 
              alt="Selected Cake" 
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
