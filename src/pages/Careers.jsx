import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import JobApplicationDrawer from '../components/careers/JobApplicationDrawer';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Briefcase,
  MapPin,
  Clock,
  Search,
  Filter,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Users,
  Award,
  ShieldCheck,
  TrendingUp,
  Send,
  Building2,
  GraduationCap
} from 'lucide-react';

const CAREERS_OPENINGS_AR = [
  {
    id: 'mep-project-manager',
    title: 'مدير مشروع كهروميكانيكي (MEP Project Manager)',
    department: 'إدارة المشاريع الكهروميكانيكية',
    category: 'إدارة المشاريع',
    location: 'الرياض، المملكة العربية السعودية',
    type: 'دوام كامل (ميداني)',
    experience: '8 - 12 سنة',
    education: 'بكالوريوس هندسة ميكانيكية أو كهربائية',
    postedAt: 'منذ يومين',
    shortDescription: 'قيادة وإدارة تنفيذ الأعمال الكهروميكانيكية المتكاملة في المشاريع الكبرى والتنسيق مع الاستشاري والمقاولين المعتمدين.',
    responsibilities: [
      'الإشراف الميداني الشامل على تنفيذ شبكات التكييف المركزي، مكافحة الحريق، والشبكات الكهربائية.',
      'إدارة الجدول الزمني للمشروع وضبط التكاليف والجودة وفق المعايير المعتمدة.',
      'التنسيق والتكامل الفني مع مهندسي الـ BIM لحل التعارضات قبل التنفيذ.',
      'إعداد التقارير الفنية الدورية وإدارة الاجتماعات مع ممثلي المالك والاستشاريين.'
    ],
    requirements: [
      'خبرة لا تقل عن 8 سنوات في مشاريع المقاولات الكبرى والأبراج والمستشفيات.',
      'إجادة تامة لكود البناء السعودي (SBC) والمواصفات الدولية (NFPA, ASHRAE, SMACNA).',
      'شهادة إدارة المشاريع الاحترافية (PMP) ميزة إضافية قوية.',
      'إتقان اللغة الإنجليزية تحدثاً وكتابة.'
    ]
  },
  {
    id: 'hvac-senior-engineer',
    title: 'مهندس أول تكييف وتهوية (Senior HVAC Engineer)',
    department: 'الهندسة الميكانيكية والتكييف',
    category: 'الهندسة والتصميم',
    location: 'جدة، المملكة العربية السعودية',
    type: 'دوام كامل',
    experience: '5 - 8 سنوات',
    education: 'بكالوريوس هندسة ميكانيكية',
    postedAt: 'منذ 3 أيام',
    shortDescription: 'تصميم وحساب أحمال التكييف المركزي، واختيار الشيلرات ووحدات AHU، والإشراف على شبكات مجاري الهواء وتوازن الضغوط.',
    responsibilities: [
      'حسابات الأحمال الحرارية واختيار أنظمة التبريد بالمياه المثلجة (Chilled Water) و VRF.',
      'مراجعة المخططات التنفيذية لشبكات مجاري الهواء (Ductwork) وفق مواصفات SMACNA.',
      'متابعة أعمال الفحص والاستلام الهندسي واختبارات الـ TAB للمشروع.',
      'التأكد من تحقيق أعلى كفاءة لاستهلاك الطاقة ومطابقة مواصفات SASO.'
    ],
    requirements: [
      'خبرة مثبتة لا تقل عن 5 سنوات في التكييف المركزي والمحطات المركزية.',
      'إتقان العمل على برامج HAP, AutoCAD, Revit MEP.',
      'معرفة متقدمة في حسابات فقد الضغط ومخمدات الحريق والدخان.',
      'عضوية الهيئة السعودية للمهندسين.'
    ]
  },
  {
    id: 'civil-site-engineer',
    title: 'مهندس موقع مدني وإنشائي (Civil Site Engineer)',
    department: 'المقاولات العامة والإنشاءات',
    category: 'الهندسة والتصميم',
    location: 'الدمام، المملكة العربية السعودية',
    type: 'دوام كامل (ميداني)',
    experience: '4 - 7 سنوات',
    education: 'بكالوريوس هندسة مدنية',
    postedAt: 'منذ 4 أيام',
    shortDescription: 'الإشراف على تنفيذ الأعمال الإنشائية والخرسانية، والهياكل الفولاذية، ومطابقة التنفيذ مع المخططات المعتمدة.',
    responsibilities: [
      'متابعة صب الخرسانات المسلحة واختبارات الجودة وضبط استواء الأرضيات.',
      'استلام حديد التسليح وأعمال العزل المائي والحراري وفق أصول الصنعة.',
      'التنسيق اليومي مع فرق الأعمال الكهروميكانيكية لتحديد فتحات التمرير (Sleeves).',
      'الالتزام الصارم بتطبيق معايير السلامة والصحة المهنية (HSE) في الموقع.'
    ],
    requirements: [
      'خبرة ميدانية لا تقل عن 4 سنوات في المنشآت الصناعية والمباني السكنية.',
      'القدرة العالية على قراءة المخططات الهندسية المعقدة واكتشاف التناقضات.',
      'مهارات تواصل وإدارة فرق العمل والعمالة الميدانية بكفاءة.',
      'عضوية معتمدة من الهيئة السعودية للمهندسين.'
    ]
  },
  {
    id: 'bim-mep-coordinator',
    title: 'منسق نمذجة معلومات البناء (BIM MEP Coordinator)',
    department: 'المكتب الفني والتصميم الرقمي',
    category: 'المكتب الفني و BIM',
    location: 'الرياض، المملكة العربية السعودية',
    type: 'دوام كامل (مكتبي / هجين)',
    experience: '3 - 6 سنوات',
    education: 'بكالوريوس هندسة ميكانيكية أو كهربائية أو معمارية',
    postedAt: 'منذ أسبوع',
    shortDescription: 'بناء النماذج الرقمية ثلاثية الأبعاد LOD 400 واستخراج المخططات التنفيذية وإجراء كشف التعارضات (Clash Detection).',
    responsibilities: [
      'تطوير وتنسيق نماذج Revit لكافة شبكات الـ MEP والمقاولات العامة.',
      'إجراء جلسات كشف وحل التعارضات باستخدام Navisworks وإعداد تقارير BCF.',
      'استخراج المخططات التنفيذية (Shop Drawings) ومخططات كما نُفذ (As-Built).',
      'استخراج كميات المواد بدقة عالية للمساهمة في حصر الكميات والمشتريات.'
    ],
    requirements: [
      'إتقان تام لحزمة Autodesk (Revit, Navisworks, BIM 360).',
      'فهم عميق لتفاصيل تمديد الخدمات وتنسيق المسارات في الأسقف والمساقط الرأسية.',
      'القدرة على العمل تحت الضغط والالتزام بالجداول الزمنية للمكتب الفني.'
    ]
  },
  {
    id: 'qa-qc-inspector-mep',
    title: 'مفتش جودة وضبط أعمال (QA/QC MEP Inspector)',
    department: 'إدارة الجودة والامتثال الفني',
    category: 'الجودة والسلامة',
    location: 'نيوم، المملكة العربية السعودية',
    type: 'دوام كامل (ميداني)',
    experience: '5 - 8 سنوات',
    education: 'دبلوم أو بكالوريوس هندسة',
    postedAt: 'منذ أسبوع',
    shortDescription: 'فحص وتدقيق كافة التمديدات الميكانيكية والكهربائية والتأكد من مطابقتها لمواصفات المشروع وكود البناء السعودي.',
    responsibilities: [
      'إجراء الفحوصات الميدانية (Inspection Requests - WIR) مع استشاري المشروع.',
      'فحص المواد الموردة للموقع والتأكد من مطابقتها للاعتمادات الفنية (MIR).',
      'إصدار ومتابعة تقارير عدم المطابقة (NCR) والتأكد من تصحيح الملاحظات فوراً.',
      'حفظ وتوثيق سجلات الجودة والاختبارات الهيدروستاتيكية واختبارات الجهد الكهربائي.'
    ],
    requirements: [
      'خبرة في إدارة الجودة وتطبيق اشتراطات ISO 9001 في المقاولات.',
      'دقة ملاحظة عالية وإلمام تام بكودات البناء والمعايير القياسية.',
      'شهادات مهنية في فحص الجودة ميزة تفضيلية.'
    ]
  },
  {
    id: 'safety-officer-hse',
    title: 'مسؤول سلامة وصحة مهنية (HSE Safety Officer)',
    department: 'إدارة السلامة والصحة المهنية',
    category: 'الجودة والسلامة',
    location: 'الرياض، المملكة العربية السعودية',
    type: 'دوام كامل (ميداني)',
    experience: '3 - 6 سنوات',
    education: 'دبلوم أو بكالوريوس مع شهادة نيبوش (NEBOSH)',
    postedAt: 'منذ أسبوعين',
    shortDescription: 'تأمين بيئة عمل آمنة خالية من الحوادث ومراقبة تطبيق اشتراطات الوقاية والسلامة في مواقع المشاريع النشطة.',
    responsibilities: [
      'تنفيذ جولات التفتيش اليومية وتقييم المخاطر (Risk Assessment) قبل بدء الأعمال.',
      'إجراء اجتماعات السلامة الصباحية (Toolbox Talks) وتدريب الكوادر الميدانية.',
      'التأكد من ارتداء معدات الوقاية الشخصية (PPE) واستيفاء تصاريح العمل (PTW).',
      'مراقبة إجراءات الحماية من السقوط وسلامة السقالات وتجهيزات الإطفاء الميدانية.'
    ],
    requirements: [
      'شهادة NEBOSH IGC أو IOSH معتمدة.',
      'خبرة ميدانية موثقة في مواقع الإنشاءات الكبرى والمشاريع الحيوية.',
      'سرعة البديهة والقدرة على التدخل الفوري في حالات الطوارئ.'
    ]
  }
];

