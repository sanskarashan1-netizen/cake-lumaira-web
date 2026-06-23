import SectionHeading from '../common/SectionHeading';
import CakeCard from '../common/CakeCard';

const cakes = [
  { id: 1, name: "Chocolate Truffle", price: "₹350", description: "Rich and dense chocolate cake with smooth truffle ganache.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80" },
  { id: 2, name: "Black Forest", price: "₹400", description: "Classic German chocolate sponge with fresh cherry filling.", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80" },
  { id: 3, name: "Red Velvet", price: "₹550", description: "Luxurious red sponge with signature cream cheese frosting.", image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&q=80" },
  { id: 4, name: "Vanilla Delight", price: "₹350", description: "Light and fluffy vanilla sponge with delicate buttercream.", image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=600&q=80" },
  { id: 5, name: "Butterscotch", price: "₹450", description: "Sweet caramel flavored cake with crunchy praline bits.", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80" },
  { id: 6, name: "Strawberry Bliss", price: "₹500", description: "Fresh strawberry cake layered with luscious fruit cream.", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80" },
  { id: 7, name: "Blueberry Cheesecake", price: "₹650", description: "Creamy baked cheesecake topped with blueberry compote.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80" },
  { id: 8, name: "Fruit Fantasy", price: "₹600", description: "Mixed fresh fruits layered in vanilla sponge and fresh cream.", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80" }
];

export default function FeaturedCakes() {
  return (
    <section id="cakes" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Our Signature Cakes" 
          subtitle="Explore our most loved handcrafted cakes, made fresh daily with premium ingredients."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cakes.map((cake) => (
            <CakeCard key={cake.id} {...cake} />
          ))}
        </div>
      </div>
    </section>
  );
}
