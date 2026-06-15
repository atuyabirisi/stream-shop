import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import FeaturedProperties from "../components/home/FeaturedProperties";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ExperienceKisii from "../components/home/ExperienceKisii";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
      <ExperienceKisii />
      <CallToAction />
      <Footer />
    </main>
  );
}
