import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import GroupStructureSection from '../components/GroupStructureSection';
import ProjectsSection from '../components/ProjectsSection';
import HallOfFameSection from '../components/HallOfFameSection';
import FeaturedProjectsCards from '../components/FeaturedProjectsCards';
import { initCinematicAnimations } from '../animations/cinematicHome';

const Home = () => {
  useEffect(() => {
    // Run cinematic animation system after the DOM is painted
    // Small rAF delay ensures all Framer Motion entrance animations
    // have already started before GSAP takes over scroll-driven effects
    const raf = requestAnimationFrame(() => {
      const cleanup = initCinematicAnimations();
      return cleanup;
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className="bg-white">
        <Hero
          mediaType="image"
          bgImage="/hero-bg.jpg"
        />
        <AboutSection />
      </div>

      <ServicesSection />
      <GroupStructureSection />
      <ProjectsSection />
      <HallOfFameSection />
      <FeaturedProjectsCards />
    </>
  );
};

export default Home;
