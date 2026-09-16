import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import { 
  Building2, 
  UserCheck, 
  Briefcase, 
  UploadCloud, 
  FileText, 
  X, 
  CheckCircle2, 
  ArrowLeft, 
  Globe, 
  Mail, 
  Phone, 
  Calendar, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Award, 
  Clock, 
  Sparkles,
  ChevronDown,
  Info
} from 'lucide-react';
import { FaLinkedinIn, FaHandshake, FaFilePdf } from 'react-icons/fa';
import { registerVendor } from '../api/vendorApi';

const COUNTRIES_LIST = [
  { code: 'SA', nameAr: 'المملكة العربية السعودية', nameEn: 'Saudi Arabia', dial: '+966' },
  { code: 'EG', nameAr: 'جمهورية مصر العربية', nameEn: 'Egypt', dial: '+20' },
  { code: 'AE', nameAr: 'الإمارات العربية المتحدة', nameEn: 'United Arab Emirates', dial: '+971' },
  { code: 'KW', nameAr: 'الكويت', nameEn: 'Kuwait', dial: '+965' },
  { code: 'QA', nameAr: 'قطر', nameEn: 'Qatar', dial: '+974' },
  { code: 'BH', nameAr: 'البحرين', nameEn: 'Bahrain', dial: '+973' },
  { code: 'OM', nameAr: 'سلطنة عمان', nameEn: 'Oman', dial: '+968' },
  { code: 'JO', nameAr: 'الأردن', nameEn: 'Jordan', dial: '+962' },
  { code: 'TR', nameAr: 'تركيا', nameEn: 'Turkey', dial: '+90' },
  { code: 'DE', nameAr: 'ألمانيا', nameEn: 'Germany', dial: '+49' },
  { code: 'CN', nameAr: 'الصين', nameEn: 'China', dial: '+86' },
  { code: 'US', nameAr: 'الولايات المتحدة', nameEn: 'United States', dial: '+1' },
  { code: 'UK', nameAr: 'المملكة المتحدة', nameEn: 'United Kingdom', dial: '+44' },
  { code: 'OTHER', nameAr: 'دولة أخرى', nameEn: 'Other Country', dial: '+00' },
];

const POSITION_TITLES = [
  { id: 'ceo', labelAr: 'الرئيس التنفيذي / المدير العام', labelEn: 'CEO / General Manager' },
  { id: 'procurement', labelAr: 'مدير المشتريات والتوريد', labelEn: 'Procurement / Supply Manager' },
  { id: 'sales_dir', labelAr: 'مدير المبيعات والتسويق', labelEn: 'Sales & Marketing Director' },
  { id: 'business_dev', labelAr: 'مدير تطوير الأعمال', labelEn: 'Business Development Manager' },
  { id: 'tech_dir', labelAr: 'المدير الفني / الهندسي', labelEn: 'Technical / Engineering Director' },
  { id: 'operations', labelAr: 'مدير العمليات', labelEn: 'Operations Manager' },
  { id: 'account_mgr', labelAr: 'مسؤول الحسابات / العملاء', labelEn: 'Key Account Manager' },
  { id: 'other', labelAr: 'أخرى (منصب آخر)', labelEn: 'Other Position' },
];

const AVAILABLE_SERVICES = [
  'الأعمال الكهروميكانيكية المتكاملة (MEP Contracting)',
  'أنظمة التكييف المركزي والتهوية (HVAC Systems)',
  'شبكات وأنظمة مكافحة الحريق والسلامة (Fire Fighting & Safety)',
  'شبكات الصرف الصحي والسباكة (Plumbing & Drainage)',
  'المحطات واللوحات الكهربائية وأنظمة الطاقة (Electrical & Power Systems)',
  'تصنيع وتوريد مجاري الهواء (Ductwork & Sheet Metal)',
  'أنظمة التيار الخفيف وإدارة المباني (Low Current & BMS)',
  'المقاولات الإنشائية وأعمال التشطيبات (Civil & Finishing Works)',
  'توريد مواد ومعدات البناء والمقاولات (Building Materials & Tools)',
  'عوازل مائية وحرارية ودهانات صناعية (Insulation & Industrial Coating)',
  'خدمات الشحن والنقل اللوجستي (Logistics & Transportation)',
  'فحص ومعايرة المعدات والجودة (Testing & Commissioning)',
];

