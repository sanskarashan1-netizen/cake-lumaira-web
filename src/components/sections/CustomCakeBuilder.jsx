import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

const FLAVORS = [
  { name: 'Chocolate', baseColor: '#361D07', topColor: '#4A2C11', price: 100, desc: 'Rich Cocoa Sponge' },
  { name: 'Red Velvet', baseColor: '#600000', topColor: '#800000', price: 150, desc: 'Crimson Velvet Sponge' },
  { name: 'Vanilla Bean', baseColor: '#E6C15C', topColor: '#FFF2CC', price: 50, desc: 'Classic Madagascan Vanilla' },
  { name: 'Strawberry', baseColor: '#D67D9F', topColor: '#F3A6C8', price: 120, desc: 'Sweet Berry Infused Sponge' }
];

const FROSTINGS = [
  { name: 'Buttercream', color: '#FFFDF5', price: 50 },
  { name: 'Fondant Coating', color: '#FFEAA7', price: 100 },
  { name: 'Chocolate Ganache', color: '#3E2723', price: 120 }
];

const TOPPINGS = [
  { name: 'Fresh Berries', icon: '🍓', price: 80 },
  { name: '24k Gold Flakes', icon: '✨', price: 200 },
  { name: 'Rainbow Sprinkles', icon: '🌈', price: 40 },
  { name: 'Chocolate Curls', icon: '🍫', price: 70 }
];

