import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftCircle } from 'lucide-react';
import ImageOverlayCard from './ui/ImageOverlayCard';
import SectionTitle from './ui/SectionTitle';

const ServicesSection = () => {
  // Service cards data matching the visual design
  const services = [
    { 
      title: "HOSPITALITY\n& RESORTS", 
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      title: "HEALTHCARE\n& MEDICAL", 
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      title: "RESIDENTIAL\nDEVELOPMENT", 
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      title: "COMMERCIAL\n& RETAIL", 
      image: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      title: "INFRASTRUCTURE\n& CIVIL", 
      image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      title: "INDUSTRIAL\nFACILITIES", 
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      title: "EDUCATION\n& CAMPUSES", 
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop" 
    },
  ];

  // Container animation for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <section id="خدماتنا" className="min-h-screen py-24 bg-[#111312] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          
          {/* Right Side in RTL: Section Title (1st in DOM) */}
          <div className="text-right">
            <SectionTitle title="خدماتنا" theme="dark" />
          </div>

          {/* Left Side in RTL: "More Services" Link (2nd in DOM) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <a 
              href="#خدماتنا" 
              className="group flex items-center gap-2.5 text-white/80 hover:text-[#FFB800] transition-colors duration-300 text-sm md:text-base font-medium"
            >
              <span>مزيد من الخدمات</span>
              <ArrowLeftCircle className="w-5 h-5 text-white/70 group-hover:text-[#FFB800] group-hover:-translate-x-1 transition-all duration-300 stroke-[1.8]" />
            </a>
          </motion.div>
          
        </div>

        {/* Section Description */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-right mb-14"
        >
          <p className="typography-paragraph-main text-white/90 max-w-4xl ml-auto leading-relaxed">
            نقدم مجموعة واسعة من خدمات المقاولات من المقاولات الجزئية إلى المقاولات العامة مع تغطية لعدة قطاعات.
          </p>
        </motion.div>

        {/* Cards Grid - Exactly 4 items per row on desktop */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center max-w-7xl mx-auto"
        >
          {services.map((service, index) => (
            <div 
              key={index} 
              className="w-full flex justify-center"
            >
              <ImageOverlayCard 
                title={service.title}
                imageSrc={service.image}
                delay={index * 0.08}
                className="w-full max-w-[305px] h-[363px] rounded-[22px]"
              />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;
