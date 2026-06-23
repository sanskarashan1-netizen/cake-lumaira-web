import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const faqs = [
  { question: "Do you provide same-day delivery?", answer: "Yes! We provide same-day delivery for our Classic and Premium cakes if ordered before 2 PM. Custom and Wedding cakes require advance notice." },
  { question: "Are eggless cakes available?", answer: "Absolutely. All our signature cakes can be made 100% eggless without compromising on taste or texture. Just select the eggless option while ordering." },
  { question: "Can I customize the cake?", answer: "Yes, we specialize in custom designer cakes. You can share your design ideas, theme, and color preferences with our team, and we'll bring your vision to life." },
  { question: "How do I place an order?", answer: "You can place an order directly through our website by adding items to your cart, or for custom cakes, you can contact us via phone or the contact form below." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-secondary/30 dark:bg-gray-800/30 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-3xl">
        <SectionHeading 
          title="Frequently Asked Questions" 
          subtitle="Got questions? We've got answers to help make your experience smooth."
        />
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-bold font-playfair text-lg text-text dark:text-white pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`text-primary shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={24} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-4 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
