import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import AuthLayout from './AuthLayout';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Add authentication logic here
  };

  return (
    <AuthLayout title="تسجيل الدخول" subtitle="مرحباً بعودتك! يرجى إدخال بياناتك للمتابعة.">
      <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
        {/* Email Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/90">البريد الإلكتروني</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-white/50">
              <Mail size={18} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="البريد الإلكتروني أو الهاتف"
              className="block w-full bg-surface/50 border border-white/10 rounded-xl py-3 pr-10 pl-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/90">كلمة المرور</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-white/50">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="block w-full bg-surface/50 border border-white/10 rounded-xl py-3 pr-10 pl-10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-left"
              dir="ltr"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/50 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between text-sm pt-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="peer sr-only"
              />
              <div className="w-5 h-5 rounded border border-white/20 bg-surface/50 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center group-hover:border-primary/50">
                <svg className="w-3 h-3 text-background opacity-0 peer-checked:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="text-white/70 group-hover:text-white transition-colors">تذكرني</span>
          </label>
          
          <Link to="/auth/forgot-password" className="text-primary hover:text-primary-hover transition-colors">
            نسيت كلمة المرور؟
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-background font-bold py-3.5 px-4 rounded-xl transition-all duration-300 transform active:scale-[0.98] mt-6 flex justify-center items-center gap-2"
        >
          تسجيل الدخول
          <ArrowLeft size={18} />
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface text-white/50 rounded-full text-xs">أو تسجيل الدخول عبر</span>
          </div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full bg-surface hover:bg-surface/80 border border-white/10 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
        >
          <FcGoogle size={22} />
          تسجيل الدخول باستخدام جوجل
        </button>

        {/* Sign up link */}
        <p className="text-center text-white/60 text-sm mt-8">
          ليس لديك حساب حتى الآن؟{' '}
          <Link to="/auth/signup" className="text-primary font-bold hover:underline underline-offset-4">
            قم بالتسجيل
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
