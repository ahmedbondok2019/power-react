import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  UserX,
  HandMetal,
  HeartHandshake,
  Users,
  MessageSquareWarning,
  CheckCircle2,
  FileText,
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '../ui/accordion';

const POLICIES_DATA = [
  {
    id: 'anti-corruption',
    title: 'سياسة مكافحة الفساد',
    titleEn: 'Anti-Corruption & Bribery Policy',
    icon: ShieldCheck,
    badge: 'النزاهة والامتثال',
    summary: 'تلتزم مجموعة باور التزاماً صارماً بأعلى معايير الشفافية والنزاهة، مع حظر قاطع لكافة أشكال الرشوة والاحتيال وتضارب المصالح في جميع تعاملاتنا.',
    points: [
      'الامتثال الكامل للأنظمة واللوائح الوطنية لمكافحة الفساد (هيئة نزاهة) والمعايير الدولية (ISO 37001).',
      'حظر تام لتقديم أو قبول أي رشى أو هدايا عينية أو تسهيلات مالية غير مشروعة للتأثير على القرارات.',
      'توفير قناة إبلاغ سرية ومحمية تماماً (Whistleblowing) تضمن عدم تعرض المبلغين لأي مساءلة أو تداعيات.',
      'إجراء عمليات تدقيق مالي وإداري دورية مستقلة لكافة العمليات وسلاسل التوريد والتعاقدات.'
    ],
    governanceCode: 'GOV-POL-01'
  },
  {
    id: 'child-labor',
    title: 'سياسة عمل الأطفال',
    titleEn: 'Child Labor Prohibition Policy',
    icon: UserX,
    badge: 'حماية الطفولة وحقوق الإنسان',
    summary: 'نحظر بشكل قاطع تشغيل الأطفال أو من هم دون السن القانوني في كافة مواقع العمل، المشاريع، وسلاسل الإمداد والشركاء المتعاقدين.',
    points: [
      'الالتزام الصارم بمعايير منظمة العمل الدولية (ILO) ونظام العمل والعمال في المملكة العربية السعودية.',
      'التحقق الإلزامي من الهويات الرسمية ووثائق السن لكافة العاملين قبل الالتحاق بالعمل.',
      'إلزام كافة المقاولين من الباطن والموردين ببنود تعاقدية صارمة تمنع عمالة الأطفال تحت طائلة فسخ التعاقد الفوري.',
      'جولات تفتيشية دورية ومفاجئة على كافة المنشآت ومواقع المشاريع لضمان الامتثال التام.'
    ],
    governanceCode: 'GOV-POL-02'
  },
  {
    id: 'anti-slavery',
    title: 'سياسة مكافحة العبودية والاتجار بالبشر',
    titleEn: 'Anti-Slavery & Human Trafficking Policy',
    icon: HandMetal,
    badge: 'الكرامة الإنسانية والعمل اللائق',
    summary: 'نرفض ونكافح كافة ممارسات العمل الجبري، السخرة، واحتجاز الوثائق، مع ضمان توفير بيئة عمل كريمة وعادلة تحفظ حرية وحقوق جميع العاملين.',
    points: [
      'حظر احتجاز جوازات السفر أو الوثائق الرسمية للعمال، مع ضمان حرية التنقل والمغادرة وفق الأنظمة.',
      'صرف الأجور بانتظام عبر نظام حماية الأجور الرسمي (WPS) ومطابقة العقود بكافة اللغات المعتمدة.',
      'توفير مجمعات سكنية عصرية تلتزم بأعلى معايير السلامة والصحة والراحة والكرامة المعيشية.',
      'حظر فرض أي رسوم استقدام أو توظيف على العمال، وتحمل الشركة لكافة تكاليف التعيين القانونية.'
    ],
    governanceCode: 'GOV-POL-03'
  },
  {
    id: 'workplace-harassment',
    title: 'سياسة التحرش في مكان العمل',
    titleEn: 'Workplace Harassment & Anti-Bullying Policy',
    icon: HeartHandshake,
    badge: 'بيئة عمل آمنة ومحترمة',
    summary: 'نلتزم بتوفير بيئة عمل مهنية آمنة، عادلة ومحترمة، خالية تماماً من كافة مظاهر التحرش اللفظي، الجسدي، النفسي أو التنمر والتمييز.',
    points: [
      'سياسة عدم التسامح المطلق (Zero-Tolerance) تجاه أي سلوك ينتهك الكرامة أو يسبب الإيذاء النفسي والمهني.',
      'لجنة تحقيق مستقلة ومحايدة تتولى فحص الشكاوى بسرية تامة وتطبيق الإجراءات الانضباطية والقانونية الرادعة.',
      'حماية كاملة للضحايا والشهود من أي تصرفات انتقامية أو مضايقات أثناء أو بعد التحقيق.',
      'برامج توعية وتدريب دورية لترسيخ الاحترام المتبادل وثقافة بيئة العمل الإيجابية.'
    ],
    governanceCode: 'GOV-POL-04'
  },
  {
    id: 'diversity-inclusion',
    title: 'سياسة المساواة والتنوع والشمول',
    titleEn: 'Equality, Diversity & Inclusion Policy',
    icon: Users,
    badge: 'تكافؤ الفرص وتمكين الكفاءات',
    summary: 'نؤمن بأن تنوع فريق العمل هو جوهر تميزنا، ونلتزم بتحقيق العدالة وتكافؤ الفرص في التوظيف والترقية والتدريب دون أي تمييز.',
    points: [
      'اعتماد معايير الكفاءة، الجدارة والأداء فقط في قرارات التعيين، التقييم والترقيات.',
      'دعم وتمكين الكفاءات الوطنية السعودية تماشياً مع رؤية المملكة 2030 وبرامج التوطين النوعي.',
      'تعزيز مشاركة المرأة وتمكينها في المناصب القيادية والميدانية والهندسية المتخصصة.',
      'توفير بيئة عمل ملائمة وشاملة تدعم أصحاب الهمم وتهيئ لهم كافة التجهيزات الميسرة.'
    ],
    governanceCode: 'GOV-POL-05'
  },
  {
    id: 'customer-complaints',
    title: 'سياسة إدارة شكاوى العملاء',
    titleEn: 'Customer Complaints Management Policy',
    icon: MessageSquareWarning,
    badge: 'جودة الخدمة ورضا العملاء',
    summary: 'نظام حوكمة متطور وموثق لاستقبال شكاوى وملاحظات العملاء والشركاء، ومعالجتها بشفافية وسرعة لضمان أعلى مستويات الرضا والجودة.',
    points: [
      'منصة رقمية موحدة تتيح تسجيل الشكوى وتتبع مسارها إلكترونياً وتزويد العميل برقم مرجعي مباشر.',
      'التزام بأطر زمنية محددة (SLA) للاستجابة المبدئية خلال 24 ساعة والحل الجذري خلال 3 أيام عمل.',
      'تحليل الأسباب الجذرية لكل شكوى لتحسين العمليات والخدمات ومنع تكرار أي خلل تشغيلي.',
      'استطلاعات رأي دورية لقياس رضا العملاء عن طريقة التعامل مع ملاحظاتهم وحلها.'
    ],
    governanceCode: 'GOV-POL-06'
  }
];

