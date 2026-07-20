import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from './Button';

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://cake-lumaira-backend.onrender.com' 
  : 'http://localhost:5000';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, cartTotal, clearCart, setIsCartOpen } = useCart();
  const [step, setStep] = useState(1); // 1 = Form, 2 = Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);

    const orderData = {
      customer: {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address')
      },
      paymentMethod: formData.get('payment'),
      items: cartItems,
      total: cartTotal
    };

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const savedOrder = await response.json();
      setOrderId(savedOrder.orderId);
      
      setStep(2);
      clearCart();
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Something went wrong! Is the local database running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    onClose();
    if (step === 2) {
      setIsCartOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-md"
          />
          
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-playfair font-bold text-text dark:text-white">
                  {step === 1 ? 'Secure Checkout' : 'Order Confirmed! 🎉'}
                </h2>
                {step === 1 && (
                  <button onClick={handleClose} className="text-gray-500 hover:text-primary transition-colors">
                    <X size={24} />
                  </button>
                )}
              </div>

              <div className="overflow-y-auto p-6">
                {step === 1 ? (
                  <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-text dark:text-white mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="name" type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                        <input required name="phone" type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                        <input required name="email" type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all md:col-span-2" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-text dark:text-white mb-4">Delivery Address</h3>
                      <textarea required name="address" rows="3" placeholder="Full Address with Landmark" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"></textarea>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-text dark:text-white mb-4">Payment Method</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 border border-primary bg-primary/5 rounded-xl cursor-pointer">
                          <input type="radio" name="payment" value="Cash on Delivery" defaultChecked className="text-primary focus:ring-primary accent-primary w-5 h-5" />
                          <span className="font-medium text-text dark:text-white">Cash on Delivery (COD)</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer opacity-60">
                          <input type="radio" disabled className="text-primary focus:ring-primary accent-primary w-5 h-5" />
                          <span className="font-medium text-text dark:text-white">Online Payment (Coming Soon)</span>
                        </label>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={48} />
                    </motion.div>
                    <h3 className="text-3xl font-playfair font-bold text-text dark:text-white mb-4">Thank You!</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-2">
                      Your order has been placed successfully. Your freshly baked cakes will be on their way soon!
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-8 font-medium">Order ID: #{orderId}</p>
                    <Button variant="primary" onClick={handleClose}>Continue Shopping</Button>
                  </div>
                )}
              </div>

              {step === 1 && (
                <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">₹{cartTotal}</p>
                  </div>
                  <Button variant="primary" type="submit" form="checkout-form" disabled={isSubmitting} className="min-w-[150px]">
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
