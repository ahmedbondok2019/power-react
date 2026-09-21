import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft } from 'lucide-react';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton';
import AuthLayout from './AuthLayout';
import { registerUser } from '../../api/authApi';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    phone: '', 
    password: '', 
    terms: false 
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        terms: formData.terms ? 1 : 0
      };
      
      const response = await registerUser(payload);
      
      if (response && response.data && response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        navigate('/profile');
        window.location.reload();
      } else if (response && response.token) {
        localStorage.setItem('auth_token', response.token);
        navigate('/profile');
        window.location.reload();
      } else {
        setError(response.message || 'حدث خطأ أثناء التسجيل');
      }
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء التسجيل. يرجى التأكد من البيانات والمحاولة مجدداً');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="إنشاء حساب جديد" subtitle="انضم إلينا الآن لتجربة خدمات هندسية لا مثيل لها.">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl mb-6 text-start">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/90">الاسم بالكامل</label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:right-0 rtl:pr-3 ltr:left-0 ltr:pl-3 flex items-center pointer-events-none text-white/50">
              <User size={18} />
            </div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="أحمد محمد"
              className="block w-full bg-surface/50 border border-white/10 rounded-xl py-2.5 rtl:pr-10 rtl:pl-3 ltr:pl-10 ltr:pr-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/90">البريد الإلكتروني</label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:right-0 rtl:pr-3 ltr:left-0 ltr:pl-3 flex items-center pointer-events-none text-white/50">
              <Mail size={18} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              className="block w-full bg-surface/50 border border-white/10 rounded-xl py-2.5 rtl:pr-10 rtl:pl-3 ltr:pl-10 ltr:pr-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Phone Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/90">رقم الهاتف</label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:right-0 rtl:pr-3 ltr:left-0 ltr:pl-3 flex items-center pointer-events-none text-white/50">
              <Phone size={18} />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01xxxxxxxxx"
              className="block w-full bg-surface/50 border border-white/10 rounded-xl py-2.5 rtl:pr-10 rtl:pl-3 ltr:pl-10 ltr:pr-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/90">كلمة المرور</label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:right-0 rtl:pr-3 ltr:left-0 ltr:pl-3 flex items-center pointer-events-none text-white/50">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="block w-full bg-surface/50 border border-white/10 rounded-xl py-2.5 pr-10 pl-10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-left"
              dir="ltr"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 rtl:left-0 rtl:pl-3 ltr:right-0 ltr:pr-3 flex items-center text-white/50 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="pt-2 pb-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="peer sr-only"
                required
              />
              <div className="w-5 h-5 rounded border border-white/20 bg-surface/50 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center group-hover:border-primary/50">
                <svg className="w-3 h-3 text-background opacity-0 peer-checked:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="text-white/70 text-sm group-hover:text-white transition-colors leading-tight">
              أوافق على <Link to="/terms" className="text-primary hover:underline">الشروط والأحكام</Link> و <Link to="/privacy" className="text-primary hover:underline">سياسة الخصوصية</Link> الخاصة بإيجيبت فيچن
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-hover disabled:opacity-70 disabled:hover:bg-primary text-background font-bold py-3.5 px-4 rounded-xl transition-all duration-300 transform active:scale-[0.98] mt-4 flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              إنشاء حساب
              <ArrowLeft size={18} className="rtl:rotate-0 ltr:rotate-180" />
            </>
          )}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface text-white/50 rounded-full text-xs">أو التسجيل عبر</span>
          </div>
        </div>

        {/* Google Signup */}
        <GoogleAuthButton type="signup" onError={(errMsg) => setError(errMsg)} />

        {/* Login link */}
        <p className="text-center text-white/60 text-sm mt-6">
          لديك حساب بالفعل؟{' '}
          <Link to="/auth/login" className="text-primary font-bold hover:underline underline-offset-4">
            تسجيل الدخول
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
