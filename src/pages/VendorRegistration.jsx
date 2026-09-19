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
  Info,
  Loader2
} from 'lucide-react';
import { FaLinkedinIn, FaHandshake, FaFilePdf } from 'react-icons/fa';
import { registerVendor, getVendorPage } from '../api/vendorApi';

const VendorRegistration = () => {
  // Page data from API
  const [pageData, setPageData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPage = async () => {
      try {
        const res = await getVendorPage();
        setPageData(res.data);
      } catch (err) {
        console.error('Failed to load vendor page data:', err);
        setPageError('تعذّر تحميل بيانات الصفحة. يرجى المحاولة مرة أخرى.');
      } finally {
        setPageLoading(false);
      }
    };
    fetchPage();
  }, []);

  // Derived options from API (fallback to empty arrays while loading)
  const countriesList     = pageData?.options?.countries        ?? [];
  const positionTitles   = pageData?.options?.position_titles  ?? [];
  const availableServices= pageData?.options?.available_services ?? [];
  const heroSection      = pageData?.hero_section;
  const benefitsSection  = pageData?.benefits_section;
  const criteriaSection  = pageData?.criteria_section;
  const helpdeskSection  = pageData?.helpdesk_section;

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
  const [referenceNo, setReferenceNo] = useState('');

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

      const result = await registerVendor(payload);
      // Capture reference number if returned by the API
      const ref = result?.data?.reference_no || result?.reference_no || '';
      setReferenceNo(ref);
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
      setErrorMessage(error?.message || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Loading / Error screen ---
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#111312] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white/60">
          <Loader2 className="w-10 h-10 animate-spin text-[#EAB308]" />
          <p className="text-sm">جاري تحميل الصفحة...</p>
        </div>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="min-h-screen bg-[#111312] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <p className="text-white/80 text-sm">{pageError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-2 bg-[#EAB308] text-[#111312] font-bold rounded-full text-sm"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black">
      {/* Hero Section — data from API */}
      <Hero
        id="vendor-hero"
        badge={heroSection?.badge || 'بوابة الموردين والشركاء'}
        title={
          <span>
            {heroSection?.title
              ? heroSection.title.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
                ))
              : <><span>انضم كمورد معتمد</span><br /><span>وشريك في مسيرة إنجازاتنا</span></>}
          </span>
        }
        subtitle={
          <div className="space-y-2 text-right">
            {(heroSection?.paragraphs ?? []).map((para, i) => (
              <p key={i} className={i > 0 ? 'text-white/70 text-sm' : ''}>{para}</p>
            ))}
          </div>
        }
        buttonText={heroSection?.button_text || 'تعبئة نموذج التأهيل'}
        buttonLink={heroSection?.button_link || '#vendor-form'}
        bgImage={heroSection?.image || '/saudi_engineers_construction.jpg'}
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
                    {referenceNo && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">رقم الطلب المرجعي:</span>
                        <span className="font-mono font-bold text-[#142642]">{referenceNo}</span>
                      </div>
                    )}
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
                            {countriesList.map((c) => (
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
                            {positionTitles.map((pos) => (
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
                            {countriesList.map((c) => (
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
                            {countriesList.map((c) => (
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
                          {availableServices.map((srv, idx) => (
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
              {/* Card 1: Benefits — from API */}
              <div className="bg-[#142642] text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAB308]/10 rounded-full blur-2xl"></div>
                
                <h4 className="text-lg font-bold mb-5 flex items-center gap-2.5 text-[#EAB308]">
                  <Award className="w-5 h-5" />
                  <span>{benefitsSection?.title || 'مزايا الانضمام لشبكة موردينا'}</span>
                </h4>

                <ul className="space-y-4 text-xs sm:text-sm text-gray-300">
                  {(benefitsSection?.benefits ?? []).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EAB308]/20 text-[#EAB308] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Qualification Criteria — from API */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100">
                <h4 className="text-base font-bold text-[#142642] mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#1a365d]" />
                  <span>{criteriaSection?.title || 'معايير وشروط التأهيل'}</span>
                </h4>
                <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
                  {(criteriaSection?.criteria ?? []).map((criterion, i) => (
                    <p key={i}>• {criterion}</p>
                  ))}
                </div>
              </div>

              {/* Card 3: Procurement Helpdesk — from API */}
              <div className="bg-gradient-to-br from-[#f8f9fa] to-gray-100 rounded-[2rem] p-7 border border-gray-200 text-right space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1a365d] text-[#EAB308] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#142642]">{helpdeskSection?.team_title || 'إدارة المشتريات والعقود'}</h5>
                    <p className="text-[11px] text-gray-500">Procurement & Supply Team</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  للاستفسارات المتعلقة بتأهيل الموردين أو إرسال عروض الأسعار والمناقصات المباشرة:
                </p>

                <div className="space-y-2 text-xs font-medium text-gray-700">
                  {helpdeskSection?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#1a365d]" />
                      <span className="font-mono text-[11px]">{helpdeskSection.email}</span>
                    </div>
                  )}
                  {(helpdeskSection?.phones ?? []).map((phone, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#1a365d]" />
                      <span className="font-mono text-[11px]">{phone}</span>
                    </div>
                  ))}
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
