import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from './Button';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-white dark:bg-gray-900 shadow-2xl z-[101] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-primary" />
                  <h2 className="text-2xl font-playfair font-bold text-text dark:text-white">Your Cart</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-text dark:text-white font-playfair line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-2 shrink-0"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="font-bold text-primary whitespace-nowrap">{item.price}</div>
                          <div className="flex items-center gap-3 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm ml-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-primary"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-4 text-center font-medium dark:text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-primary"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Subtotal</span>
                    <span className="text-2xl font-bold text-text dark:text-white">₹{cartTotal}</span>
                  </div>
                  <Button variant="primary" className="w-full !py-4 text-lg" onClick={() => setIsCheckoutOpen(true)}>
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}
