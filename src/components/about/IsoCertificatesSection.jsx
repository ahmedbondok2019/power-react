import React from 'react';
import { motion } from 'framer-motion';

const ISO_CERTS = [
  {
    id: 1,
    title: "ISO 9001:2015",
    image: "https://placehold.co/600x800/ffffff/94a3b8?text=ISO+9001:2015"
  },
  {
    id: 2,
    title: "ISO 14001:2015",
    image: "https://placehold.co/600x800/ffffff/94a3b8?text=ISO+14001:2015"
  },
  {
    id: 3,
    title: "ISO 45001:2018",
    image: "https://placehold.co/600x800/ffffff/94a3b8?text=ISO+45001:2018"
  }
];

const IsoCertificatesSection = () => {
  return (
    <section className="w-full bg-[#F3F4F6] text-black py-12 pb-24 select-none" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {ISO_CERTS.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-6 tracking-wide font-sans" dir="ltr">
                {cert.title}
              </h3>
              <div className="w-full rounded-lg overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-gray-200">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IsoCertificatesSection;