const OurPoliciesSection = () => {
  return (
    <section
      id="سياستنا"
      className="relative w-full bg-[#141615] text-white py-20 lg:py-28 overflow-hidden select-none"
      dir="rtl"
    >
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FFB800]/5 rounded-full blur-[160px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] bg-[#2A352F]/30 rounded-full blur-[160px] pointer-events-none -z-0" />
      <div className="absolute -top-10 left-1/3 w-[300px] h-[300px] bg-[#FFB800]/5 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Section Header with Standard SectionTitle */}
        <div className="flex flex-col items-start w-full mb-10 sm:mb-12">
          <SectionTitle title="سياستنا" theme="dark" />
        </div>

        {/* Content Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full mb-12 sm:mb-14"
        >
          <p className="text-white/80 text-lg sm:text-xl lg:text-[22px] font-medium leading-[2.2]">
            نلتزم في <span className="text-[#FFB800] font-bold">مجموعة باور</span> بأعلى معايير الحوكمة والنزاهة المؤسسية والمسؤولية الاجتماعية، لضمان بيئة عمل آمنة، عادلة وموثوقة لكافة شركائنا وعملائنا ومنسوبينا.
          </p>
        </motion.div>

        {/* Accordion Component List */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {POLICIES_DATA.map((policy, idx) => {
              const IconComponent = policy.icon;
              return (
                <AccordionItem
                  key={policy.id}
                  value={policy.id}
                  className="rounded-2xl sm:rounded-3xl bg-white text-[#141615] border border-white/20 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#FFB800]/40"
                >
                  <AccordionTrigger className="hover:no-underline py-5 sm:py-6 px-6 sm:px-8">
                    <div className="flex items-center gap-3 sm:gap-4 text-right">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FFB800]/15 text-[#B45309] flex items-center justify-center shrink-0 border border-[#FFB800]/30 shadow-inner">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#141615]" />
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-lg sm:text-xl lg:text-2xl font-black text-[#141615]">
                          {policy.title}
                        </span>
                        <span className="text-xs sm:text-sm text-[#4B5563] font-medium mt-0.5">
                          {policy.badge} • <span className="font-mono text-xs">{policy.governanceCode}</span>
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="text-[#374151] pt-4 pb-8 px-6 sm:px-8">
                    {/* Policy Summary */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] mb-6">
                      <p className="text-sm sm:text-base text-[#1F2937] leading-relaxed font-semibold">
                        {policy.summary}
                      </p>
                    </div>

                    {/* Key Policy Clauses / Points */}
                    <div className="mb-6">
                      <h4 className="text-xs sm:text-sm font-extrabold text-[#111827] uppercase tracking-wider mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />
                        <span>أبرز البنود والالتزامات التشغيلية:</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {policy.points.map((point, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-sm hover:border-[#FFB800]/50 transition-colors"
                          >
                            <span className="flex h-2 w-2 rounded-full bg-[#FFB800] mt-2 shrink-0" />
                            <span className="text-xs sm:text-sm text-[#374151] font-medium leading-relaxed">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Meta & Whistleblower / Compliance Footer */}
                    <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-[#6B7280]">
                      <div className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-[#FFB800]" />
                        <span>تخضع هذه السياسة للمراجعة السنوية من قبل لجنة الحوكمة والامتثال</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#141615] text-white px-3 py-1 rounded-full text-xs font-bold">
                          معتمد ومفعّل
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>

      </div>
    </section>
  );
};

export default OurPoliciesSection;
