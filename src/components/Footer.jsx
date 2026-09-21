import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaSnapchatGhost } from 'react-icons/fa';
import { useSettingsData } from '../hooks/useSettingsData';
import LogoFallback from '../../public/logo.png';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { data: settingsData } = useSettingsData();
  const settings = settingsData?.data || {};
  const logoUrl = settings.logo || LogoFallback;
  const socialLinks = settings.social_links || [];
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-text-main pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top: Logo Centered */}
        <div className="flex justify-center mb-10">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logoUrl} alt={settings.site_name || "Egypt Vision"} className="h-20 md:h-28 w-auto object-contain" />
          </Link>
        </div>
        
        {/* Horizontal Line */}
        <hr className="border-t border-white/20 mb-10" />

        {/* Middle: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-start">
          
          {/* Column 1: About */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">{t.footer.aboutCompany} {settings.site_name ? settings.site_name.split(' ')[0] : ''}</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-text-muted hover:text-primary transition-colors text-sm">
                  {t.footer.aboutLink1}
                </Link>
              </li>
              <li><Link to="/about" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.aboutLink2}</Link></li>
              <li><Link to="/strategy" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.aboutLink3}</Link></li>
              <li><Link to="/strategy" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.aboutLink4}</Link></li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">{t.footer.servicesTitle}</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.servicesLink1}</Link></li>
              <li><Link to="/services" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.servicesLink2}</Link></li>
              <li><Link to="/services" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.servicesLink3}</Link></li>
              <li><Link to="/services" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.servicesLink4}</Link></li>
            </ul>
          </div>

          {/* Column 3: Projects */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">{t.footer.projectsTitle}</h4>
            <ul className="space-y-4">
              <li><Link to="/projects" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.projectsLink1}</Link></li>
              <li><Link to="/projects" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.projectsLink2}</Link></li>
              <li><Link to="/careers" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.projectsLink3}</Link></li>
              <li><Link to="/join-as-vendor" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.projectsLink4}</Link></li>
              <li><Link to="/contact" className="text-text-muted hover:text-primary transition-colors text-sm">{t.footer.projectsLink5}</Link></li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#EAB308]">{t.footer.followUs}</h4>
            <p className="text-xs text-text-muted mb-4 leading-relaxed">
              {t.footer.followUsDesc}
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
          <p>© {new Date().getFullYear()} {settings.site_name || "Power Preparation"}. {t.footer.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-primary transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-primary transition-colors">{t.footer.sitemap}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
