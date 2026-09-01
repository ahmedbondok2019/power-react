import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './ui/SectionTitle';

const GroupStructureSection = () => {
  // Pure Logo Images as SVG Data URIs matching the exact visuals
  const sisterCompanies = [
    {
      name: "POWER DUCT",
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="280" height="180">
        <g transform="translate(100, 15) rotate(-10)">
          <rect x="0" y="0" width="28" height="28" rx="6" fill="%23FFFFFF" />
          <rect x="36" y="0" width="28" height="28" rx="6" fill="%23DDDDDD" />
          <rect x="0" y="36" width="28" height="28" rx="6" fill="%23AAAAAA" />
          <rect x="36" y="36" width="28" height="28" rx="6" fill="%23FFFFFF" />
        </g>
        <text x="140" y="125" fill="%23FFFFFF" font-size="22" font-weight="900" font-family="sans-serif" text-anchor="middle" letter-spacing="2">POWER DUCT</text>
        <rect x="30" y="140" width="220" height="32" rx="16" fill="%23333333" />
        <text x="140" y="161" fill="%23EEEEEE" font-size="11" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">DUCTS FACTORY %26 MANUFACTURE</text>
      </svg>`
    },
    {
      name: "KIENZLER",
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="280" height="180">
        <path d="M 70 50 Q 140 25 210 50" stroke="%23FFFFFF" stroke-width="4" fill="none" stroke-linecap="round" />
        <circle cx="215" cy="52" r="3" fill="%23FFFFFF" />
        <text x="140" y="95" fill="%23FFFFFF" font-size="22" font-weight="800" font-family="sans-serif" text-anchor="middle" letter-spacing="3">KIENZLER</text>
        <text x="140" y="115" fill="%23AAAAAA" font-size="10" font-weight="600" font-family="sans-serif" text-anchor="middle" letter-spacing="2">TEXTILE VENTILATION</text>
        <rect x="45" y="138" width="190" height="32" rx="16" fill="%23333333" />
        <text x="140" y="159" fill="%23EEEEEE" font-size="11" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">FABRIC DUCT FACTORY</text>
      </svg>`
    }
  ];

  const distributors = [
    {
      name: "KSB",
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170" width="200" height="170">
        <rect x="70" y="15" width="60" height="50" rx="14" fill="%230091FF" />
        <path d="M 90 30 L 90 52 M 90 42 Q 110 42 110 52 Q 110 62 90 62" stroke="%23FFFFFF" stroke-width="5" fill="none" stroke-linecap="round" />
        <text x="100" y="98" fill="%230091FF" font-size="26" font-weight="900" font-family="sans-serif" text-anchor="middle" letter-spacing="2">KSB</text>
        <rect x="15" y="120" width="170" height="30" rx="15" fill="%23333333" />
        <text x="100" y="139" fill="%23EEEEEE" font-size="10" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">PUMP MANUFACTURE</text>
      </svg>`
    },
    {
      name: "TSSC",
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170" width="200" height="170">
        <circle cx="100" cy="45" r="32" stroke="%234CAF50" stroke-width="3" fill="none" />
        <text x="100" y="52" fill="%234CAF50" font-size="14" font-weight="800" font-family="sans-serif" text-anchor="middle">TSSC</text>
        <rect x="25" y="120" width="150" height="30" rx="15" fill="%23333333" />
        <text x="100" y="139" fill="%23EEEEEE" font-size="10" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">INSULATION</text>
      </svg>`
    },
    {
      name: "TRANE",
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 170" width="220" height="170">
        <circle cx="170" cy="45" r="22" fill="%23FF4500" />
        <rect x="152" y="42" width="36" height="6" fill="%23111312" />
        <text x="75" y="53" fill="%23FF4500" font-size="28" font-weight="900" font-style="italic" font-family="sans-serif" text-anchor="middle" letter-spacing="2">TRANE</text>
        <rect x="25" y="120" width="170" height="30" rx="15" fill="%23333333" />
        <text x="110" y="139" fill="%23EEEEEE" font-size="10" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">HVAC SYSTEMS</text>
      </svg>`
    },
    {
      name: "ICE",
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170" width="200" height="170">
        <text x="70" y="52" fill="%23FFD700" font-size="34" font-weight="900" font-family="sans-serif" text-anchor="middle">i</text>
        <text x="125" y="52" fill="%2300E5FF" font-size="34" font-weight="900" font-family="sans-serif" text-anchor="middle">CE</text>
        <text x="100" y="78" fill="%23FFFFFF" font-size="9" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">WATER MANAGEMENT</text>
        <rect x="20" y="120" width="160" height="30" rx="15" fill="%23333333" />
        <text x="100" y="139" fill="%23EEEEEE" font-size="10" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">WATER TREATMENT</text>
      </svg>`
    },
    {
      name: "Kingspan",
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 170" width="220" height="170">
        <path d="M 50 40 Q 60 20 75 35 Q 85 20 95 38 Q 80 50 65 48 Z" fill="%23FFA000" />
        <text x="110" y="55" fill="%231E88E5" font-size="28" font-weight="900" font-family="sans-serif" text-anchor="middle" letter-spacing="1">Kingspan</text>
        <rect x="25" y="120" width="170" height="30" rx="15" fill="%23333333" />
        <text x="110" y="139" fill="%23EEEEEE" font-size="10" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">DUCT MANUFACTURE</text>
      </svg>`
    }
  ];

  return (
    <section id="هيكل-المجموعة" className="py-24 bg-[#111312] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Header: Title (Right) and Logo (Left) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">

          {/* Right Side in RTL: Section Title */}
          <div className="text-right">
            <SectionTitle title="هيكل المجموعة" theme="dark" />
          </div>

          {/* Left Side in RTL: Brand Logo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img
              src="/logo2.png"
              alt="Power Preparation"
              className="w-[280px] sm:w-[380px] md:w-[460px] lg:w-[547px] h-auto max-h-[219px] object-contain drop-shadow-lg"
            />
          </motion.div>
        </div>

        {/* Divisions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Right Column in RTL: شركات شقيقة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-right space-y-8"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 pb-3 border-b border-white/10 inline-block">
              شركات شقيقة
            </h3>

            {/* Pure Large Logo Images with organic layout */}
            <div className="flex flex-wrap items-center justify-start gap-10 sm:gap-14">
              {sisterCompanies.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, filter: "brightness(1.15)" }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-28 sm:h-36 md:h-40 w-auto object-contain drop-shadow-md"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Left Column in RTL: اتفاقيات موزعي Power Preparation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-right space-y-8"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 pb-3 border-b border-white/10 inline-block">
              اتفاقيات موزعي Power Preparation
            </h3>

            {/* Pure Large Logo Images with organic layout */}
            <div className="flex flex-wrap items-center justify-center ">
              {distributors.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, filter: "brightness(1.15)" }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-24 sm:h-28 md:h-32 w-auto object-contain drop-shadow-md"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default GroupStructureSection;
