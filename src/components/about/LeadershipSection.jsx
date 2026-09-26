import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

const LeadershipSection = ({ data }) => {
  const containerRef = useRef(null);

  const headerTitle = data?.header?.title || '';
  const headerSubtitle = data?.header?.subtitle || '';
  const bgImage = data?.header?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

  const leadersList = (data?.leaders && data.leaders.length > 0) ? data.leaders : [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [-20, 0]);

  const l1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  const l1Y = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [-50, 0, 0, -50]);
  const l1PointerEvents = useTransform(scrollYProgress, (val) => val > 0.35 ? "none" : "auto");

  const l2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const l2X = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [100, 0, 0, 100]);
  const l2PointerEvents = useTransform(scrollYProgress, (val) => (val < 0.35 || val > 0.65) ? "none" : "auto");

  const l3Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const l3X = useTransform(scrollYProgress, [0.65, 0.75], [-100, 0]);
  const l3PointerEvents = useTransform(scrollYProgress, (val) => val < 0.65 ? "none" : "auto");

  if (leadersList.length === 0) return null;

  const leader1 = leadersList[0];
  const leader2 = leadersList[1];
  const leader3 = leadersList[2];

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[400vh] text-white bg-fixed bg-cover bg-center select-none border-b border-white/5"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#141615]/85 backdrop-blur-[1px] z-0"></div>

      {/* Sticky Inner Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col px-6 lg:px-12 py-12 lg:py-20 z-10 overflow-hidden">
        
        {/* Header */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="flex flex-col items-start text-right mb-10 shrink-0 w-full max-w-7xl mx-auto"
        >
          {headerTitle && <SectionTitle title={headerTitle} theme="dark" />}
          {headerSubtitle && (
            <p className="text-white/90 text-base sm:text-lg lg:text-xl font-medium tracking-wide mt-4">
              {headerSubtitle}
            </p>
          )}
        </motion.div>

        {/* Leaders Central Stage */}
        <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center text-center">
          
          {/* Leader 1 */}
          {leader1 && (
            <motion.div 
              style={{ opacity: l1Opacity, y: l1Y, pointerEvents: l1PointerEvents }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <h3 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-white mb-6 lg:mb-10 tracking-wide drop-shadow-lg">
                {leader1.name || leader1.title}
              </h3>
              <div className="space-y-6 text-white/95 text-sm sm:text-base lg:text-[17px] font-normal leading-[2.2] max-w-4xl mx-auto text-right md:text-center">
                {(leader1.paragraphs || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Leader 2 */}
          {leader2 && (
            <motion.div 
              style={{ opacity: l2Opacity, x: l2X, pointerEvents: l2PointerEvents }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <h3 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-white mb-6 lg:mb-10 tracking-wide drop-shadow-lg">
                {leader2.name || leader2.title}
              </h3>
              <div className="space-y-6 text-white/95 text-sm sm:text-base lg:text-[17px] font-normal leading-[2.2] max-w-4xl mx-auto text-right md:text-center">
                {(leader2.paragraphs || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Leader 3 */}
          {leader3 && (
            <motion.div 
              style={{ opacity: l3Opacity, x: l3X, pointerEvents: l3PointerEvents }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <h3 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-white mb-6 lg:mb-10 tracking-wide drop-shadow-lg">
                {leader3.name || leader3.title}
              </h3>
              <div className="space-y-6 text-white/95 text-sm sm:text-base lg:text-[17px] font-normal leading-[2.2] max-w-4xl mx-auto text-right md:text-center">
                {(leader3.paragraphs || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
