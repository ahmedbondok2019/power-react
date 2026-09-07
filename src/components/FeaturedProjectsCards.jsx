import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1];

const featuredCards = [
  {
    title: 'مشاريعنا',
    description: 'نقدم مجموعة واسعة من خدمات المقاولات، من المقاولات الجزئية إلى المقاولات العامة، مع تغطية لعدة قطاعات.',
    image: '/saudi_engineers_construction.jpg',
    buttonText: 'اقرأ المزيد',
    link: '/projects',
  },
  {
    title: 'مشاريعنا',
    description: 'نقدم مجموعة واسعة من خدمات المقاولات، من المقاولات الجزئية إلى المقاولات العامة، مع تغطية لعدة قطاعات.',
    image: '/saudi_engineers_construction.jpg',
    buttonText: 'اقرأ المزيد',
    link: '/projects',
  },
  {
    title: 'مشاريعنا',
    description: 'نقدم مجموعة واسعة من خدمات المقاولات، من المقاولات الجزئية إلى المقاولات العامة، مع تغطية لعدة قطاعات.',
    image: '/saudi_engineers_construction.jpg',
    buttonText: 'اقرأ المزيد',
    link: '/projects',
  },
];

/*
 * 3-column grid: cards rise from bottom (y: 100 → 0)
 * Uses container stagger to prevent individual card jitter on scroll.
 */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.88 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.9, ease: EASE }
  }
};
const FeaturedProjectsCards = () => (
  <section className="py-16 sm:py-24 bg-white text-[#111312] relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1, margin: '0px 0px -100px 0px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center"
      >
        {featuredCards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
            className="w-full max-w-[410px] h-[460px] sm:h-[500px] rounded-[24px] overflow-hidden relative shadow-xl group cursor-pointer"
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/45 to-black/80 group-hover:from-black/60 group-hover:to-black/85 transition-colors duration-500" />

            {/* Content */}
            <div className="relative z-20 h-full p-7 sm:p-8 flex flex-col justify-between text-right">
              <div className="space-y-4 pt-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-sans drop-shadow-md">
                  {card.title}
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed font-medium drop-shadow-sm">
                  {card.description}
                </p>
              </div>
              <div className="flex justify-end pt-4">
                <Link
                  to={card.link}
                  className="bg-[#D4E128] hover:bg-[#c2ce23] text-[#1E201E] font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                >
                  {card.buttonText}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeaturedProjectsCards;
