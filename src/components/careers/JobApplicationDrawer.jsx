import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Globe,
  Send,
} from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

const JobApplicationDrawer = ({ job, isOpen, onClose }) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    yearsOfExperience: '',
    currentCompany: '',
    portfolioUrl: '',
    linkedinUrl: '',
    coverLetter: '',
    noticePeriod: isEn ? 'Immediate (Ready Now)' : 'فوري (جاهز فوراً)',
    expectedSalary: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg(isEn ? 'File size too large. Maximum is 10MB.' : 'حجم الملف كبير جداً، الحد الأقصى هو 10 ميجابايت.');
        return;
      }
      setErrorMsg('');
      setResumeFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMsg(isEn ? 'Please fill in the required fields.' : 'يرجى تعبئة الحقول الأساسية المطلوبة.');
      return;
    }
    if (!resumeFile) {
      setErrorMsg(isEn ? 'Please attach your CV / Resume.' : 'يرجى إرفاق نسختك من السيرة الذاتية (CV).');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setErrorMsg('');
      setResumeFile(null);
      setFormData({
        fullName: '', email: '', phone: '', city: '',
        yearsOfExperience: '', currentCompany: '', portfolioUrl: '',
        linkedinUrl: '', coverLetter: '',
        noticePeriod: isEn ? 'Immediate (Ready Now)' : 'فوري (جاهز فوراً)',
        expectedSalary: '',
      });
    }, 300);
  };

  if (!isOpen && !job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none" data-lenis-prevent="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 rtl:right-0 ltr:left-0 max-w-full flex rtl:pl-0 rtl:sm:pl-10 ltr:pr-0 ltr:sm:pr-10 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              data-lenis-prevent="true"
              className="w-screen max-w-2xl bg-[#141615] rtl:border-l ltr:border-r border-white/15 text-white shadow-2xl flex flex-col h-full overflow-hidden text-start"
            >
              {/* Header */}
              <div className="p-6 sm:p-7 border-b border-white/10 bg-[#191C1A] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FFB800] text-white hover:text-black transition-colors flex items-center justify-center cursor-pointer"
                    aria-label={isEn ? 'Close' : 'إغلاق'}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-white/50 font-medium">
                    {isEn ? 'Job Application' : 'التقديم على وظيفة'}
                  </span>
                </div>
                <div className="text-left">
                  <span className="px-3.5 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-xs font-bold">
                    {job?.department || (isEn ? 'Department' : 'القسم')}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar" data-lenis-prevent="true">

                {/* Job Banner */}
                {job && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1E2320] to-[#171A18] border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-[#FFB800]" />
                    <div className="space-y-2 text-right">
                      <h3 className="text-xl sm:text-2xl font-black text-white">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 pt-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                          <span>{job.location || (isEn ? 'Riyadh, Saudi Arabia' : 'الرياض، السعودية')}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#FFB800]" />
                          <span>{job.type || (isEn ? 'Full Time' : 'دوام كامل')}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#FFB800]" />
                          <span>{job.experience || (isEn ? '3-5 Years Experience' : 'خبرة 3-5 سنوات')}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success State */}
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="py-16 px-6 text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-white">
                        {isEn ? 'Application Submitted Successfully!' : 'تم استلام طلب التقديم بنجاح!'}
                      </h4>
                      <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                        {isEn
                          ? 'Thank you for your interest in joining the Power team. Our HR team will review your CV and get in touch with you shortly.'
                          : 'شكراً لاهتمامك بالانضمام إلى فريق عمل باور. سيقوم فريق الموارد البشرية بمراجعة سيرتك الذاتية والتواصل معك قريباً.'}
                      </p>
                    </div>
                    <button
                      type="button" onClick={handleClose}
                      className="px-8 py-3 rounded-full bg-[#FFB800] text-black font-extrabold text-sm hover:bg-[#EAB308] shadow-lg shadow-[#FFB800]/25 transition-transform hover:scale-105 cursor-pointer"
                    >
                      {isEn ? 'Back to Jobs' : 'العودة للوظائف المتاحة'}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 text-right">

                    {errorMsg && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Section 1: Personal Info */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-[#FFB800] uppercase tracking-wider flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{isEn ? '1. Personal & Contact Information' : '1. البيانات الشخصية والاتصال'}</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">{isEn ? 'Full Name *' : 'الاسم الثلاثي / الرباعي *'}</label>
                          <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange}
                            placeholder={isEn ? 'e.g. John Smith' : 'مثال: أحمد عبد الله الغامدي'}
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">{isEn ? 'Email Address *' : 'البريد الإلكتروني *'}</label>
                          <input type="email" name="email" required value={formData.email} onChange={handleChange}
                            placeholder="name@example.com"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">{isEn ? 'Phone Number *' : 'رقم الجوال *'}</label>
                          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                            placeholder="+966 5X XXX XXXX"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">{isEn ? 'Current City' : 'المدينة الحالية للإقامة'}</label>
                          <input type="text" name="city" value={formData.city} onChange={handleChange}
                            placeholder={isEn ? 'e.g. Riyadh / Jeddah' : 'مثال: الرياض / جدة / الدمام'}
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Professional Experience */}
                    <div className="space-y-4 pt-2">
                      <h4 className="text-xs font-bold text-[#FFB800] uppercase tracking-wider flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{isEn ? '2. Professional Experience' : '2. الخبرة المهنية والتفاصيل الفنية'}</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">{isEn ? 'Years of Experience' : 'سنوات الخبرة العملية'}</label>
                          <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange}
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800] transition-colors">
                            <option value="">{isEn ? 'Select years of experience' : 'اختر سنوات الخبرة'}</option>
                            <option value="0-1">{isEn ? 'Fresh Graduate (0–1 year)' : 'حديث التخرج (0 - 1 سنة)'}</option>
                            <option value="1-3">{isEn ? '1–3 Years' : '1 - 3 سنوات'}</option>
                            <option value="3-6">{isEn ? '3–6 Years' : '3 - 6 سنوات'}</option>
                            <option value="6-10">{isEn ? '6–10 Years' : '6 - 10 سنوات'}</option>
                            <option value="10+">{isEn ? '10+ Years (Expert / Consultant)' : 'أكثر من 10 سنوات (خبير / استشاري)'}</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">{isEn ? 'Current / Previous Company' : 'الشركة أو الجهة الحالية / السابقة'}</label>
                          <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleChange}
                            placeholder={isEn ? 'Company name' : 'اسم الشركة الحالية أو السابقة'}
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">{isEn ? 'Notice Period' : 'فترة الإشعار للبدء (Notice Period)'}</label>
                          <select name="noticePeriod" value={formData.noticePeriod} onChange={handleChange}
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800] transition-colors">
                            <option value={isEn ? 'Immediate (Ready Now)' : 'فوري (جاهز فوراً)'}>{isEn ? 'Immediate (Ready Now)' : 'فوري (جاهز فوراً)'}</option>
                            <option value={isEn ? '2 Weeks' : 'أسبوعين'}>{isEn ? '2 Weeks' : 'أسبوعين'}</option>
                            <option value={isEn ? '1 Month (30 days)' : 'شهر واحد (30 يوم)'}>{isEn ? '1 Month (30 days)' : 'شهر واحد (30 يوم)'}</option>
                            <option value={isEn ? '2 Months (60 days)' : 'شهرين (60 يوم)'}>{isEn ? '2 Months (60 days)' : 'شهرين (60 يوم)'}</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">{isEn ? 'Expected Salary (SAR/month)' : 'الراتب المتوقع (ريال سعودي شهرياً)'}</label>
                          <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange}
                            placeholder={isEn ? 'e.g. 12,000 – 15,000 SAR' : 'مثال: 12,000 - 15,000 ر.س'}
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors" />
                        </div>
                      </div>

                      {/* Online Profiles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium flex items-center gap-1.5">
                            <FaLinkedin className="w-3.5 h-3.5 text-[#FFB800]" />
                            <span>{isEn ? 'LinkedIn Profile' : 'رابط حساب لينكد إن (LinkedIn)'}</span>
                          </label>
                          <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-[#FFB800]" />
                            <span>{isEn ? 'Portfolio / Personal Website' : 'ملف الأعمال أو الرابط الشخصي (Portfolio)'}</span>
                          </label>
                          <input type="url" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange}
                            placeholder="https://yourportfolio.com"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: CV Upload */}
                    <div className="space-y-2.5 pt-2">
                      <h4 className="text-xs font-bold text-[#FFB800] uppercase tracking-wider flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        <span>{isEn ? '3. Attach CV / Resume *' : '3. إرفاق السيرة الذاتية (CV / Resume) *'}</span>
                      </h4>
                      <label className="relative border-2 border-dashed border-white/20 hover:border-[#FFB800] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-white/[0.02] hover:bg-white/[0.04] group">
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="sr-only" />
                        {resumeFile ? (
                          <div className="flex items-center gap-3 text-right">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white max-w-xs truncate">{resumeFile.name}</p>
                              <span className="text-xs text-emerald-400">
                                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB — {isEn ? 'Ready to Submit' : 'جاهز للإرسال'}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800] mx-auto group-hover:scale-110 transition-transform">
                              <Upload className="w-6 h-6" />
                            </div>
                            <div className="text-xs text-white/80">
                              <span className="text-[#FFB800] font-bold">{isEn ? 'Click to choose a file' : 'اضغط لاختيار ملف'}</span>{' '}
                              {isEn ? 'or drag and drop here' : 'أو اسحبه وأفلته هنا'}
                            </div>
                            <p className="text-[11px] text-white/40 font-mono">
                              {isEn ? 'Supported: PDF, DOC, DOCX (Max 10MB)' : 'الملفات المدعومة: PDF, DOC, DOCX (الحد الأقصى 10 ميجابايت)'}
                            </p>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Section 4: Cover Letter */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs text-white/80 font-medium block">
                        {isEn ? 'Cover Letter / Additional Notes' : 'رسالة تعريفية أو نبذة إضافية (Cover Letter)'}
                      </label>
                      <textarea
                        name="coverLetter" rows={4} value={formData.coverLetter} onChange={handleChange}
                        placeholder={isEn
                          ? 'Briefly describe your experience in construction or electromechanical projects and your motivation for joining Power...'
                          : 'اكتب بإيجاز عن خبرتك في المشاريع الإنشائية أو الكهروميكانيكية وأسباب رغبتك بالانضمام لباور...'}
                        className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                      <button type="button" onClick={handleClose}
                        className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors cursor-pointer">
                        {isEn ? 'Cancel' : 'إلغاء'}
                      </button>
                      <button type="submit" disabled={isSubmitting}
                        className="flex-1 px-8 py-3.5 rounded-xl bg-[#FFB800] hover:bg-[#EAB308] text-black font-black text-sm transition-all duration-300 shadow-lg shadow-[#FFB800]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer">
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>{isEn ? 'Submitting...' : 'جارٍ إرسال طلب التقديم...'}</span>
                          </div>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{isEn ? 'Submit Application' : 'إرسال طلب التقديم الآن'}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationDrawer;