const CAREERS_OPENINGS_EN = [
  {
    id: 'mep-project-manager',
    title: 'MEP Project Manager',
    department: 'MEP Project Management',
    category: 'Project Management',
    location: 'Riyadh, Saudi Arabia',
    type: 'Full-time (On-site)',
    experience: '8 - 12 Years',
    education: 'B.Sc. Mechanical or Electrical Engineering',
    postedAt: '2 days ago',
    shortDescription: 'Leading and overseeing execution of turnkey MEP works across major projects and managing relationships with approved consultants and contractors.',
    responsibilities: [
      'Full on-site supervision of central HVAC, fire fighting, and electrical network installations.',
      'Project scheduling, cost control, and quality compliance with certified standards.',
      'Technical coordination with BIM engineers to resolve clashes prior to site execution.',
      'Periodic progress reporting and chairing technical coordination meetings with client representatives.'
    ],
    requirements: [
      'Minimum 8 years of experience in mega contracting, towers, and healthcare projects.',
      'Full proficiency in Saudi Building Code (SBC) and international standards (NFPA, ASHRAE, SMACNA).',
      'PMP credential is a strong advantage.',
      'Fluency in spoken and written English.'
    ]
  },
  {
    id: 'hvac-senior-engineer',
    title: 'Senior HVAC Engineer',
    department: 'Mechanical & HVAC Engineering',
    category: 'Engineering & Design',
    location: 'Jeddah, Saudi Arabia',
    type: 'Full-time',
    experience: '5 - 8 Years',
    education: 'B.Sc. Mechanical Engineering',
    postedAt: '3 days ago',
    shortDescription: 'Central HVAC load calculations, equipment selection (chillers, AHUs), and supervision of duct networks and air pressure balancing.',
    responsibilities: [
      'Thermal load calculations and selection of chilled water and VRF cooling systems.',
      'Shop drawing review for ductwork fabrication adhering to SMACNA standards.',
      'Site inspections, technical testing, and TAB commissioning for project handovers.',
      'Ensuring maximum energy efficiency and SASO compliance.'
    ],
    requirements: [
      'Minimum 5 years of proven experience in central HVAC and plant rooms.',
      'Proficiency in HAP, AutoCAD, and Revit MEP.',
      'Advanced knowledge of pressure loss calculations and fire dampers.',
      'Saudi Council of Engineers (SCE) accreditation.'
    ]
  },
  {
    id: 'civil-site-engineer',
    title: 'Civil Site Engineer',
    department: 'General Contracting & Construction',
    category: 'Engineering & Design',
    location: 'Dammam, Saudi Arabia',
    type: 'Full-time (On-site)',
    experience: '4 - 7 Years',
    education: 'B.Sc. Civil Engineering',
    postedAt: '4 days ago',
    shortDescription: 'Supervising structural and concrete execution, steel framing, and verifying compliance against approved engineering drawings.',
    responsibilities: [
      'Monitoring reinforced concrete pouring, quality testing, and flooring level checks.',
      'Inspecting rebar placement, waterproofing, and thermal insulation as per industry best practices.',
      'Daily coordination with MEP teams for builder’s work and service penetrations (sleeves).',
      'Strict enforcement of occupational health and safety (HSE) on-site.'
    ],
    requirements: [
      'Minimum 4 years of field experience in industrial and residential structures.',
      'Exceptional blueprint reading and discrepancy resolution skills.',
      'Strong leadership, team coordination, and on-site communication skills.',
      'SCE accreditation.'
    ]
  },
  {
    id: 'bim-mep-coordinator',
    title: 'BIM MEP Coordinator',
    department: 'Technical Office & Digital Design',
    category: 'Technical Office & BIM',
    location: 'Riyadh, Saudi Arabia',
    type: 'Full-time (Office / Hybrid)',
    experience: '3 - 6 Years',
    education: 'B.Sc. Mechanical / Electrical / Architectural Engineering',
    postedAt: '1 week ago',
    shortDescription: 'Developing LOD 400 3D models, extracting shop drawings, and performing Navisworks clash detection and resolution.',
    responsibilities: [
      'Creating and coordinating Revit models for all MEP disciplines and general contracting.',
      'Hosting clash detection sessions using Navisworks and issuing BCF resolution reports.',
      'Extracting shop drawings and As-Built drawings with exact spatial accuracy.',
      'Generating precise Bill of Quantities (BOQ) to assist procurement.'
    ],
    requirements: [
      'Mastery of Autodesk suite (Revit, Navisworks, BIM 360).',
      'Deep understanding of service routing, ceiling voids, and vertical risers.',
      'Ability to deliver high-quality outputs under tight technical deadlines.'
    ]
  },
  {
    id: 'qa-qc-inspector-mep',
    title: 'QA/QC MEP Inspector',
    department: 'Quality Management & Compliance',
    category: 'Quality & Safety',
    location: 'NEOM, Saudi Arabia',
    type: 'Full-time (On-site)',
    experience: '5 - 8 Years',
    education: 'Engineering Diploma or B.Sc.',
    postedAt: '1 week ago',
    shortDescription: 'Inspecting and auditing mechanical and electrical installations to guarantee total compliance with project specs and the Saudi Building Code.',
    responsibilities: [
      'Conducting Work Inspection Requests (WIR) alongside project consultants.',
      'Inspecting material deliveries and verifying Material Inspection Requests (MIR).',
      'Issuing and closing Non-Conformance Reports (NCR) promptly.',
      'Documenting QA/QC records, hydrostatic test logs, and electrical insulation tests.'
    ],
    requirements: [
      'Proven quality management experience with ISO 9001 contracting standards.',
      'High attention to detail and thorough understanding of SBC codes.',
      'Professional QA/QC certifications are preferred.'
    ]
  },
  {
    id: 'safety-officer-hse',
    title: 'HSE Safety Officer',
    department: 'Occupational Health & Safety',
    category: 'Quality & Safety',
    location: 'Riyadh, Saudi Arabia',
    type: 'Full-time (On-site)',
    experience: '3 - 6 Years',
    education: 'Diploma / B.Sc. with NEBOSH Certification',
    postedAt: '2 weeks ago',
    shortDescription: 'Fostering a zero-incident work environment and monitoring safety standards across active construction and MEP job sites.',
    responsibilities: [
      'Daily site hazard assessments and Job Safety Analysis (JSA) before commencing work.',
      'Leading morning Toolbox Talks and training site workforce on safety procedures.',
      'Ensuring 100% PPE compliance and enforcing Permit to Work (PTW) protocols.',
      'Inspecting scaffolding safety, fall prevention systems, and fire protection equipment.'
    ],
    requirements: [
      'Valid NEBOSH IGC or IOSH certification.',
      'Documented field experience in major construction projects.',
      'Quick response and crisis management agility.'
    ]
  }
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { t, lang } = useLanguage();
  const allCategoryLabel = lang === 'ar' ? 'الكل' : 'All';

  const openings = lang === 'en' ? CAREERS_OPENINGS_EN : CAREERS_OPENINGS_AR;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter Categories
  const categories = useMemo(() => {
    const set = new Set();
    openings.forEach((job) => set.add(job.category));
    return [allCategoryLabel, ...Array.from(set)];
  }, [openings, allCategoryLabel]);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return openings.filter((job) => {
      const matchCategory =
        !selectedCategory ||
        selectedCategory === allCategoryLabel ||
        selectedCategory === 'الكل' ||
        selectedCategory === 'All' ||
        job.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [openings, selectedCategory, searchQuery, allCategoryLabel]);

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#FFB800] selection:text-black">
      {/* ── Careers Hero Section ── */}
      <Hero
        id="careers-hero"
        badge={t.careers.heroBadge}
        title={
          <span className="whitespace-pre-line">{t.careers.heroTitle}</span>
        }
        subtitle={
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl text-right font-medium">
            {t.careers.heroSubtitle}
          </p>
        }
        buttonText={t.careers.openPositions}
        buttonLink="#openings-section"
        bgImage="/projects-hero-bg.jpg"
        showVisionLogo={false}
        showStatsCards={true}
        stats={[
          { number: CAREERS_OPENINGS.length, label: lang === 'ar' ? 'وظائف شاغرة حالياً' : 'Open Positions' },
          { number: 100, label: lang === 'ar' ? 'بيئة عمل هندسية محفزة' : 'Engineering Work Environment' },
          { number: 16, label: t.projects.years }
        ]}
      />


      {/* ── Why Work With Us (Value Pillars) ── */}
      <section className="relative pt-60 sm:pt-64 pb-20 bg-[#141615] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-start mb-14 sm:mb-16">
            <SectionTitle title={lang === 'ar' ? "لماذا تختار العمل معنا في باور؟" : "Why Choose a Career at Power?"} theme="dark" />
            <p className="text-white/70 text-sm sm:text-base mt-3 max-w-2xl">
              {lang === 'ar' ? "نؤمن بأن رأسمالنا البشري هو محرك نجاحنا الأساسي، ونلتزم بتمكين فرقنا وتزويدهم بأفضل التقنيات والممارسات العالمية." : "We believe our human capital is the primary engine of our success, and we are committed to empowering our teams with modern tools and global standards."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-7 rounded-3xl bg-[#1A1D1B] border border-white/10 hover:border-[#FFB800]/40 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">{lang === 'ar' ? "مشاريع استراتيجية كبرى" : "Major Strategic Projects"}</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {lang === 'ar' ? "فرصة العمل المباشر في أضخم المشاريع التنموية والصناعية الداعمة لمستهدفات رؤية المملكة 2030." : "Direct exposure to monumental development and industrial projects aligned with Saudi Vision 2030."}
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#1A1D1B] border border-white/10 hover:border-[#FFB800]/40 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">{lang === 'ar' ? "تطوير مهني ومستمر" : "Continuous Professional Growth"}</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {lang === 'ar' ? "برامج تدريبية وتأهيلية مستمرة لمواكبة أحدث تقنيات الـ BIM وكود البناء السعودي وأنظمة التكييف المتقدمة." : "Ongoing training and development to master modern BIM workflows, SBC building codes, and advanced MEP engineering."}
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#1A1D1B] border border-white/10 hover:border-[#FFB800]/40 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">{lang === 'ar' ? "بيئة احترافية متكاملة" : "Professional Work Culture"}</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {lang === 'ar' ? "ثقافة عمل مبنية على الشفافية والتقدير، وتوفير بيئة عمل آمنة وعادلة تراعي أعلى معايير السلامة المهنية." : "A culture rooted in transparency, meritocracy, and rigorous occupational health and safety standards."}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Open Positions Section ── */}
      <section id="openings-section" className="py-20 bg-[#111312] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header & Live Search Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="text-start">
              <div className="flex items-center gap-2 justify-start mb-2 text-[#FFB800] text-sm font-bold tracking-wider">
                <span className="w-8 h-[2px] bg-[#FFB800] rounded-full inline-block" />
                <span>{lang === 'ar' ? "فرص العمل المتاحة" : "Available Opportunities"}</span>
              </div>
              <SectionTitle title={lang === 'ar' ? "الوظائف الشاغرة حالياً" : "Current Open Positions"} theme="dark" />
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder={lang === 'ar' ? "ابحث بالمسمى أو المجال..." : "Search by title or department..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1D1B] border border-white/10 rounded-full py-3.5 rtl:pr-12 rtl:pl-4 ltr:pl-12 ltr:pr-4 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#FFB800] transition-colors"
              />
              <Search className="w-5 h-5 text-white/40 absolute rtl:right-4 ltr:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Categories Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#FFB800] text-black shadow-[0_0_20px_rgba(255,184,0,0.35)] scale-105'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Job Listings Grid */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#171918] border border-white/10 hover:border-[#FFB800]/50 transition-all duration-300 shadow-xl group flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Left (RTL Right): Job Info & Meta */}
                  <div className="space-y-4 max-w-3xl text-right">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/25 text-xs font-bold">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 text-xs">
                        {job.postedAt}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFB800] transition-colors leading-tight">
                        {job.title}
                      </h3>
                      <p className="text-sm text-white/75 mt-2 leading-relaxed">
                        {job.shortDescription}
                      </p>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 pt-1 font-medium">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#FFB800]" />
                        <span>{job.location}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#FFB800]" />
                        <span>{job.type}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-[#FFB800]" />
                        <span>{job.experience}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#FFB800]" />
                        <span>{job.education}</span>
                      </span>
                    </div>

                    {/* Highlights bullet preview */}
                    <div className="pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                        {job.responsibilities.slice(0, 2).map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB800] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right (RTL Left): Apply Button */}
                  <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                    <button
                      onClick={() => handleOpenApply(job)}
                      className="px-8 py-3.5 rounded-2xl bg-[#FFB800] hover:bg-[#EAB308] text-black font-extrabold text-sm transition-all duration-300 shadow-lg shadow-[#FFB800]/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'تقديم طلب التوظيف' : 'Apply for this Position'}</span>
                    </button>

                    <button
                      onClick={() => handleOpenApply(job)}
                      className="px-6 py-2.5 rounded-xl text-xs text-white/60 hover:text-white transition-colors text-center cursor-pointer"
                    >
                      {lang === 'ar' ? 'عرض التفاصيل والشروط الكاملة' : 'View Full Details & Requirements'}
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-[#171918] rounded-3xl border border-white/5 max-w-xl mx-auto p-8">
                <Briefcase className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">{lang === 'ar' ? 'لا توجد وظائف مطابقة للبحث' : 'No Matching Openings Found'}</h4>
                <p className="text-white/60 text-sm">
                  {lang === 'ar' ? 'يرجى تجربة كلمات بحث أخرى أو اختيار قسم وظيفي مختلف.' : 'Please try different keywords or select another department.'}
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── Spontaneous / General Application CTA ── */}
      <section className="bg-[#111312] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1E2420] via-[#1A1D1B] to-[#151716] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl text-start">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-[#FFB800] text-xs sm:text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'ar' ? "التقديم التلقائي والمفتوح" : "General / Open Application"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'ar' ? "لم تجد الوظيفة المناسبة لتخصصك وخبراتك؟" : "Didn't Find the Specific Role for You?"}
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                {lang === 'ar' ? "يسعدنا دائماً استلام سيرتك الذاتية. أرسل ملفك الشخصي وسنقوم بحفظه في قاعدة بياناتنا والاتصال بك فور توفر شاغر يلائم خبراتك ومؤهلاتك." : "We are always eager to discover great talent. Submit your resume to our talent database, and our team will contact you when a matching opportunity arises."}
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() =>
                  handleOpenApply({
                    id: 'spontaneous-application',
                    title: lang === 'ar' ? 'طلب توظيف عام (General Application)' : 'General / Open Application',
                    department: lang === 'ar' ? 'الموارد البشرية والمواهب' : 'Human Resources & Talent Acquisition',
                    location: lang === 'ar' ? 'كافة مناطق المملكة' : 'Across All KSA Regions',
                    type: lang === 'ar' ? 'تقديم عام' : 'General Application',
                    experience: lang === 'ar' ? 'كافة المستويات' : 'All Levels'
                  })
                }
                className="px-8 py-4 rounded-2xl bg-[#FFB800] text-black font-extrabold text-sm sm:text-base hover:bg-[#EAB308] shadow-lg shadow-[#FFB800]/25 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'أرسل سيرتك الذاتية الآن' : 'Submit Your Resume Now'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Side-Drawer Application Form ── */}
      <JobApplicationDrawer
        job={selectedJob}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default Careers;
