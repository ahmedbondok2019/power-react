import React from 'react';
import SectionTitle from './ui/SectionTitle';

const HallOfFameSection = ({
  data,
  title = '',
  subtitle = '',
  clients = [],
  theme = 'light',
}) => {
  const sectionTitle = data?.header?.title || title;
  const rawClients = data?.clients || clients || [];

  const isDark = theme === 'dark';

  const displayClients = rawClients.map((c) => ({
    name: c.title || c.name,
    logo: c.image || c.logo,
  }));

  if (displayClients.length === 0) return null;

  return (
    <section className={`py-16 sm:py-20 relative overflow-hidden ${isDark ? 'bg-[#141615] text-white' : 'bg-white text-[#111312]'}`}>
      <div className="max-w-7xl mx-auto px-6 mb-8 text-right">
        {/* Section Heading */}
        <SectionTitle title={sectionTitle} theme={isDark ? 'dark' : 'light'} />
      </div>

      {/* Horizontal Continuous Logo Slider Track with Tall Band & Tight Gaps */}
      <div className={`w-full py-6 sm:py-8 shadow-sm border-y relative overflow-hidden ${
        isDark ? 'bg-[#1A1C1A] border-white/10' : 'bg-[#E5E5E5] border-[#DCDCDC]'
      }`}>
        <style>{`
          @keyframes hallOfFameMarquee {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-100%, 0, 0);
            }
          }
          .animate-hall-fame {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            animation: hallOfFameMarquee 25s linear infinite;
            will-change: transform;
          }
        `}</style>
        <div className="flex overflow-hidden select-none pointer-events-none w-full" dir="ltr">
          <div className="animate-hall-fame flex items-center gap-8 sm:gap-12 md:gap-16 pr-8 sm:pr-12 md:pr-16">
            {displayClients.concat(displayClients).concat(displayClients).map((client, index) => (
              <div key={`track-1-${index}`} className="h-20 sm:h-24 md:h-28 lg:h-32 shrink-0 flex items-center justify-center px-3 sm:px-4">
                <img
                  src={client.logo}
                  alt={client.name || 'Client Logo'}
                  className={`h-full w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] object-contain ${
                    isDark ? 'brightness-110 contrast-105 drop-shadow-md' : 'brightness-95 contrast-105'
                  }`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="animate-hall-fame flex items-center gap-8 sm:gap-12 md:gap-16 pr-8 sm:pr-12 md:pr-16" aria-hidden="true">
            {displayClients.concat(displayClients).concat(displayClients).map((client, index) => (
              <div key={`track-2-${index}`} className="h-20 sm:h-24 md:h-28 lg:h-32 shrink-0 flex items-center justify-center px-3 sm:px-4">
                <img
                  src={client.logo}
                  alt={client.name || 'Client Logo'}
                  className={`h-full w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] object-contain ${
                    isDark ? 'brightness-110 contrast-105 drop-shadow-md' : 'brightness-95 contrast-105'
                  }`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HallOfFameSection;
