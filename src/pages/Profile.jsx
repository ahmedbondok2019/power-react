import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useProfile';
import { User, Mail, Phone, Calendar, LogOut, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/authApi';

const Profile = () => {
  const { data: profileResponse, isLoading, isError } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout API failed', error);
    }
    localStorage.removeItem('auth_token');
    navigate('/');
    window.location.reload();
  };

  const profileData = profileResponse?.data || null;

  // If not authenticated or session expired, auto-purge token and redirect to login
  useEffect(() => {
    const currentToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!currentToken || (!isLoading && (isError || !profileData))) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      navigate('/auth/login', { replace: true });
    }
  }, [isLoading, isError, profileData, navigate]);

  if (isLoading || isError || !profileData) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white/60 font-medium">جاري التحقق من الجلسة...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 selection:bg-primary selection:text-black">
      
      {/* ── Cover Photo (Banner) ── */}
      <div className="relative h-[30vh] md:h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-background z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Cover Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20 -mt-24 md:-mt-32">
        
        {/* ── Header Section ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
            
            {/* Avatar & Name */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-start">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-[#1a365d] flex items-center justify-center shadow-xl shadow-primary/20 border-4 border-background overflow-hidden relative z-10">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt={profileData.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-extrabold text-background">{profileData.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                {/* Active Status Badge */}
                <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 border-4 border-background rounded-full z-20"></div>
              </div>
              
              <div className="mb-2 md:mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">{profileData.name}</h1>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <span className="text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full text-sm border border-primary/20">
                    {profileData.role || 'مستخدم مميز'}
                  </span>
                  <span className="text-white/50 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> المملكة العربية السعودية
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center w-full md:w-auto">
              <button 
                onClick={handleLogout}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all border border-red-500/20 hover:border-red-500/40"
              >
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface/50 border border-white/5 rounded-[2rem] p-8 hover:bg-surface/70 transition-colors duration-500 h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  المعلومات الشخصية
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div className="group">
                  <p className="text-white/40 text-sm mb-2 font-medium flex items-center gap-2">
                    الاسم الكامل
                  </p>
                  <p className="font-bold text-xl text-white group-hover:text-primary transition-colors">{profileData.name || 'غير محدد'}</p>
                </div>
                
                <div className="group">
                  <p className="text-white/40 text-sm mb-2 font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" /> البريد الإلكتروني
                  </p>
                  <p className="font-bold text-xl text-white group-hover:text-primary transition-colors">{profileData.email || 'غير محدد'}</p>
                </div>
                
                <div className="group">
                  <p className="text-white/40 text-sm mb-2 font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" /> رقم الهاتف
                  </p>
                  <p className="font-bold text-xl text-white group-hover:text-primary transition-colors" dir="ltr">{profileData.phone || 'غير محدد'}</p>
                </div>

                <div className="group">
                  <p className="text-white/40 text-sm mb-2 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> تاريخ الانضمام
                  </p>
                  <p className="font-bold text-xl text-white group-hover:text-primary transition-colors">
                    {profileData.created_at ? new Date(profileData.created_at).toLocaleDateString('ar-SA') : 'غير محدد'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Sidebar / Account Status) */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#1a1c1a] to-surface border border-white/5 rounded-[2rem] p-8 relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px]"></div>
              
              <h3 className="text-lg font-bold text-white mb-6 relative z-10">حالة الحساب</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-white/80">الحالة</span>
                  </div>
                  <span className="text-sm font-bold text-green-400">نشط</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-white/80">مستوى التحقق</span>
                  </div>
                  <span className="text-sm font-bold text-white">مكتمل</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
