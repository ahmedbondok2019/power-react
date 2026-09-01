import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import SectionTitle from '../ui/SectionTitle';
import {
  TrendingUp,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

// Monthly Cash Flow Milestones Data (Planned vs Actual)
const CASH_FLOW_DATA = [
  { month: 'المرحلة 1', milestone: 'M1 - الأساسات', planned: 20, actual: 18, committed: 20 },
  { month: 'المرحلة 2', milestone: 'M2 - الهيكل الإنشائي', planned: 35, actual: 30, committed: 35 },
  { month: 'المرحلة 3', milestone: 'M3 - التوريدات الكبرى', planned: 28, actual: 26, committed: 30 },
  { month: 'المرحلة 4', milestone: 'M4 - الأعمال الكهروميكانيكية', planned: 48, actual: 42, committed: 45 },
  { month: 'المرحلة 5', milestone: 'M5 - التشطيبات والعزل', planned: 40, actual: 38, committed: 42 },
  { month: 'المرحلة 6', milestone: 'M6 - الفحص والتشغيل', planned: 62, actual: 55, committed: 58 },
  { month: 'المرحلة 7', milestone: 'M7 - التسليم النهائي', planned: 52, actual: 48, committed: 50 }
];

const CONTROL_POINTS = [
  {
    number: '01',
    title: 'Planned Cash Flow',
    subtitle: 'Link financial planning to project milestones.',
    arabicDesc: 'ربط التخطيط المالي والتدفقات النقدية بمحطات الإنجاز الميدانية (Project Milestones) بدقة تامة.'
  },
  {
    number: '02',
    title: 'Actual Cash Flow',
    subtitle: 'Monitor real movement and identify deviations.',
    arabicDesc: 'مراقبة حركة السيولة الفعلية والمستخلصات وكشف أي انحرافات مالية أو زمنية بشكل استباقي.'
  },
  {
    number: '03',
    title: 'Decision Support',
    subtitle: 'Use live insight to support project decisions.',
    arabicDesc: 'توظيف البيانات والتحليلات اللحظية لدعم اتخاذ القرارات التنفيذية وضمان استقرار المشروع.'
  }
];

// Custom Tooltip matching Dark Engineering Aesthetic
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#121613]/95 border border-[#D4E128]/40 rounded-2xl p-4 shadow-2xl backdrop-blur-md text-right text-white space-y-2 min-w-[200px]" dir="rtl">
        <div className="font-bold text-xs text-[#D4E128] border-b border-white/10 pb-1.5 font-mono">
          {data.milestone}
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/60">المخطط (Planned):</span>
            <span className="font-mono font-bold text-[#D4E128]">{data.planned}M ر.س</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/60">الفعلي (Actual):</span>
            <span className="font-mono font-bold text-[#38BDF8]">{data.actual}M ر.س</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Dots with Neon Glowing Rings
const CustomizedPlannedDot = (props) => {
  const { cx, cy } = props;
  if (cx === undefined || cy === undefined) return null;
  return (
    <svg x={cx - 6} y={cy - 6} width={12} height={12} fill="none">
      <circle cx="6" cy="6" r="5" fill="#D4E128" stroke="#1C3322" strokeWidth="2" />
      <circle cx="6" cy="6" r="6" stroke="#D4E128" strokeWidth="1" opacity="0.6" />
    </svg>
  );
};

const CustomizedActualDot = (props) => {
  const { cx, cy } = props;
  if (cx === undefined || cy === undefined) return null;
  return (
    <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="none">
      <circle cx="5" cy="5" r="4" fill="#38BDF8" stroke="#1C3322" strokeWidth="2" />
    </svg>
  );
};

const TwoWayCashFlowSection = () => {
  const [activePoint, setActivePoint] = useState(0);

  return (
    <section 
      id="تحليل-التدفق-النقدي"
      className="relative w-full bg-[#111312] text-white py-24 sm:py-32 overflow-hidden select-none border-b border-white/5"
      dir="rtl"
    >
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#D4E128]/5 rounded-full blur-[180px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#2A352F]/35 rounded-full blur-[180px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header & Strategic Context (Exact text from design) */}
        <div className="mb-14 sm:mb-20 text-right space-y-6 max-w-4xl">
          <SectionTitle title="تحليل التدفق النقدي ذو الاتجاهين" theme="dark" />

          <div className="space-y-4 text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            <p>
              يضمن تحليل التدفق النقدي ذو الاتجاهين أننا نتوافق مع عملائنا في جدول الدفع الخاص بهم مقارنة بتقدم المشروع.
            </p>
            <p>
              يضمن هذا نجاح المشروع، حيث أن أحد الأسباب الرئيسية لنجاح المشاريع هو الاستقرار المالي.
            </p>
            <p>
              نحن دائمًا نحرص على أن يعرف العميل المبلغ الإجمالي لكل دفعة ومتى يجب دفعها وفقًا لتقدم المشروع. يساعد ذلك كلا الجانبين على إدارة التدفق النقدي الداخلي وتحقيق الاستقرار المالي العام للمشروع.
            </p>
          </div>
        </div>

        {/* Main White/Cream Dashboard Container matching reference design */}
        <div className="rounded-3xl sm:rounded-[2.5rem] bg-[#F6F6F2] p-6 sm:p-10 md:p-12 text-[#1C1D1B] shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Dark Green Cash Flow Line Chart Box (Cols 1-7 in LTR / Cols 1-7) */}
            <div className="lg:col-span-7 bg-[#1C3322] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D4E128]/20 flex flex-col justify-between min-h-[360px] sm:min-h-[400px]">
              
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4" dir="ltr">
                <div>
                  <h4 className="text-sm sm:text-base font-black font-mono tracking-widest text-[#D4E128] uppercase">
                    PROJECT CASH FLOW
                  </h4>
                  <p className="text-[11px] font-mono text-white/60 tracking-wider mt-0.5">
                    PLANNED / ACTUAL / COMMITTED
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4E128]" />
                    <span className="text-white/80">Planned</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                    <span className="text-white/80">Actual</span>
                  </div>
                </div>
              </div>

              {/* Line Chart Component (Dots Colors / Linear - shadcn / recharts) */}
              <div className="w-full h-[240px] sm:h-[270px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={CASH_FLOW_DATA}
                    margin={{ top: 20, right: 20, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255, 255, 255, 0.08)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="rgba(255, 255, 255, 0.4)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10, fontFamily: 'monospace' }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="rgba(255, 255, 255, 0.4)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10, fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Line 1: Planned Cash Flow (Neon Lime Yellow with Dot Colors) */}
                    <Line
                      type="linear"
                      dataKey="planned"
                      name="Planned"
                      stroke="#D4E128"
                      strokeWidth={3}
                      dot={<CustomizedPlannedDot />}
                      activeDot={{ r: 7, fill: '#D4E128', stroke: '#1C3322', strokeWidth: 2 }}
                    />

                    {/* Line 2: Actual Cash Flow (Teal Sky Blue with Linear Dots) */}
                    <Line
                      type="linear"
                      dataKey="actual"
                      name="Actual"
                      stroke="#38BDF8"
                      strokeWidth={2.5}
                      dot={<CustomizedActualDot />}
                      activeDot={{ r: 6, fill: '#38BDF8', stroke: '#1C3322', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Right Column: Control Points List (Cols 8-12) */}
            <div className="lg:col-span-5 text-left space-y-6" dir="ltr">
              
              <div className="border-b border-black/10 pb-3">
                <h4 className="text-sm font-black font-sans tracking-widest text-[#1C1D1B] uppercase">
                  CONTROL POINTS
                </h4>
              </div>

              {/* 3 Control Points Items */}
              <div className="space-y-6">
                {CONTROL_POINTS.map((pt, idx) => (
                  <div
                    key={pt.number}
                    onClick={() => setActivePoint(idx)}
                    className={`flex items-start gap-4 p-3 rounded-2xl transition-all cursor-pointer ${
                      activePoint === idx ? 'bg-black/5 ring-1 ring-black/10' : 'hover:bg-black/[0.02]'
                    }`}
                  >
                    <span className="text-xs font-mono font-black text-[#859900] pt-0.5">
                      {pt.number}
                    </span>
                    <div className="space-y-1">
                      <h5 className="text-sm sm:text-base font-black text-[#1C1D1B] font-sans">
                        {pt.title}
                      </h5>
                      <p className="text-xs text-[#525252] leading-relaxed">
                        {pt.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TwoWayCashFlowSection;
