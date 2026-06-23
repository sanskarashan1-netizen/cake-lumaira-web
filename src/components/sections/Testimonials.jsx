import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const testimonials = [
  {
    name: "Priya Sharma",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    review: "The custom birthday cake for my daughter was absolutely stunning. Not only did it look beautiful, but the taste was out of this world. Highly recommended!"
  },
  {
    name: "Rahul Verma",
    photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80",
    review: "Ordered the Red Velvet for our anniversary. The delivery was right on time and the cake was so moist and rich. Lumaira is now our go-to bakery."
  },
  {
    name: "Anjali Desai",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    review: "Their 100% eggless cakes are the best I've ever had. You can't even tell the difference. The Blueberry Cheesecake is a must-try!"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-secondary/30 dark:bg-gray-800/30 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Sweet Words" 
          subtitle="Don't just take our word for it. Here's what our lovely customers have to say."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <div className="flex text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 italic line-clamp-4">
                "{testimonial.review}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.photo} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h4 className="font-bold font-playfair text-text dark:text-white text-lg">{testimonial.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
