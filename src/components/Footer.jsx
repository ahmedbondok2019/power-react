import React from 'react';
import Logo from './ui/Logo';
import { Link } from 'react-router-dom';
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-text-main pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top: Logo Centered */}
        <div className="flex justify-center mb-10">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo />
          </Link>
        </div>
        
        {/* Horizontal Line */}
        <hr className="border-t border-white/20 mb-10" />

        {/* Middle: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-right">
          
          {/* Column 1: عن الشركة */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">عن باور</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/about"
                  className="text-text-muted hover:text-primary transition-colors text-sm"
                >
                  من نحن ورؤيتنا
                </Link>
              </li>
              <li><Link to="/#هيكل-المجموعة" className="text-text-muted hover:text-primary transition-colors text-sm">هيكل المجموعة</Link></li>
              <li><Link to="/#استراتيجياتنا" className="text-text-muted hover:text-primary transition-colors text-sm">استراتيجيات النمو</Link></li>
              <li><Link to="/#مالية" className="text-text-muted hover:text-primary transition-colors text-sm">التقارير المالية</Link></li>
            </ul>
          </div>

          {/* Column 2: الخدمات */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">قطاعات الأعمال</h4>
            <ul className="space-y-4">
              <li><Link to="/#خدماتنا" className="text-text-muted hover:text-primary transition-colors text-sm">الأعمال الكهروميكانيكية (MEP)</Link></li>
              <li><Link to="/#خدماتنا" className="text-text-muted hover:text-primary transition-colors text-sm">المقاولات الإنشائية العامة</Link></li>
              <li><Link to="/#خدماتنا" className="text-text-muted hover:text-primary transition-colors text-sm">تصنيع مجاري الهواء (Ducts)</Link></li>
              <li><Link to="/#خدماتنا" className="text-text-muted hover:text-primary transition-colors text-sm">حلول معالجة المياه ومضخات KSB</Link></li>
            </ul>
          </div>

          {/* Column 3: المشاريع والفرص */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">المشاريع والتوظيف</h4>
            <ul className="space-y-4">
              <li><Link to="/#مشاريعنا" className="text-text-muted hover:text-primary transition-colors text-sm">المشاريع المنجزة</Link></li>
              <li><Link to="/#مشاريعنا" className="text-text-muted hover:text-primary transition-colors text-sm">مشاريع قيد التنفيذ</Link></li>
              <li><Link to="/#وظائف" className="text-text-muted hover:text-primary transition-colors text-sm">الوظائف والفرص الوظيفية</Link></li>
              <li><Link to="/#اتصل-بنا" className="text-text-muted hover:text-primary transition-colors text-sm">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Join Us Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">تواصل معنا</h4>
            <p className="text-xs text-text-muted mb-4 leading-relaxed">
              تابع حساباتنا الرسمية للاطلاع على أحدث إنجازاتنا والمشاريع الحالية.
            </p>
            <div className="flex items-center gap-4 justify-start">
              <a href="#" aria-label="Youtube" className="text-text-muted hover:text-primary transition-colors"><FaYoutube className="w-5 h-5" /></a>
              <a href="#" aria-label="Facebook" className="text-text-muted hover:text-primary transition-colors"><FaFacebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="text-text-muted hover:text-primary transition-colors"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="text-text-muted hover:text-primary transition-colors"><FaInstagram className="w-5 h-5" /></a>
              <a href="#" aria-label="Linkedin" className="text-text-muted hover:text-primary transition-colors"><FaLinkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
        </div>

        {/* Horizontal Line */}
        <hr className="border-t border-white/20 mb-6" />

        {/* Bottom: Copyright & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-text-muted gap-4">
          <p>© {new Date().getFullYear()} Power Preparation. جميع الحقوق محفوظة.</p>
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
