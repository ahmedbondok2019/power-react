import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Mail,
  Phone,
  Globe,
  Send,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

const JobApplicationDrawer = ({ job, isOpen, onClose }) => {
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
    noticePeriod: 'فوري (جاهز فوراً)',
    expectedSalary: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Drag & Upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB) and type
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('حجم الملف كبير جداً، الحد الأقصى هو 10 ميجابايت.');
        return;
      }
      setErrorMsg('');
      setResumeFile(file);
    }
  };

  // Handle Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMsg('يرجى تعبئة الحقول الأساسية المطلوبة.');
      return;
    }
    if (!resumeFile) {
      setErrorMsg('يرجى إرفاق نسختك من السيرة الذاتية (CV).');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    // reset status after drawer closes
    setTimeout(() => {
      setIsSuccess(false);
      setErrorMsg('');
      setResumeFile(null);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        yearsOfExperience: '',
        currentCompany: '',
        portfolioUrl: '',
        linkedinUrl: '',
        coverLetter: '',
        noticePeriod: 'فوري (جاهز فوراً)',
        expectedSalary: '',
      });
    }, 300);
  };

  if (!isOpen && !job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-hidden select-none" 
          dir="rtl"
          data-lenis-prevent="true"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Sliding from Right / Side */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 z-50">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              data-lenis-prevent="true"
              className="w-screen max-w-2xl bg-[#141615] border-l border-white/15 text-white shadow-[-20px_0_60px_rgba(0,0,0,0.85)] flex flex-col h-full overflow-hidden"
            >
              {/* Drawer Top Sticky Header */}
              <div className="p-6 sm:p-7 border-b border-white/10 bg-[#191C1A] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FFB800] text-white hover:text-black transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="إغلاق"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-white/50 font-medium">التقديم على وظيفة</span>
                </div>

                <div className="text-left">
                  <span className="px-3.5 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-xs font-bold">
                    {job?.department || 'إدارة المقاولات'}
                  </span>
                </div>
              </div>

              {/* Scrollable Drawer Body */}
              <div 
                className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar"
                data-lenis-prevent="true"
              >
                {/* Job Snapshot Banner */}
                {job && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1E2320] to-[#171A18] border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-[#FFB800]" />
                    <div className="space-y-2 text-right">
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 pt-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                          <span>{job.location || 'الرياض، السعودية'}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#FFB800]" />
                          <span>{job.type || 'دوام كامل'}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#FFB800]" />
                          <span>{job.experience || 'خبرة 3-5 سنوات'}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success State Screen */}
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 px-6 text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-white">
                        تم استلام طلب التقديم بنجاح!
                      </h4>
                      <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                        شكراً لاهتمامك بالانضمام إلى فريق عمل باور. سيقوم فريق الموارد البشرية والتوظيف بمراجعة سيرتك الذاتية والتواصل معك قريباً.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-8 py-3 rounded-full bg-[#FFB800] text-black font-extrabold text-sm hover:bg-[#EAB308] shadow-lg shadow-[#FFB800]/25 transition-transform hover:scale-105 cursor-pointer"
                    >
                      العودة للوظائف المتاحة
                    </button>
                  </motion.div>
                ) : (
                  /* Job Application Form */
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
                        <span>1. البيانات الشخصية والاتصال</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">الاسم الثلاثي / الرباعي *</label>
                          <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="مثال: أحمد عبد الله الغامدي"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">البريد الإلكتروني *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">رقم الجوال (مع الرمز الدولي) *</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+966 5X XXX XXXX"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">المدينة الحالية للإقامة</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="مثال: الرياض / جدة / الدمام"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Professional Experience */}
                    <div className="space-y-4 pt-2">
                      <h4 className="text-xs font-bold text-[#FFB800] uppercase tracking-wider flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>2. الخبرة المهنية والتفاصيل الفنية</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">سنوات الخبرة العملية</label>
                          <select
                            name="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800] transition-colors"
                          >
                            <option value="">اختر سنوات الخبرة</option>
                            <option value="حديث التخرج (0 - 1 سنة)">حديث التخرج (0 - 1 سنة)</option>
                            <option value="1 - 3 سنوات">1 - 3 سنوات</option>
                            <option value="3 - 6 سنوات">3 - 6 سنوات</option>
                            <option value="6 - 10 سنوات">6 - 10 سنوات</option>
                            <option value="أكثر من 10 سنوات">أكثر من 10 سنوات (خبير / استشاري)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">الشركة أو الجهة الحالية / السابقة</label>
                          <input
                            type="text"
                            name="currentCompany"
                            value={formData.currentCompany}
                            onChange={handleChange}
                            placeholder="اسم الشركة الحالية أو السابقة"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">فترة الإشعار للبدء (Notice Period)</label>
                          <select
                            name="noticePeriod"
                            value={formData.noticePeriod}
                            onChange={handleChange}
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800] transition-colors"
                          >
                            <option value="فوري (جاهز فوراً)">فوري (جاهز فوراً)</option>
                            <option value="أسبوعين">أسبوعين</option>
                            <option value="شهر واحد (30 يوم)">شهر واحد (30 يوم)</option>
                            <option value="شهرين (60 يوم)">شهرين (60 يوم)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium">الراتب المتوقع (ريال سعودي شهرياً)</label>
                          <input
                            type="text"
                            name="expectedSalary"
                            value={formData.expectedSalary}
                            onChange={handleChange}
                            placeholder="مثال: 12,000 - 15,000 ر.س"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Online Profiles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium flex items-center gap-1.5">
                            <FaLinkedin className="w-3.5 h-3.5 text-[#FFB800]" />
                            <span>رابط حساب لينكد إن (LinkedIn)</span>
                          </label>
                          <input
                            type="url"
                            name="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs text-white/80 font-medium flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-[#FFB800]" />
                            <span>ملف الأعمال أو الرابط الشخصي (Portfolio)</span>
                          </label>
                          <input
                            type="url"
                            name="portfolioUrl"
                            value={formData.portfolioUrl}
                            onChange={handleChange}
                            placeholder="https://yourportfolio.com"
                            className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: CV / Resume File Upload */}
                    <div className="space-y-2.5 pt-2">
                      <h4 className="text-xs font-bold text-[#FFB800] uppercase tracking-wider flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        <span>3. إرفاق السيرة الذاتية (CV / Resume) *</span>
                      </h4>

                      <label className="relative border-2 border-dashed border-white/20 hover:border-[#FFB800] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-white/[0.02] hover:bg-white/[0.04] group">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                        {resumeFile ? (
                          <div className="flex items-center gap-3 text-right">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white max-w-xs truncate">
                                {resumeFile.name}
                              </p>
                              <span className="text-xs text-emerald-400">
                                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB - جاهز للإرسال
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800] mx-auto group-hover:scale-110 transition-transform">
                              <Upload className="w-6 h-6" />
                            </div>
                            <div className="text-xs text-white/80">
                              <span className="text-[#FFB800] font-bold">اضغط لاختيار ملف</span> أو اسحبه وأفلته هنا
                            </div>
                            <p className="text-[11px] text-white/40 font-mono">
                              الملفات المدعومة: PDF, DOC, DOCX (الحد الأقصى 10 ميجابايت)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Section 4: Cover Letter / Additional Notes */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs text-white/80 font-medium block">
                        رسالة تعريفية أو نبذة إضافية (Cover Letter)
                      </label>
                      <textarea
                        name="coverLetter"
                        rows={4}
                        value={formData.coverLetter}
                        onChange={handleChange}
                        placeholder="اكتب بإيجاز عن خبرتك في المشاريع الإنشائية أو الكهروميكانيكية وأسباب رغبتك بالانضمام لباور..."
                        className="w-full bg-[#1A1D1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFB800] transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors cursor-pointer"
                      >
                        إلغاء
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-8 py-3.5 rounded-xl bg-[#FFB800] hover:bg-[#EAB308] text-black font-black text-sm transition-all duration-300 shadow-lg shadow-[#FFB800]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>جارٍ إرسال طلب التقديم...</span>
                          </div>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>إرسال طلب التقديم الآن</span>
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