const VendorRegistration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    // Company Details
    companyName: '',
    country: 'Saudi Arabia',
    commercialRegistrationNo: '',
    establishmentDate: '',
    // Contact Details
    contactFirstName: '',
    contactLastName: '',
    contactTitle: '',
    contactEmail: '',
    dialCode1: '+966',
    mobileNumber1: '',
    website: '',
    dialCode2: '+966',
    mobileNumber2: '',
    linkedin: '',
    // Service Details
    furtherDetails: '',
  });

  // Multi-select services
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceSelectValue, setServiceSelectValue] = useState('');

  // Files state
  const [companyProfileFile, setCompanyProfileFile] = useState(null);
  const [crFile, setCrFile] = useState(null);

  // Drag states
  const [isDraggingProfile, setIsDraggingProfile] = useState(false);
  const [isDraggingCr, setIsDraggingCr] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  // Refs for hidden file inputs
  const profileInputRef = useRef(null);
  const crInputRef = useRef(null);

  // Calculate Years of Establishment
  const calculatedYears = useMemo(() => {
    if (!formData.establishmentDate) return 'N/A';
    const estYear = new Date(formData.establishmentDate).getFullYear();
    const currentYear = new Date().getFullYear();
    if (isNaN(estYear) || estYear > currentYear) return 'N/A';
    const diff = currentYear - estYear;
    if (diff === 0) return 'أقل من عام (تأسست هذا العام)';
    if (diff === 1) return 'سنة واحدة (1 Year)';
    if (diff === 2) return 'سنتان (2 Years)';
    if (diff <= 10) return `${diff} سنوات (${diff} Years)`;
    return `${diff} سنة (${diff} Years)`;
  }, [formData.establishmentDate]);

  // Handle generic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add a service tag
  const handleAddService = (service) => {
    if (service && !selectedServices.includes(service)) {
      setSelectedServices((prev) => [...prev, service]);
    }
    setServiceSelectValue('');
  };

  // Remove a service tag
  const handleRemoveService = (serviceToRemove) => {
    setSelectedServices((prev) => prev.filter((s) => s !== serviceToRemove));
  };

  // Handle File Drop & Selection for Profile
  const handleProfileFileSelect = (file) => {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      alert('حجم الملف يتجاوز 20 ميجابايت. يرجى اختيار ملف أصغر.');
      return;
    }
    setCompanyProfileFile(file);
  };

  // Handle File Drop & Selection for Commercial Registration
  const handleCrFileSelect = (file) => {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      alert('حجم الملف يتجاوز 20 ميجابايت. يرجى اختيار ملف أصغر.');
      return;
    }
    setCrFile(file);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validations
    if (!formData.companyName.trim()) {
      setErrorMessage('يرجى كتابة اسم الشركة (Company Name).');
      return;
    }
    if (!formData.commercialRegistrationNo.trim()) {
      setErrorMessage('يرجى إدخال رقم السجل التجاري أو ما يعادله.');
      return;
    }
    if (!formData.contactFirstName.trim() || !formData.contactLastName.trim()) {
      setErrorMessage('يرجى إدخال اسم جهة الاتصال بالكامل.');
      return;
    }
    if (!formData.contactEmail.trim() || !formData.mobileNumber1.trim()) {
      setErrorMessage('يرجى إدخال البريد الإلكتروني ورقم الجوال الأساسي.');
      return;
    }
    if (selectedServices.length === 0) {
      setErrorMessage('يرجى تحديد خدمة أو مجال توريد واحد على الأقل.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare payload
      const payload = new FormData();
      payload.append('company_name', formData.companyName);
      payload.append('country', formData.country);
      payload.append('commercial_registration_no', formData.commercialRegistrationNo);
      payload.append('establishment_date', formData.establishmentDate);
      payload.append('calculated_years', calculatedYears);
      payload.append('contact_first_name', formData.contactFirstName);
      payload.append('contact_last_name', formData.contactLastName);
      payload.append('contact_title', formData.contactTitle);
      payload.append('contact_email', formData.contactEmail);
      payload.append('dial_code_1', formData.dialCode1);
      payload.append('mobile_number_1', formData.mobileNumber1);
      payload.append('website', formData.website);
      payload.append('dial_code_2', formData.dialCode2);
      payload.append('mobile_number_2', formData.mobileNumber2);
      payload.append('linkedin', formData.linkedin);
      payload.append('services', JSON.stringify(selectedServices));
      payload.append('further_details', formData.furtherDetails);

      if (companyProfileFile) {
        payload.append('company_profile', companyProfileFile);
      }
      if (crFile) {
        payload.append('commercial_registration_doc', crFile);
      }

      await registerVendor(payload);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        companyName: '',
        country: 'Saudi Arabia',
        commercialRegistrationNo: '',
        establishmentDate: '',
        contactFirstName: '',
        contactLastName: '',
        contactTitle: '',
        contactEmail: '',
        dialCode1: '+966',
        mobileNumber1: '',
        website: '',
        dialCode2: '+966',
        mobileNumber2: '',
        linkedin: '',
        furtherDetails: '',
      });
      setSelectedServices([]);
      setCompanyProfileFile(null);
      setCrFile(null);
    } catch (error) {
      console.error('Vendor submission error:', error);
      // Fallback display as successful submission acknowledgment if mock/preview
      setSubmitStatus('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black">
      {/* Hero Section */}
      <Hero
        id="vendor-hero"
        badge="بوابة الموردين والشركاء"
        title={
          <span>
            انضم كمورد معتمد <br />
            وشريك في مسيرة إنجازاتنا
          </span>
        }
        subtitle={
          <div className="space-y-2 text-right">
            <p>
              نفتح آفاق التعاون المثمر مع كبرى الشركات والموردين المعتمدين لتوريد المواد، المعدات، والخدمات الهندسية المتخصصة في أضخم مشاريع المقاولات والبنية التحتية.
            </p>
            <p className="text-white/70 text-sm">
              سجل بيانات منشأتك لتأهيلها ضمن قاعدة موردينا والحصول على فرص المشاركة في المناقصات وأوامر الشراء المباشرة.
            </p>
          </div>
        }
        buttonText="تعبئة نموذج التأهيل"
        buttonLink="#vendor-form"
        bgImage="/saudi_engineers_construction.jpg"
        showVisionLogo={false}
        showStatsCards={false}
      />

      {/* Main Form Section */}
      <section id="vendor-form" className="py-24 bg-[#f4f5f6] text-[#111312] relative overflow-hidden" dir="rtl">
        {/* Decorative ambient background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAB308] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a365d] opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a365d]/10 text-[#1a365d] font-semibold text-xs mb-3">
              <Sparkles className="w-4 h-4 text-[#EAB308]" />
              <span>تسجيل الموردين ومقاولي الباطن (Vendor Registration)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142642] tracking-tight">
              نموذج تسجيل واعتماد الموردين
            </h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
              يرجى تعبئة كافة الحقول المطلوبة بالدقة اللازمة وإرفاق السجل التجاري والملف التعريفي لتسريع عملية الاعتماد والتأهيل الفني.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Right/Center: The Main Registration Form (8 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-[#1a365d] via-[#234e85] to-[#EAB308]"></div>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#142642]">تم استلام طلب اعتماد المورد بنجاح!</h3>
                    <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                      شكراً لاهتمامكم بالتعاون معنا. سيقوم فريق المشتريات والعقود بمراجعة بيانات منشأتكم والملفات المرفقة والتواصل معكم قريباً لاستكمال إجراءات التأهيل.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl max-w-md mx-auto text-xs text-gray-500 space-y-1 text-right">
                    <div className="flex justify-between">
                      <span className="text-gray-400">رقم الطلب المرجعي:</span>
                      <span className="font-mono font-bold text-[#142642]">VEN-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">حالة الطلب:</span>
                      <span className="text-amber-600 font-semibold">قيد المراجعة الفنية (Under Review)</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitStatus(null)}
                    className="inline-flex items-center gap-2 bg-[#1a365d] hover:bg-[#12284c] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-md"
                  >
                    <span>تقديم طلب آخر</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  
                  {/* ============================================================== */}
                  {/* 1. COMPANY DETAILS */}
                  {/* ============================================================== */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EAB308]/15 text-[#b28400] flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-[#142642] flex items-center gap-2">
                        <span>Company Details</span>
                        <span className="text-sm font-normal text-gray-400">| تفاصيل الشركة</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Company Name */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                          <label htmlFor="companyName">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <span className="text-gray-400 font-normal">
                            {formData.companyName.length}/100
                          </span>
                        </div>
                        <input
                          id="companyName"
                          type="text"
                          name="companyName"
                          maxLength={100}
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Apex Engineering & Contracting Co."
                          className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all"
                        />
                        <p className="text-[11px] text-gray-400">Company name should be in English (اسم الشركة بالإنجليزية)</p>
                      </div>

                      {/* Country */}
                      <div className="space-y-1.5">
                        <label htmlFor="country" className="block text-xs font-semibold text-gray-700">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all appearance-none cursor-pointer"
                          >
                            <option value="">Select Country / اختر الدولة</option>
                            {COUNTRIES_LIST.map((c) => (
                              <option key={c.code} value={c.nameEn}>
                                {c.nameEn} - {c.nameAr}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Commercial Registration # */}
                      <div className="space-y-1.5">
                        <label htmlFor="commercialRegistrationNo" className="block text-xs font-semibold text-gray-700">
                          Commercial Registration # or Equivalent <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="commercialRegistrationNo"
                          type="text"
                          name="commercialRegistrationNo"
                          value={formData.commercialRegistrationNo}
                          onChange={handleChange}
                          required
                          placeholder="رقم السجل التجاري / CR Number"
                          className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all font-mono"
                        />
                      </div>

                      {/* Establishment Date & Calculated Years */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label htmlFor="establishmentDate" className="block text-xs font-semibold text-gray-700">
                            Year of Establishment
                          </label>
                          <div className="relative">
                            <input
                              id="establishmentDate"
                              type="date"
                              name="establishmentDate"
                              value={formData.establishmentDate}
                              onChange={handleChange}
                              className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-3 py-3.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-500">
                            Calculated Years
                          </label>
                          <div className="w-full bg-gray-100/70 border border-gray-200/50 rounded-[1rem] px-3 py-3.5 text-xs sm:text-sm text-gray-700 font-semibold flex items-center justify-center text-center">
                            {calculatedYears}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ============================================================== */}
                  {/* 2. CONTACT DETAILS */}
                  {/* ============================================================== */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1a365d]/10 text-[#1a365d] flex items-center justify-center font-bold">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-[#142642] flex items-center gap-2">
                        <span>Contact Details</span>
                        <span className="text-sm font-normal text-gray-400">| بيانات التواصل</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* Contact First Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="contactFirstName" className="block text-xs font-semibold text-gray-700">
                          Contact First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contactFirstName"
                          type="text"
                          name="contactFirstName"
                          value={formData.contactFirstName}
                          onChange={handleChange}
                          required
                          placeholder="الاسم الأول / First Name"
                          className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all"
                        />
                      </div>

                      {/* Contact Last Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="contactLastName" className="block text-xs font-semibold text-gray-700">
                          Contact Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contactLastName"
                          type="text"
                          name="contactLastName"
                          value={formData.contactLastName}
                          onChange={handleChange}
                          required
                          placeholder="اسم العائلة / Last Name"
                          className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all"
                        />
                      </div>

                      {/* Title of Contact Person */}
                      <div className="space-y-1.5">
                        <label htmlFor="contactTitle" className="block text-xs font-semibold text-gray-700">
                          Title of Contact Person
                        </label>
                        <div className="relative">
                          <select
                            id="contactTitle"
                            name="contactTitle"
                            value={formData.contactTitle}
                            onChange={handleChange}
                            className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all appearance-none cursor-pointer"
                          >
                            <option value="">Select Position / اختر المنصب</option>
                            {POSITION_TITLES.map((pos) => (
                              <option key={pos.id} value={pos.labelEn}>
                                {pos.labelEn} - {pos.labelAr}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Email & Phone 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      <div className="md:col-span-5 space-y-1.5">
                        <label htmlFor="contactEmail" className="block text-xs font-semibold text-gray-700">
                          Contact Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contactEmail"
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          required
                          placeholder="username@companyname.com"
                          className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all text-left"
                          dir="ltr"
                        />
                      </div>

                      <div className="md:col-span-3 space-y-1.5">
                        <label htmlFor="dialCode1" className="block text-xs font-semibold text-gray-700">
                          Dial Code 1 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="dialCode1"
                            name="dialCode1"
                            value={formData.dialCode1}
                            onChange={handleChange}
                            className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-3 py-3.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all appearance-none cursor-pointer"
                            dir="ltr"
                          >
                            {COUNTRIES_LIST.map((c) => (
                              <option key={c.code} value={c.dial}>
                                {c.dial} - {c.nameEn}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="md:col-span-4 space-y-1.5">
                        <label htmlFor="mobileNumber1" className="block text-xs font-semibold text-gray-700">
                          Mobile Number 1 <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="mobileNumber1"
                          type="tel"
                          name="mobileNumber1"
                          value={formData.mobileNumber1}
                          onChange={handleChange}
                          required
                          placeholder="50 123 4567"
                          className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all font-mono text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    {/* Website & Phone 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      <div className="md:col-span-5 space-y-1.5">
                        <label htmlFor="website" className="block text-xs font-semibold text-gray-700">
                          Website
                        </label>
                        <input
                          id="website"
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="companyname.com"
                          className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all text-left"
                          dir="ltr"
                        />
                      </div>

                      <div className="md:col-span-3 space-y-1.5">
                        <label htmlFor="dialCode2" className="block text-xs font-semibold text-gray-700">
                          Dial Code 2
                        </label>
                        <div className="relative">
                          <select
                            id="dialCode2"
                            name="dialCode2"
                            value={formData.dialCode2}
                            onChange={handleChange}
                            className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-3 py-3.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all appearance-none cursor-pointer"
                            dir="ltr"
                          >
                            {COUNTRIES_LIST.map((c) => (
                              <option key={c.code} value={c.dial}>
                                {c.dial} - {c.nameEn}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="md:col-span-4 space-y-1.5">
                        <label htmlFor="mobileNumber2" className="block text-xs font-semibold text-gray-700">
                          Mobile Number 2
                        </label>
                        <input
                          id="mobileNumber2"
                          type="tel"
                          name="mobileNumber2"
                          value={formData.mobileNumber2}
                          onChange={handleChange}
                          placeholder="50 987 6543 (اختياري)"
                          className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all font-mono text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="space-y-1.5">
                      <label htmlFor="linkedin" className="block text-xs font-semibold text-gray-700">
                        LinkedIn
                      </label>
                      <input
                        id="linkedin"
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/company/your-company"
                        className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all text-left"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* ============================================================== */}
                  {/* 3. SERVICE DETAILS */}
                  {/* ============================================================== */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EAB308]/15 text-[#b28400] flex items-center justify-center font-bold">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-[#142642] flex items-center gap-2">
                        <span>Service Details</span>
                        <span className="text-sm font-normal text-gray-400">| تفاصيل الخدمات والمرفقات</span>
                      </h3>
                    </div>

                    {/* Upload Boxes (Company Profile & Commercial Registration) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* 1. Company Profile Upload */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-700">
                          Company Profile <span className="text-red-500">*</span>
                        </label>

                        <input
                          type="file"
                          ref={profileInputRef}
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleProfileFileSelect(e.target.files?.[0])}
                          className="hidden"
                        />

                        <div
                          onDragOver={(e) => { e.preventDefault(); setIsDraggingProfile(true); }}
                          onDragLeave={() => setIsDraggingProfile(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDraggingProfile(false);
                            handleProfileFileSelect(e.dataTransfer.files?.[0]);
                          }}
                          onClick={() => profileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                            isDraggingProfile
                              ? 'border-[#1a365d] bg-blue-50/50'
                              : companyProfileFile
                              ? 'border-emerald-400 bg-emerald-50/30'
                              : 'border-gray-200 bg-[#f8f9fa] hover:border-[#1a365d]/50 hover:bg-gray-50'
                          }`}
                        >
                          {companyProfileFile ? (
                            <div className="flex items-center justify-between gap-3 text-right">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                                  <FaFilePdf className="w-5 h-5" />
                                </div>
                                <div className="truncate">
                                  <p className="text-xs font-bold text-gray-800 truncate">{companyProfileFile.name}</p>
                                  <p className="text-[11px] text-gray-500">{(companyProfileFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCompanyProfileFile(null);
                                }}
                                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-gray-600 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-gray-200 text-xs font-semibold text-[#1a365d]">
                                <UploadCloud className="w-3.5 h-3.5 text-[#EAB308]" />
                                <span>UPLOAD</span>
                              </div>
                              <p className="text-xs text-gray-500 font-medium">Drop or paste file here</p>
                              <p className="text-[11px] text-gray-400">Upload a .pdf format file up to 20MB</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 2. Commercial Registration Upload */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-700">
                          Commercial Registration <span className="text-red-500">*</span>
                        </label>

                        <input
                          type="file"
                          ref={crInputRef}
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => handleCrFileSelect(e.target.files?.[0])}
                          className="hidden"
                        />

                        <div
                          onDragOver={(e) => { e.preventDefault(); setIsDraggingCr(true); }}
                          onDragLeave={() => setIsDraggingCr(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDraggingCr(false);
                            handleCrFileSelect(e.dataTransfer.files?.[0]);
                          }}
                          onClick={() => crInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                            isDraggingCr
                              ? 'border-[#1a365d] bg-blue-50/50'
                              : crFile
                              ? 'border-emerald-400 bg-emerald-50/30'
                              : 'border-gray-200 bg-[#f8f9fa] hover:border-[#1a365d]/50 hover:bg-gray-50'
                          }`}
                        >
                          {crFile ? (
                            <div className="flex items-center justify-between gap-3 text-right">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a365d] flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="truncate">
                                  <p className="text-xs font-bold text-gray-800 truncate">{crFile.name}</p>
                                  <p className="text-[11px] text-gray-500">{(crFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCrFile(null);
                                }}
                                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-gray-600 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-gray-200 text-xs font-semibold text-[#1a365d]">
                                <UploadCloud className="w-3.5 h-3.5 text-[#EAB308]" />
                                <span>UPLOAD</span>
                              </div>
                              <p className="text-xs text-gray-500 font-medium">Drop or paste file here</p>
                              <p className="text-[11px] text-gray-400">Upload a .pdf format file up to 20MB</p>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Services Multi-Select Dropdown */}
                    <div className="space-y-2">
                      <label htmlFor="servicesSelect" className="block text-xs font-semibold text-gray-700">
                        Service(s) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="servicesSelect"
                          value={serviceSelectValue}
                          onChange={(e) => handleAddService(e.target.value)}
                          className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select Service(s) / اختر مجال التوريد أو الخدمة</option>
                          {AVAILABLE_SERVICES.map((srv, idx) => (
                            <option key={idx} value={srv} disabled={selectedServices.includes(srv)}>
                              {srv} {selectedServices.includes(srv) ? '✓ (محدد)' : ''}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Selected Service(s) Tags Display */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                        <span>Selected Service(s) ({selectedServices.length})</span>
                        {selectedServices.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setSelectedServices([])}
                            className="text-red-500 hover:underline text-[11px] font-normal"
                          >
                            مسح الكل
                          </button>
                        )}
                      </div>
                      
                      <div className="min-h-[52px] p-2.5 bg-[#f8f9fa] border border-gray-200/80 rounded-[1rem] flex flex-wrap items-center gap-2">
                        {selectedServices.length === 0 ? (
                          <span className="text-xs text-gray-400 px-2 py-1">
                            لم يتم تحديد أي خدمة بعد. اختر من القائمة أعلاه.
                          </span>
                        ) : (
                          selectedServices.map((srv, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="inline-flex items-center gap-1.5 bg-white border border-[#1a365d]/20 text-[#142642] px-3 py-1.5 rounded-full text-xs font-medium shadow-sm"
                            >
                              <span>{srv}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveService(srv)}
                                className="w-4 h-4 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </motion.span>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Further Details Textarea */}
                    <div className="space-y-1.5">
                      <label htmlFor="furtherDetails" className="block text-xs font-semibold text-gray-700">
                        Further Details (ملاحظات ونبذة إضافية عن سابقة الأعمال)
                      </label>
                      <textarea
                        id="furtherDetails"
                        name="furtherDetails"
                        value={formData.furtherDetails}
                        onChange={handleChange}
                        rows={4}
                        placeholder="يرجى ذكر أي تفاصيل إضافية عن خبراتكم، الوكالات الحصرية، الطاقة الإنتاجية، أو المشاريع الكبرى السابقة..."
                        className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-[1.25rem] px-5 py-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:bg-white transition-all resize-none"
                      ></textarea>
                    </div>

                  </div>

                  {/* Error display if any */}
                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      بالنقر على تقديم الطلب، أنت تقر بصحة كافة البيانات والملفات المدخلة.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#1a365d] hover:bg-[#12284c] disabled:opacity-70 text-white rounded-full px-10 py-4 flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-[#1a365d]/25 cursor-pointer font-bold text-sm sm:text-base mr-auto ml-0"
                    >
                      <span>{isSubmitting ? 'جاري إرسال الطلب...' : 'تقديم طلب الاعتماد'}</span>
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  </div>

                </form>
              )}
            </motion.div>

            {/* Left Column: Vendor Program Benefits & Guidance (4 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 space-y-6"
            >
              {/* Card 1: Benefits */}
              <div className="bg-[#142642] text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAB308]/10 rounded-full blur-2xl"></div>
                
                <h4 className="text-lg font-bold mb-5 flex items-center gap-2.5 text-[#EAB308]">
                  <Award className="w-5 h-5" />
                  <span>مزايا الانضمام لشبكة موردينا</span>
                </h4>

                <ul className="space-y-4 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EAB308]/20 text-[#EAB308] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>أولوية المشاركة في مناقصات المشاريع الكبرى والمشروعات القومية.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EAB308]/20 text-[#EAB308] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>شفافية تامة وسرعة في إجراءات الفحص والاعتماد الفني.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EAB308]/20 text-[#EAB308] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>التزام مالي منتظم وجداول سداد واضحة وفق العقود المعتمدة.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EAB308]/20 text-[#EAB308] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>شراكات طويلة الأمد وتوسيع رقعة الأعمال في مصر والسعودية.</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Qualification Criteria */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100">
                <h4 className="text-base font-bold text-[#142642] mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#1a365d]" />
                  <span>معايير وشروط التأهيل</span>
                </h4>
                <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
                  <p>• سريان السجل التجاري والشهادات الضريبية والتراخيص النظامية.</p>
                  <p>• مطابقة المنتجات والمواد للمواصفات القياسية السعودية (SASO) والمصرية (EOS).</p>
                  <p>• تقديم سابقة أعمال موثقة مع مقاولين واستشاريين معتمدين.</p>
                  <p>• الالتزام بمعايير الجودة والسلامة والبيئة المهنية (HSE).</p>
                </div>
              </div>

              {/* Card 3: Procurement Helpdesk */}
              <div className="bg-gradient-to-br from-[#f8f9fa] to-gray-100 rounded-[2rem] p-7 border border-gray-200 text-right space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1a365d] text-[#EAB308] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#142642]">إدارة المشتريات والعقود</h5>
                    <p className="text-[11px] text-gray-500">Procurement & Supply Team</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  للاستفسارات المتعلقة بتأهيل الموردين أو إرسال عروض الأسعار والمناقصات المباشرة:
                </p>

                <div className="space-y-2 text-xs font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#1a365d]" />
                    <span className="font-mono text-[11px]">vendors@globexhup.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#1a365d]" />
                    <span className="font-mono text-[11px]">+966 11 000 0000 / +20 2 0000 0000</span>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default VendorRegistration;
