import Hero from '@/components/sections/Hero';
import AboutPreview from '@/components/sections/AboutPreview';
import ServicesPreview from '@/components/sections/ServicesPreview';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import TechStack from '@/components/sections/TechStack';
import Timeline from '@/components/sections/Timeline';
import ContactCTA from '@/components/sections/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedProjects />
      <TechStack />
      <Timeline />
      <ContactCTA />
    </>
  );
}
