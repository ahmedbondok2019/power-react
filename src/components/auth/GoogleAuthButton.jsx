import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../../api/authApi';
import { Key, Check } from 'lucide-react';

const GoogleAuthButton = ({ type = 'signin', onError, className = '' }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [customClientId, setCustomClientId] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('demo_google_client_id')) || '';
  });

  const envClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const activeClientId = envClientId || customClientId;

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      onError?.('لم يتم استلام بيانات التحقق من Google.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        credential: credentialResponse.credential,
        id_token: credentialResponse.credential,
      };

      const response = await loginWithGoogle(payload);

      const token = response?.data?.token || response?.token;
      if (token) {
        localStorage.setItem('auth_token', token);
        navigate('/profile');
        window.location.reload();
      } else {
        onError?.(response?.message || 'فشل التحقق من الحساب بواسطة جوجل');
      }
    } catch (err) {
      onError?.(err?.message || 'حدث خطأ أثناء تسجيل الدخول عبر جوجل');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    onError?.('فشلت محاولة تسجيل الدخول عبر Google. يرجى التأكد من إعدادات النطاق في Google Cloud Console.');
  };

  const saveCustomClientId = (e) => {
    e.preventDefault();
    if (customClientId.trim()) {
      localStorage.setItem('demo_google_client_id', customClientId.trim());
      setShowConfigModal(false);
      window.location.reload();
    }
  };

  // If Client ID is configured, render official Google Login Button
  if (activeClientId) {
    return (
      <div className={`w-full relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl gap-2 text-sm text-white">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>جاري تسجيل الدخول عبر جوجل...</span>
          </div>
        )}

        <GoogleOAuthProvider clientId={activeClientId}>
          <div className="w-full flex justify-center items-center overflow-hidden rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_black"
              size="large"
              shape="rectangular"
              text={type === 'signup' ? 'signup_with' : 'signin_with'}
              locale="ar"
              width="380"
            />
          </div>
        </GoogleOAuthProvider>
      </div>
    );
  }

  // Fallback if VITE_GOOGLE_CLIENT_ID is not configured yet
  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfigModal(true)}
        className={`w-full bg-surface hover:bg-surface/80 border border-white/10 hover:border-primary/50 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer ${className}`}
      >
        <FcGoogle size={22} />
        <span>{type === 'signup' ? 'التسجيل باستخدام جوجل' : 'تسجيل الدخول باستخدام جوجل'}</span>
      </button>

      {/* Modal helping user configure Google Client ID if missing */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" dir="rtl">
          <div className="bg-[#181b1a] border border-white/10 rounded-2xl max-w-md w-full p-6 text-right shadow-2xl relative">
            <div className="flex items-center gap-3 text-primary mb-4">
              <Key className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">تفعيل تسجيل الدخول بواسطة جوجل</h3>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-4">
              لتشغيل نافذة تسجيل الدخول الفعلية من Google، يتطلب Google إضافة <strong>Client ID</strong> الخاص بتطبيقك.
            </p>

            <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-xs text-white/80 mb-4 space-y-2">
              <p className="font-semibold text-primary">الخيار 1 (الدائم - موصى به):</p>
              <p>أضف السطر التالي في ملف <code className="bg-black/50 px-1.5 py-0.5 rounded text-yellow-400">.env</code> في مشروعك:</p>
              <pre className="bg-black/60 p-2 rounded text-[11px] text-white/90 overflow-x-auto text-left" dir="ltr">
                VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
              </pre>
            </div>

            <form onSubmit={saveCustomClientId} className="space-y-3">
              <p className="font-semibold text-xs text-white/90">الخيار 2 (للتجربة الفورية الآن):</p>
              <input
                type="text"
                placeholder="الصق Google Client ID هنا..."
                value={customClientId}
                onChange={(e) => setCustomClientId(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl py-2.5 px-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-primary text-left"
                dir="ltr"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 text-xs rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  إغلاق
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-primary hover:bg-primary-hover text-background transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  حفظ وتفعيل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleAuthButton;
