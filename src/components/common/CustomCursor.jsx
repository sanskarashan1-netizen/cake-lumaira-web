import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Stiff spring for instantaneous tracking with a subtle high-end cushion
  const springConfig = { damping: 40, stiffness: 600, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'view'
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, select, textarea');
      const isGalleryCard = e.target.closest('#gallery .group');
      
      if (isGalleryCard) {
        setCursorType('view');
      } else if (target) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] flex items-center justify-center text-[10px] tracking-widest text-primary font-poppins font-medium uppercase"
      animate={{
        scale: isClicked 
          ? 0.75 // Click compression animation
          : cursorType === 'hover' 
            ? 1.8 
            : cursorType === 'view' 
              ? 2.5 
              : 1,
        backgroundColor: cursorType === 'view' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0)',
        borderColor: cursorType === 'view' ? '#D4AF37' : '#D4AF37',
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {cursorType === 'view' && (
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-primary font-semibold text-[8px]"
        >
          View
        </motion.span>
      )}
    </motion.div>
  );
}
