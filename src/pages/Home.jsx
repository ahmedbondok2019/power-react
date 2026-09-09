import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import GroupStructureSection from '../components/GroupStructureSection';
import ProjectsSection from '../components/ProjectsSection';
import HallOfFameSection from '../components/HallOfFameSection';
import FeaturedProjectsCards from '../components/FeaturedProjectsCards';
import { initCinematicAnimations } from '../animations/cinematicHome';
import { useHomeData } from '../hooks/useHomeData';

const Home = () => {
  const { data: homeData, isLoading, isError } = useHomeData();

  useEffect(() => {
    // Run cinematic animation system after the DOM is painted
    const raf = requestAnimationFrame(() => {
      const cleanup = initCinematicAnimations();
      return cleanup;
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  const heroData = homeData?.hero_section;
  const aboutData = homeData?.about_section;
  const servicesData = homeData?.services_section;
  const groupData = homeData?.group_structure;
  const projectsData = homeData?.featured_projects;
  return (
    <>
      <div className="bg-white">
        <Hero data={homeData?.hero_section} />
        <AboutSection data={homeData?.about_section} />
      </div>

      <ServicesSection data={homeData?.services_section} />
      <GroupStructureSection data={homeData?.group_structure} />
      <ProjectsSection data={homeData?.featured_projects} />
      <HallOfFameSection data={homeData?.hall_of_fame} />
      <FeaturedProjectsCards data={homeData?.featured_cards || homeData?.blogs || homeData?.blogs_section?.items} />
    </>
  );
};

export default Home;