export default function CustomCakeBuilder() {
  const { addToCart } = useCart();
  const [tiers, setTiers] = useState(2); // 1, 2, or 3
  const [flavor, setFlavor] = useState(FLAVORS[1]); // Red Velvet
  const [frosting, setFrosting] = useState(FROSTINGS[0]); // Buttercream
  const [topping, setTopping] = useState(null); // Start with no toppings selected
  const [message, setMessage] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Price calculation
  const basePrice = 400; // starting price
  const tierPrice = (tiers - 1) * 200;
  const toppingPrice = topping ? topping.price : 0;
  const totalPrice = basePrice + tierPrice + flavor.price + frosting.price + toppingPrice;

  const handleAddToCart = () => {
    const customCakeId = `custom-${Date.now()}`;
    const customProduct = {
      id: customCakeId,
      name: `Custom ${tiers}-Tier Cake`,
      price: `₹${totalPrice}`,
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&q=80",
      description: `Tiers: ${tiers} | Flavor: ${flavor.name} | Frosting: ${frosting.name} | Toppings: ${topping ? topping.name : 'None'}${message ? ` | Message: "${message}"` : ''}`,
      isCustom: true
    };
    
    addToCart(customProduct);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Determine top coordinates for berries, flame, etc. based on active tier count
  const topY = tiers === 1 ? 215 : tiers === 2 ? 165 : 120;
  const topRx = tiers === 1 ? 75 : tiers === 2 ? 63 : 50;

  return (
    <section id="design" className="py-24 bg-secondary dark:bg-gray-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background elegant decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary font-poppins font-semibold">
            Bake Your Dreams
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-light text-text dark:text-white mt-3">
            Design Your Own Cake
          </h2>
          <div className="h-[1px] w-20 bg-primary/45 mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 font-poppins font-light leading-relaxed">
            Customize every layer to your personal taste. Watch your masterpiece come to life in real-time as you select your options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: LIVE DYNAMIC PREVIEW */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-xl min-h-[480px]">
            <span className="text-xs font-semibold tracking-widest text-primary mb-6 uppercase">Live Preview</span>
            
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              <svg viewBox="0 0 350 400" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.1)]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Stand Gradient */}
                  <linearGradient id="goldStand" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E2C76A" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B08D2A" />
                  </linearGradient>

                  {/* Dynamic Flavor Gradient */}
                  <linearGradient id="flavorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={flavor.topColor} />
                    <stop offset="100%" stopColor={flavor.baseColor} />
                  </linearGradient>

                  {/* Frosting / Drip Gradient */}
                  <linearGradient id="frostGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={frosting.color} />
                    <stop offset="100%" stopColor={frosting.color} stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Base Plate Shadow */}
                <ellipse cx="175" cy="340" rx="90" ry="12" fill="#000" opacity="0.1" />

                {/* Pedestal Stand */}
                <g>
                  <path d="M 125,325 C 125,325 125,340 175,340 C 225,340 225,325 225,325 L 210,305 C 210,305 195,310 175,310 C 155,310 140,305 140,305 Z" fill="url(#goldStand)" />
                  <path d="M 165,275 L 185,275 L 190,305 L 160,305 Z" fill="url(#goldStand)" opacity="0.9" />
                  <ellipse cx="175" cy="275" rx="90" ry="12" fill="url(#goldStand)" />
                </g>

                {/* --- CAKE LAYERS --- */}
                
                {/* BOTTOM LAYER (Tier 1) - Always Visible */}
                <g>
                  {/* Cylinder */}
                  <path d="M 100,215 L 100,260 C 100,270 133,278 175,278 C 217,278 250,270 250,260 L 250,215 Z" fill="url(#flavorGrad)" />
                  <ellipse cx="175" cy="215" rx="75" ry="15" fill={flavor.topColor} />
                  
                  {/* Frosting Drips */}
                  <path 
                    d="M 100,215 C 105,225 110,227 115,220 C 120,212 125,228 135,224 C 145,220 150,230 160,225 C 170,220 175,228 185,225 C 195,222 200,232 210,226 C 220,220 225,229 235,222 C 245,215 248,223 250,215" 
                    fill="none" 
                    stroke="url(#frostGrad)" 
                    strokeWidth="4.5" 
                    strokeLinecap="round" 
                  />

                  {/* Message Banner on Bottom Tier */}
                  {message && (
                    <g>
                      <path d="M 115,245 Q 175,255 235,245" fill="none" stroke="#FFF" strokeWidth="18" strokeLinecap="round" opacity="0.85" />
                      <text x="175" y="249" textAnchor="middle" fill="#1A1A1A" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="bold" letterSpacing="1">
                        {message.slice(0, 18).toUpperCase()}
                      </text>
                    </g>
                  )}
                </g>

                {/* MIDDLE LAYER (Tier 2) - Visible if tiers >= 2 */}
                <AnimatePresence>
                  {tiers >= 2 && (
                    <motion.g
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ type: "spring", stiffness: 180, damping: 15 }}
                    >
                      {/* Cylinder */}
                      <path d="M 112,165 L 112,205 C 112,213 140,220 175,220 C 210,220 238,213 238,205 L 238,165 Z" fill="url(#flavorGrad)" />
                      <ellipse cx="175" cy="165" rx="63" ry="12" fill={flavor.topColor} />
                      
                      {/* Frosting Drips */}
                      <path 
                        d="M 112,165 C 117,173 122,175 127,170 C 132,164 136,176 144,173 C 152,170 156,178 164,174 C 172,170 176,176 184,174 C 192,171 196,179 204,174 C 212,170 216,177 224,172 C 232,167 235,173 238,165" 
                        fill="none" 
                        stroke="url(#frostGrad)" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                      />
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* TOP LAYER (Tier 3) - Visible if tiers === 3 */}
                <AnimatePresence>
                  {tiers === 3 && (
                    <motion.g
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ type: "spring", stiffness: 180, damping: 15 }}
                    >
                      {/* Cylinder */}
                      <path d="M 125,120 L 125,153 C 125,160 147,165 175,165 C 203,165 225,160 225,153 L 225,120 Z" fill="url(#flavorGrad)" />
                      <ellipse cx="175" cy="120" rx="50" ry="10" fill={flavor.topColor} />
                      
                      {/* Frosting Drips */}
                      <path 
                        d="M 125,120 C 129,127 133,129 137,125 C 141,120 145,130 152,127 C 159,124 162,131 169,128 C 176,125 180,130 186,128 C 192,126 195,132 201,128 C 207,125 210,131 216,127 C 222,123 224,127 225,120" 
                        fill="none" 
                        stroke="url(#frostGrad)" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                      />
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* --- DYNAMIC TOPPINGS (Rendered on top-most active tier) --- */}
                <g>
                  {/* Fresh Berries Topping */}
                  {topping && topping.name === 'Fresh Berries' && (
                    <g>
                      <circle cx="175" cy={topY - 3} r="7" fill="#C0392B" />
                      <circle cx="165" cy={topY - 1} r="6" fill="#962D22" />
                      <circle cx="185" cy={topY - 1} r="6" fill="#D98880" />
                      <circle cx="170" cy={topY + 3} r="5" fill="#E67E22" />
                      <circle cx="180" cy={topY + 3} r="5.5" fill="#C0392B" />
                    </g>
                  )}

                  {/* Gold Flakes Topping */}
                  {topping && topping.name === '24k Gold Flakes' && (
                    <g fill="#D4AF37">
                      <path d={`M 175,${topY - 12} L 177,${topY - 8} L 181,${topY - 8} L 178,${topY - 5} L 179,${topY - 1} L 175,${topY - 3} L 171,${topY - 1} L 172,${topY - 5} L 169,${topY - 8} L 173,${topY - 8} Z`} />
                      <path d={`M 155,${topY - 4} L 156,${topY - 1} L 159,${topY - 1} L 157,${topY + 1} L 158,${topY + 4} L 155,${topY + 2} L 152,${topY + 4} L 153,${topY + 1} L 151,${topY - 1} L 154,${topY - 1} Z`} transform="scale(0.8)" style={{ originX: '155px', originY: `${topY - 4}px` }} />
                      <path d={`M 195,${topY - 4} L 196,${topY - 1} L 199,${topY - 1} L 197,${topY + 1} L 198,${topY + 4} L 195,${topY + 2} L 192,${topY + 4} L 193,${topY + 1} L 191,${topY - 1} L 194,${topY - 1} Z`} transform="scale(0.8)" style={{ originX: '195px', originY: `${topY - 4}px` }} />
                    </g>
                  )}

                  {/* Sprinkles Topping */}
                  {topping && topping.name === 'Rainbow Sprinkles' && (
                    <g>
                      <rect x="170" y={topY - 3} width="4" height="1.5" fill="#E74C3C" transform="rotate(15 170 215)" />
                      <rect x="160" y={topY + 1} width="4" height="1.5" fill="#3498DB" transform="rotate(-30 160 215)" />
                      <rect x="180" y={topY + 2} width="4" height="1.5" fill="#2ECC71" transform="rotate(45 180 215)" />
                      <rect x="175" y={topY + 4} width="4" height="1.5" fill="#F1C40F" transform="rotate(-15 175 215)" />
                      <rect x="165" y={topY - 2} width="4" height="1.5" fill="#9B59B6" transform="rotate(60 165 215)" />
                      <rect x="185" y={topY - 2} width="4" height="1.5" fill="#E67E22" transform="rotate(-45 185 215)" />
                    </g>
                  )}

                  {/* Chocolate Curls Topping */}
                  {topping && topping.name === 'Chocolate Curls' && (
                    <g fill="none" stroke="#2D1A0C" strokeWidth="2" strokeLinecap="round">
                      <path d={`M 172,${topY - 3} Q 175,${topY - 6} 178,${topY - 3} T 184,${topY - 3}`} />
                      <path d={`M 160,${topY - 1} Q 163,${topY - 4} 166,${topY - 1} T 172,${topY - 1}`} />
                      <path d={`M 180,${topY + 1} Q 183,${topY - 2} 186,${topY + 1} T 192,${topY + 1}`} />
                    </g>
                  )}
                </g>

                {/* Decorative Simple Candle */}
                <g>
                  <rect x="173" y={topY - 32} width="4" height="24" fill="url(#goldStand)" rx="1" />
                  <circle cx="175" cy={topY - 38} r="4" fill="#E2C76A" opacity="0.4" />
                  <path d={`M 175,${topY - 32} C 173,${topY - 35} 173,${topY - 38} 175,${topY - 42} C 177,${topY - 38} 177,${topY - 35} 175,${topY - 32} Z`} fill="#FF8C00" />
                </g>
              </svg>
            </div>

            {/* Price Indicator */}
            <div className="mt-8 text-center">
              <span className="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-poppins">Estimated Price</span>
              <div className="text-3xl font-playfair font-semibold text-primary mt-1">₹{totalPrice}</div>
            </div>
          </div>

          {/* RIGHT COLUMN: BUILDER CONTROLS */}
          <div className="lg:col-span-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 lg:p-10 shadow-xl">
            
            {/* Tiers Option */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold tracking-widest text-text dark:text-gray-200 uppercase mb-4 font-poppins">1. Select Tiers</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTiers(t)}
                    className={`py-3.5 px-4 rounded-xl border text-center transition-all ${
                      tiers === t 
                        ? 'border-primary bg-primary/5 text-primary font-semibold' 
                        : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50'
                    }`}
                  >
                    <span className="block text-lg font-playfair font-semibold">{t}</span>
                    <span className="text-[10px] tracking-wider uppercase block font-poppins mt-0.5">{t === 1 ? 'Single' : t === 2 ? 'Double' : 'Triple'} Tier</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Option */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold tracking-widest text-text dark:text-gray-200 uppercase mb-4 font-poppins">2. Choose Sponge Flavor</h3>
              <div className="grid grid-cols-2 gap-4">
                {FLAVORS.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => setFlavor(f)}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3.5 transition-all ${
                      flavor.name === f.name 
                        ? 'border-primary bg-primary/5 text-primary font-semibold' 
                        : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full border border-black/10 flex-shrink-0" style={{ backgroundColor: f.topColor }} />
                    <div>
                      <span className="block text-sm font-medium font-poppins leading-none">{f.name}</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5 leading-none">+₹{f.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Frosting Option */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold tracking-widest text-text dark:text-gray-200 uppercase mb-4 font-poppins">3. Frosting style</h3>
              <div className="grid grid-cols-3 gap-3">
                {FROSTINGS.map((fr) => (
                  <button
                    key={fr.name}
                    onClick={() => setFrosting(fr)}
                    className={`py-3 px-2.5 rounded-xl border text-center transition-all ${
                      frosting.name === fr.name 
                        ? 'border-primary bg-primary/5 text-primary font-semibold' 
                        : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50'
                    }`}
                  >
                    <span className="block text-[11px] font-medium font-poppins truncate">{fr.name}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5 leading-none">+₹{fr.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings Option */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold tracking-widest text-text dark:text-gray-200 uppercase mb-4 font-poppins">4. Toppings</h3>
              <div className="grid grid-cols-2 gap-4">
                {TOPPINGS.map((top) => (
                  <button
                    key={top.name}
                    onClick={() => setTopping(topping && topping.name === top.name ? null : top)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      topping && topping.name === top.name 
                        ? 'border-primary bg-primary/5 text-primary font-semibold' 
                        : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium font-poppins">
                      <span className="text-lg">{top.icon}</span>
                      {top.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">+₹{top.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message */}
            <div className="mb-10">
              <h3 className="text-xs font-semibold tracking-widest text-text dark:text-gray-200 uppercase mb-4 font-poppins">5. Message on Cake (Optional)</h3>
              <input
                type="text"
                placeholder="E.g. Happy Birthday!"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 18))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:border-primary transition-all text-text dark:text-white"
              />
              <span className="text-[10px] text-gray-400 mt-1.5 block text-right font-poppins font-light">Max 18 characters</span>
            </div>

            {/* Add to Cart button */}
            <Button
              variant="primary"
              onClick={handleAddToCart}
              className={`w-full py-4 text-xs tracking-widest uppercase font-semibold !rounded-full shadow-lg transition-all ${
                isAdded ? '!bg-green-600 hover:!bg-green-600' : ''
              }`}
            >
              {isAdded ? '✓ Cake Added to Cart!' : 'Add Custom Cake to Cart'}
            </Button>

          </div>

        </div>
      </div>
    </section>
  );
}
