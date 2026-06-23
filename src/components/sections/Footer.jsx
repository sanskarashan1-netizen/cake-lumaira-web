import { MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 pt-20 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 text-3xl font-playfair font-bold text-primary mb-6">
              <span className="text-4xl">🍰</span> Lumaira
            </a>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
              Every Slice Tells a Sweet Story. We craft premium, handcrafted cakes for all your special moments.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:shadow-md transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:shadow-md transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-500 hover:shadow-md transition-all">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold font-playfair text-xl text-text dark:text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Cakes', 'Flavours', 'Gallery'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold font-playfair text-xl text-text dark:text-white mb-6">Support</h4>
            <ul className="space-y-4">
              {['FAQ', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-500 dark:text-gray-500 text-sm">
          <p>&copy; 2026 Lumaira Cakes. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
