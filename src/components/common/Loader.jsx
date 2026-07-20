import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 700);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 bg-black z-[99999] flex flex-col items-center justify-center select-none"
        >
          {/* Gold Logo */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="text-center"
          >
            <h1 className="font-playfair text-4xl sm:text-5xl font-light tracking-widest text-primary mb-2">LUMAIRA</h1>
            <p className="text-[10px] tracking-[0.4em] uppercase font-poppins text-gray-500">Pâtisserie</p>
          </motion.div>

          {/* Luxury loading line */}
          <div className="w-32 h-[1px] bg-gray-900 mt-8 overflow-hidden relative">
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/2 bg-primary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
