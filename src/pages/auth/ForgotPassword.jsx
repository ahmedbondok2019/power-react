import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import AuthLayout from './AuthLayout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    // Add logic to send reset email
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AuthLayout title="تم إرسال الرابط!" subtitle="تحقق من بريدك الإلكتروني">
        <div className="text-center space-y-6" dir="rtl">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="text-primary w-10 h-10" />
          </div>
          <p className="text-white/80 leading-relaxed">
            لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى البريد الإلكتروني:
            <br />
            <span className="font-bold text-white mt-2 block" dir="ltr">{email}</span>
          </p>
          <div className="pt-6">
            <Link 
              to="/auth/login" 
              className="inline-flex items-center justify-center gap-2 bg-surface hover:bg-surface/80 border border-white/10 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 w-full"
            >
              <ArrowRight size={18} className="rotate-180 md:rotate-0" />
              العودة لتسجيل الدخول
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="نسيت كلمة المرور؟" subtitle="لا تقلق، سنقوم بإرسال رابط لإعادة تعيين كلمة المرور الخاصة بك.">
      <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
        {/* Email Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/90">البريد الإلكتروني</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-white/50">
              <Mail size={18} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              className="block w-full bg-surface/50 border border-white/10 rounded-xl py-3 pr-10 pl-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-background font-bold py-3.5 px-4 rounded-xl transition-all duration-300 transform active:scale-[0.98] mt-6 flex justify-center items-center gap-2"
        >
          إرسال رابط الاستعادة
          <ArrowLeft size={18} />
        </button>

        {/* Back to Login link */}
        <div className="text-center pt-4">
          <Link to="/auth/login" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium">
            <ArrowRight size={16} className="rotate-180 md:rotate-0" />
            العودة لتسجيل الدخول
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
