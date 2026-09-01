import React from 'react';
import { motion } from 'framer-motion';

const featuredCards = [
  {
    title: "مشاريعنا",
    description: "نقدم مجموعة واسعة من خدمات المقاولات، من المقاولات الجزئية إلى المقاولات العامة، مع تغطية لعدة قطاعات.",
    image: "/saudi_engineers_construction.jpg",
    buttonText: "اقرأ المزيد",
    link: "#مشاريعنا"
  },
  {
    title: "مشاريعنا",
    description: "نقدم مجموعة واسعة من خدمات المقاولات، من المقاولات الجزئية إلى المقاولات العامة، مع تغطية لعدة قطاعات.",
    image: "/saudi_engineers_construction.jpg",
    buttonText: "اقرأ المزيد",
    link: "#مشاريعنا"
  },
  {
    title: "مشاريعنا",
    description: "نقدم مجموعة واسعة من خدمات المقاولات، من المقاولات الجزئية إلى المقاولات العامة، مع تغطية لعدة قطاعات.",
    image: "/saudi_engineers_construction.jpg",
    buttonText: "اقرأ المزيد",
    link: "#مشاريعنا"
  }
];

const FeaturedProjectsCards = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-[#111312] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 3 Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center"
        >
          {featuredCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="w-full max-w-[410px] h-[460px] sm:h-[500px] rounded-[24px] overflow-hidden relative shadow-xl group cursor-pointer"
            >
              {/* Background Image with smooth hover scale */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Dark Warm Cinematic Overlay matching design */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/45 to-black/80 group-hover:from-black/60 group-hover:to-black/85 transition-colors duration-500" />

              {/* Foreground Content */}
              <div className="relative z-20 h-full p-7 sm:p-8 flex flex-col justify-between text-right">
                
                {/* Top Text: Title and Paragraph */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-sans drop-shadow-md">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed font-medium drop-shadow-sm">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Action Pill Button */}
                <div className="flex justify-end pt-4">
                  <button className="bg-[#D4E128] hover:bg-[#c2ce23] text-[#1E201E] font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer">
                    {card.buttonText}
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedProjectsCards;
