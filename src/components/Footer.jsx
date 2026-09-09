import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaSnapchatGhost } from 'react-icons/fa';
import { useSettingsData } from '../hooks/useSettingsData';
import LogoFallback from '../../public/logo.png';

const Footer = () => {
  const { data: settingsData } = useSettingsData();
  const settings = settingsData?.data || {};
  const logoUrl = settings.logo || LogoFallback;
  const socialLinks = settings.social_links || [];

  return (
    <footer className="bg-secondary text-text-main pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top: Logo Centered */}
        <div className="flex justify-center mb-10">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logoUrl} alt={settings.site_name || "Egypt Vision"} className="h-16 md:h-20 w-auto object-contain" />
          </Link>
        </div>
        
        {/* Horizontal Line */}
        <hr className="border-t border-white/20 mb-10" />

        {/* Middle: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-right">
          
          {/* Column 1: عن الشركة */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">عن {settings.site_name ? settings.site_name.split(' ')[0] : 'باور'}</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/about"
                  className="text-text-muted hover:text-primary transition-colors text-sm"
                >
                  من نحن ورؤيتنا
                </Link>
              </li>
              <li><Link to="/about" className="text-text-muted hover:text-primary transition-colors text-sm">هيكل المجموعة والقدرات</Link></li>
              <li><Link to="/strategy" className="text-text-muted hover:text-primary transition-colors text-sm">استراتيجيات النمو والإدارة</Link></li>
              <li><Link to="/strategy" className="text-text-muted hover:text-primary transition-colors text-sm">التقارير المالية والتدفقات</Link></li>
            </ul>
          </div>

          {/* Column 2: الخدمات */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">قطاعات الأعمال والخدمات</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-text-muted hover:text-primary transition-colors text-sm">الأعمال الكهروميكانيكية (MEP)</Link></li>
              <li><Link to="/services" className="text-text-muted hover:text-primary transition-colors text-sm">المقاولات الإنشائية والتطوير السكني</Link></li>
              <li><Link to="/services" className="text-text-muted hover:text-primary transition-colors text-sm">تصنيع مجاري الهواء (Ducts)</Link></li>
              <li><Link to="/services" className="text-text-muted hover:text-primary transition-colors text-sm">حلول البنية التحتية ومعالجة المياه</Link></li>
            </ul>
          </div>

          {/* Column 3: المشاريع والفرص */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">المشاريع والتواصل</h4>
            <ul className="space-y-4">
              <li><Link to="/projects" className="text-text-muted hover:text-primary transition-colors text-sm">المشاريع المنجزة</Link></li>
              <li><Link to="/projects" className="text-text-muted hover:text-primary transition-colors text-sm">مشاريع قيد التنفيذ</Link></li>
              <li><Link to="/careers" className="text-text-muted hover:text-primary transition-colors text-sm">الوظائف والفرص الوظيفية</Link></li>
              <li><Link to="/contact" className="text-text-muted hover:text-primary transition-colors text-sm">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Join Us Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">تواصل معنا</h4>
            <p className="text-xs text-text-muted mb-4 leading-relaxed">
              تابع حساباتنا الرسمية للاطلاع على أحدث إنجازاتنا والمشاريع الحالية.
            </p>
            <div className="flex flex-wrap items-center gap-4 justify-start">
              {socialLinks.map((social, index) => {
                let Icon;
                if (social.platform === 'youtube') Icon = FaYoutube;
                else if (social.platform === 'facebook') Icon = FaFacebook;
                else if (social.platform === 'twitter') Icon = FaTwitter;
                else if (social.platform === 'instagram') Icon = FaInstagram;
                else if (social.platform === 'linkedin') Icon = FaLinkedin;
                else if (social.platform === 'tiktok') Icon = FaTiktok;
                else if (social.platform === 'snapchat') Icon = FaSnapchatGhost;
                
                if (!Icon) return null;
                
                return (
                  <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="text-text-muted hover:text-primary transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
              
              {/* Fallback if no social links in settings */}
              {socialLinks.length === 0 && (
                <>
                  <a href="#" aria-label="Youtube" className="text-text-muted hover:text-primary transition-colors"><FaYoutube className="w-5 h-5" /></a>
                  <a href="#" aria-label="Facebook" className="text-text-muted hover:text-primary transition-colors"><FaFacebook className="w-5 h-5" /></a>
                  <a href="#" aria-label="Twitter" className="text-text-muted hover:text-primary transition-colors"><FaTwitter className="w-5 h-5" /></a>
                  <a href="#" aria-label="Instagram" className="text-text-muted hover:text-primary transition-colors"><FaInstagram className="w-5 h-5" /></a>
                  <a href="#" aria-label="Linkedin" className="text-text-muted hover:text-primary transition-colors"><FaLinkedin className="w-5 h-5" /></a>
                </>
              )}
            </div>
          </div>
          
        </div>

        {/* Horizontal Line */}
        <hr className="border-t border-white/20 mb-6" />

        {/* Bottom: Copyright & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-text-muted gap-4">
          <p>© {new Date().getFullYear()} {settings.site_name || "Power Preparation"}. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-primary transition-colors">الشروط والأحكام</a>
            <a href="#" className="hover:text-primary transition-colors">خريطة الموقع</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
