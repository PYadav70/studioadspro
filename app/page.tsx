import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustedBar from '@/components/TrustedBar';
import Stats from '@/components/Stats';
// import About from '@/components/About';
import Services from '@/components/Services';
// import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessPipeline from '@/components/ProcessPipeline';
import Industries from '@/components/Industries';
import FeaturedWork from '@/components/FeaturedWork';
import MarqueeBanner from '@/components/MarqueeBanner';
import TeamSection from '@/components/TeamSection';
// import Testimonials from '@/components/Testimonials';
// import TechStack from '@/components/TechStack';
// import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
// import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import TermsPolicyModal from '@/components/TermsPolicyModal';
import FloatingSocialButtons from '@/components/FloatingSocialButtons';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      <TermsPolicyModal />
      <FloatingSocialButtons />
      <main className="flex-1">
        <Hero />
        <TrustedBar />
        <Stats />
        {/* <About /> */}
        <Services />
        {/* <WhyChooseUs /> */}
        <ProcessPipeline />
        <Industries />
        <FeaturedWork />
        <MarqueeBanner />
        <TeamSection />
        {/* <Testimonials /> */}
        {/* <TechStack /> */}
        {/* <PricingSection /> */}
        <FAQSection />
        {/* <ContactSection /> */}
      </main>
      <Footer />
    </div>
  );
}
