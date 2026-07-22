import { Star, Quote, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    category: "Birthday Cake",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    date: "2 days ago",
    verified: true,
    review: "The custom birthday cake for my daughter was absolutely stunning! Not only did it look like a piece of art, but the Belgian chocolate layers were out of this world. Lumaira is our top choice for all celebrations!"
  },
  {
    id: 2,
    name: "Rahul Verma",
    category: "Anniversary Cake",
    photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80",
    rating: 5,
    date: "5 days ago",
    verified: true,
    review: "Ordered the Red Velvet for our 5th anniversary. Delivery arrived right on the dot, perfectly chilled, and the cream cheese frosting was exceptionally rich yet pleasantly light."
  },
  {
    id: 3,
    name: "Anjali Desai",
    category: "100% Eggless",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    date: "1 week ago",
    verified: true,
    review: "Their 100% eggless cakes are by far the best I've ever tasted. You can't even tell the difference! The Blueberry Cheesecake is an absolute must-try for everyone."
  },
  {
    id: 4,
    name: "Kabir Malhotra",
    category: "Wedding Cake",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    review: "Lumaira designed our 3-tier wedding cake and left all 250 guests completely in awe. The sugar flower work was handcrafted to perfection, and the passionfruit flavor was incredible!"
  },
  {
    id: 5,
    name: "Sneha Kapoor",
    category: "Cheesecake",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    review: "The Biscoff Lotus Cheesecake literally melts in your mouth! The balance of golden caramel crunch and silky cream cheese is divine. Ordering again for every family gathering."
  },
  {
    id: 6,
    name: "Rohan Mehta",
    category: "Fusion Cakes",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    review: "Ordered the Royal Rasmalai cake for my mother's 60th birthday. The cardamom sponge infusion and real saffron cream blew everyone away. True artisanal perfection!"
  },
  {
    id: 7,
    name: "Meera Joshi",
    category: "Bento Cake",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    rating: 5,
    date: "1 month ago",
    verified: true,
    review: "Got the cute aesthetic bento cakes for a cozy picnic date. They came packaged with beautiful satin ribbons and tasted as fresh as if pulled straight from the oven."
  },
  {
    id: 8,
    name: "Vikramaditya Rao",
    category: "Corporate Order",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80",
    rating: 5,
    date: "1 month ago",
    verified: true,
    review: "We ordered 50 customized logo cupcakes for our company product launch. Timely delivery, immaculate presentation, and every single employee was praising the taste!"
  }
];

export default function Testimonials() {
  // Tripled list for a smooth continuous infinite scrolling loop
  const marqueeList = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-secondary/30 dark:bg-gray-800/30 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Accent Lights */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <SectionHeading 
          title="Sweet Words" 
          overline="Customer Reviews"
          subtitle="Don't just take our word for it. Here's what our lovely customers have to say."
        />

        {/* Continuous Auto-Scrolling Testimonials Track */}
        <div className="relative group mt-6 mb-2">
          
          {/* Gradient Side Fade Overlays */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

          {/* Continuous Infinite Marquee Scroll Track */}
          <div className="overflow-hidden py-2">
            <div className="flex gap-6 animate-marquee-smooth">
              {marqueeList.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="w-[300px] sm:w-[360px] shrink-0 bg-white dark:bg-gray-900 p-6 sm:p-7 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 flex flex-col justify-between relative group/card"
                >
                  <Quote size={40} className="absolute top-4 right-5 text-gray-100 dark:text-gray-800 pointer-events-none" />

                  <div>
                    {/* Rating Stars */}
                    <div className="flex text-amber-400 mb-4">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 italic relative z-10">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Customer Profile Footer */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.photo} 
                        alt={item.name} 
                        className="w-11 h-11 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold font-playfair text-gray-900 dark:text-white text-base leading-snug">
                            {item.name}
                          </h4>
                          {item.verified && (
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
