import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Have a special request or want to place a custom order? We'd love to hear from you."
        />
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto mt-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-secondary/30 dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 h-full flex flex-col justify-center gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full text-primary shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold font-playfair text-xl text-text dark:text-white mb-1">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full text-primary shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold font-playfair text-xl text-text dark:text-white mb-1">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">hello@lumaira.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full text-primary shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold font-playfair text-xl text-text dark:text-white mb-1">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">Mumbai, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Your Phone"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <Button variant="primary" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
