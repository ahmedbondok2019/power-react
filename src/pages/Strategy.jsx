import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SmartStrategyFlowchart from '../components/strategy/SmartStrategyFlowchart';
import LeanManagementSection from '../components/strategy/LeanManagementSection';
import TwoWayCashFlowSection from '../components/strategy/TwoWayCashFlowSection';
import AgileResourcingSection from '../components/strategy/AgileResourcingSection';
import { Sparkles, PhoneCall } from 'lucide-react';

const Strategy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black">

      {/* Hero Section matching the exact design and stats cards */}
      <Hero
        id="strategy-hero"
        badge="استراتيجيتنا"
        title={
          <>
            منهجية ذكية لإدارة المشاريع <br />
            وتحقيق نتائج تتجاوز التوقعات
          </>
        }
        subtitle={
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl text-right font-medium">
            نعتمد في إدارة مشاريعنا على منهجية متكاملة تجمع بين التخطيط الذكي، كفاءة الموارد، الهندسة القيمة، إدارة المخاطر، والتحكم في الوقت والتكاليف، لضمان تنفيذ أكثر كفاءة وجودة واستدامة.
          </p>
        }
        buttonText="تعرف علينا"
        buttonLink="/about"
        bgImage="/strategy-hero-bg.jpg"
        showVisionLogo={false}
        showStatsCards={true}
        stats={[
          { number: 16, label: "عاماً من الخبرة" },
          { number: 50, label: "مشروعاً مكتمل" },
          { number: 10, label: "مدن رئيسية" }
        ]}
      />

      {/* Section 2: Interactive Smart Strategy Flowchart (خريطة التدفق الاستراتيجي التفاعلية) */}
      <SmartStrategyFlowchart />

      {/* Section 3: Lean Management (إدارة رشيدة مع خريطة React Flow) */}
      <LeanManagementSection />

      {/* Section 4: Two-Way Cash Flow Analysis (تحليل التدفق النقدي ذو الاتجاهين مع Line Chart) */}
      <TwoWayCashFlowSection />

      {/* Section 5: Agile Resourcing (التوزيع المرن للموارد مع Interactive Timeline) */}
      <AgileResourcingSection />

      {/* Bottom Call To Action */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-t border-white/5" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1C2420] via-[#1E201E] to-[#181D1A] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl text-right">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2 text-[#FFB800] text-xs sm:text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>شريكك الاستراتيجي في الإنجاز</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                هل تبحث عن إدارة استراتيجية لمشروعك القادم؟
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                تواصل مع فريقنا الاستشاري والهندسي اليوم لمناقشة متطلبات مشروعك ووضع خطة التنفيذ المثالية.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                to="/#اتصل-بنا"
                className="px-8 py-4 rounded-2xl bg-[#FFB800] text-black font-extrabold text-sm sm:text-base hover:bg-[#EAB308] shadow-lg shadow-[#FFB800]/25 transition-all hover:scale-105 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>تواصل معنا الآن</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Strategy;
