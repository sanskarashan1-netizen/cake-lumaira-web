import Navbar from '../components/common/Navbar';
import Hero from '../components/sections/Hero';
import FeaturedCakes from '../components/sections/FeaturedCakes';
import CustomCakeBuilder from '../components/sections/CustomCakeBuilder';
import Flavours from '../components/sections/Flavours';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import SpecialOffer from '../components/sections/SpecialOffer';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';
import CartDrawer from '../components/common/CartDrawer';

export default function Home({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main>
        <Hero />
        <FeaturedCakes />
        <CustomCakeBuilder />
        <Flavours />
        <WhyChooseUs />
        <SpecialOffer />
        <Gallery />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
