import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import GroupStructureSection from '../components/GroupStructureSection';
import ProjectsSection from '../components/ProjectsSection';
import HallOfFameSection from '../components/HallOfFameSection';
import FeaturedProjectsCards from '../components/FeaturedProjectsCards';

const Home = () => {
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
