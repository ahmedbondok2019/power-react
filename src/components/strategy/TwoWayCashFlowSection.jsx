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

// Monthly Cash Flow Milestones Data
const CASH_FLOW_DATA = [
  { month: 'المرحلة 1', planned: 20, actual: 18 },
  { month: 'المرحلة 2', planned: 35, actual: 30 },
  { month: 'المرحلة 3', planned: 28, actual: 26 },
  { month: 'المرحلة 4', planned: 48, actual: 42 },
  { month: 'المرحلة 5', planned: 40, actual: 38 },
  { month: 'المرحلة 6', planned: 62, actual: 55 },
  { month: 'المرحلة 7', planned: 52, actual: 48 }
];

const CONTROL_POINTS = [
  {
    number: '01',
    title: 'Planned Cash Flow',
    subtitle: 'Link financial planning to project milestones.'
  },
  {
    number: '02',
    title: 'Actual Cash Flow',
    subtitle: 'Monitor real movement and identify deviations.'
  },
  {
    number: '03',
    title: 'Decision Support',
    subtitle: 'Use live insight to support project decisions.'
  }
];

// Custom Tooltip matching Dark Engineering Aesthetic
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#121613]/95 border border-[#D4E128]/40 rounded-xl p-3 shadow-xl backdrop-blur-md text-right text-white space-y-1.5 min-w-[170px]" dir="rtl">
        <div className="font-bold text-[11px] text-[#D4E128] border-b border-white/10 pb-1 font-mono">
          {data.month}
        </div>
        <div className="space-y-0.5 text-[11px]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-white/60">المخطط (Planned):</span>
            <span className="font-mono font-bold text-[#D4E128]">{data.planned}M ر.س</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-white/60">الفعلي (Actual):</span>
            <span className="font-mono font-bold text-[#38BDF8]">{data.actual}M ر.س</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Dots with Neon Colors
const CustomizedPlannedDot = (props) => {
  const { cx, cy } = props;
  if (cx === undefined || cy === undefined) return null;
  return (
    <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="none">
      <circle cx="5" cy="5" r="4" fill="#D4E128" stroke="#1C3322" strokeWidth="1.5" />
    </svg>
  );
};

const CustomizedActualDot = (props) => {
  const { cx, cy } = props;
  if (cx === undefined || cy === undefined) return null;
  return (
    <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="none">
      <circle cx="4" cy="4" r="3.5" fill="#38BDF8" stroke="#1C3322" strokeWidth="1.5" />
    </svg>
  );
};

const TwoWayCashFlowSection = () => {
  const [activePoint, setActivePoint] = useState(0);

  return (
    <section 
      id="تحليل-التدفق-النقدي"
      className="relative w-full bg-[#111312] text-white py-16 sm:py-20 overflow-hidden select-none border-b border-white/5"
      dir="rtl"
    >
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#D4E128]/5 rounded-full blur-[160px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#2A352F]/30 rounded-full blur-[160px] pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header & Strategic Context (Exact text from design) */}
        <div className="mb-10 sm:mb-14 text-right space-y-4 max-w-4xl">
          <SectionTitle title="تحليل التدفق النقدي ذو الاتجاهين" theme="dark" />

          <div className="space-y-3 text-white/80 text-xs sm:text-sm lg:text-base leading-relaxed font-medium">
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

        {/* Scaled-down Compact White/Cream Dashboard Container */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#F6F6F2] p-5 sm:p-7 md:p-8 text-[#1C1D1B] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center" dir="ltr">

            {/* Left Column in LTR: Control Points List (Cols 1-5) */}
            <div className="lg:col-span-5 text-left space-y-4">
              <div className="border-b border-black/10 pb-2.5">
                <h4 className="text-xs sm:text-sm font-black font-sans tracking-widest text-[#1C1D1B] uppercase">
                  CONTROL POINTS
                </h4>
              </div>

              {/* 3 Compact Control Points Items */}
              <div className="space-y-2.5">
                {CONTROL_POINTS.map((pt, idx) => (
                  <div
                    key={pt.number}
                    onClick={() => setActivePoint(idx)}
                    className={`flex items-start gap-3 p-3 rounded-2xl transition-all cursor-pointer ${
                      activePoint === idx ? 'bg-black/5 ring-1 ring-black/10' : 'hover:bg-black/[0.02]'
                    }`}
                  >
                    <span className="text-[11px] font-mono font-black text-[#859900] pt-0.5">
                      {pt.number}
                    </span>
                    <div className="space-y-0.5">
                      <h5 className="text-xs sm:text-sm font-black text-[#1C1D1B] font-sans">
                        {pt.title}
                      </h5>
                      <p className="text-[11px] text-[#525252] leading-snug">
                        {pt.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column in LTR: Compact Dark Green Cash Flow Line Chart Box (Cols 6-12) */}
            <div className="lg:col-span-7 bg-[#1C3322] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-[#D4E128]/20 flex flex-col justify-between min-h-[250px] sm:min-h-[280px]">
              
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-2.5">
                <div>
                  <h4 className="text-xs font-black font-mono tracking-widest text-[#D4E128] uppercase">
                    PROJECT CASH FLOW
                  </h4>
                  <p className="text-[9px] sm:text-[10px] font-mono text-white/60 tracking-wider mt-0.5">
                    PLANNED / ACTUAL / COMMITTED
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4E128]" />
                    <span className="text-white/80">Planned</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                    <span className="text-white/80">Actual</span>
                  </div>
                </div>
              </div>

              {/* Scaled Down Compact Line Chart */}
              <div className="w-full h-[170px] sm:h-[190px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={CASH_FLOW_DATA}
                    margin={{ top: 15, right: 15, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255, 255, 255, 0.08)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="rgba(255, 255, 255, 0.4)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 9, fontFamily: 'monospace' }}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 80]}
                      ticks={[0, 20, 40, 60, 80]}
                      stroke="rgba(255, 255, 255, 0.4)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 9, fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Line 1: Planned Cash Flow */}
                    <Line
                      type="linear"
                      dataKey="planned"
                      name="Planned"
                      stroke="#D4E128"
                      strokeWidth={2.5}
                      dot={<CustomizedPlannedDot />}
                      activeDot={{ r: 5, fill: '#D4E128', stroke: '#1C3322', strokeWidth: 2 }}
                    />

                    {/* Line 2: Actual Cash Flow */}
                    <Line
                      type="linear"
                      dataKey="actual"
                      name="Actual"
                      stroke="#38BDF8"
                      strokeWidth={2}
                      dot={<CustomizedActualDot />}
                      activeDot={{ r: 5, fill: '#38BDF8', stroke: '#1C3322', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TwoWayCashFlowSection;
