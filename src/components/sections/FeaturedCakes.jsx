import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import LuxuryCakeCard from '../product/LuxuryCakeCard';

const defaultCakes = [
  { id: 1, name: "Chocolate Truffle", price: "₹350", description: "Rich and dense chocolate cake with smooth truffle ganache.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", available: true },
  { id: 2, name: "Black Forest", price: "₹400", description: "Classic German chocolate sponge with fresh cherry filling.", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80", available: true },
  { id: 3, name: "Red Velvet", price: "₹550", description: "Luxurious red sponge with signature cream cheese frosting.", image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&q=80", available: true },
  { id: 4, name: "Vanilla Delight", price: "₹350", description: "Light and fluffy vanilla sponge with delicate buttercream.", image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=600&q=80", available: true },
  { id: 5, name: "Butterscotch", price: "₹450", description: "Sweet caramel flavored cake with crunchy praline bits.", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80", available: true },
  { id: 6, name: "Strawberry Bliss", price: "₹500", description: "Fresh strawberry cake layered with luscious fruit cream.", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", available: false },
  { id: 7, name: "Blueberry Cheesecake", price: "₹650", description: "Creamy baked cheesecake topped with blueberry compote.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80", available: true },
  { id: 8, name: "Fruit Fantasy", price: "₹600", description: "Mixed fresh fruits layered in vanilla sponge and fresh cream.", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80", available: true }
];

export default function FeaturedCakes() {
  const [cakes, setCakes] = useState(defaultCakes);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const API_URL = import.meta.env.PROD
          ? 'https://cake-lumaira-backend.onrender.com/cakes'
          : 'http://localhost:5000/cakes';
        const res = await fetch(API_URL);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCakes(data);
          }
        }
      } catch (err) {
        console.log("Using default cakes fallback");
      }
    };
    fetchCakes();

    // Real-time automatic background sync every 2.5 seconds & on window focus
    const interval = setInterval(fetchCakes, 2500);
    window.addEventListener('focus', fetchCakes);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', fetchCakes);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section id="cakes" className="py-16 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6"
      >
        <motion.div variants={itemVariants}>
          <SectionHeading 
            title="Our Signature Cakes" 
            subtitle="Explore our most loved handcrafted cakes, made fresh daily with premium ingredients."
          />
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {cakes.map((cake) => (
            <motion.div key={cake.id || cake.name} variants={itemVariants}>
              <LuxuryCakeCard {...cake} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
