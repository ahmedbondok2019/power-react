import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { MapPin, Phone, Mail, ArrowLeft, Settings, Play } from 'lucide-react';
import { useContactPageData } from '../hooks/useContactPageData';
import { sendContactMessage } from '../api/contactApi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaSnapchatGhost, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';

const ContactUs = () => {
  const { data: contactPageData, isLoading } = useContactPageData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await sendContactMessage(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resolvedData = contactPageData?.data || {};
  const heroData = resolvedData.hero_section || {};
  const formSectionData = resolvedData.form_section || {};
  const infoData = resolvedData.contact_info || {};
  const socialLinks = infoData.social_links || {};

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black">
      {/* Hero Section */}
      <Hero
        id="contact-hero"
        badge={heroData.badge || "اتصل بنا"}
        title={
          heroData.title ? (
            <span className="whitespace-pre-line">{heroData.title}</span>
          ) : (
            <>
              نحن هنا لنستمع إليك. <br />
              تواصل معنا اليوم.
            </>
          )
        }
        subtitle={
          <div className="space-y-2 text-right">
            {(heroData.paragraphs || []).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            {!heroData.paragraphs && (
              <p>{heroData.subtitle || "فريقنا مستعد للإجابة على استفساراتك ومناقشة تفاصيل مشروعك القادم."}</p>
            )}
          </div>
        }
        buttonText={heroData.button_text || "ابدأ المحادثة"}
        buttonLink={heroData.button_link || "#contact-form"}
        bgImage={heroData.image || "/saudi_engineers_construction.jpg"}
        showVisionLogo={false}
        showStatsCards={false}
      />

      {/* Main Contact Section */}
      <section id="contact-form" className="py-24 bg-[#f4f5f6] text-[#111312] relative overflow-hidden" dir="rtl">
        {/* Decorative elements for creativity */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAB308] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a365d] opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Right Side: Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white relative overflow-hidden"
            >
              {/* Subtle gradient overlay in form */}
              <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-[#1a365d] to-[#EAB308]"></div>
              
              <h2 className="text-3xl font-bold text-[#142642] mb-3">{formSectionData.title || "ابدأ محادثة حول مشروعك"}</h2>
              <p className="text-gray-500 mb-10 text-sm">{formSectionData.subtitle || "أرسل لنا تفاصيل مشروعك وسيتواصل معك فريقنا."}</p>
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="relative group">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="الاسم الكامل" className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] transition-all duration-300" />
                </div>
                <div className="relative group">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="عنوان البريد الإلكتروني" className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] transition-all duration-300" />
                </div>
                <div className="relative group">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="رقم الهاتف" className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] transition-all duration-300" />
                </div>
                <div className="relative group">
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="سبب الاستفسار" className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] transition-all duration-300" />
                </div>
                <div className="relative group">
                  <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="رسالتك" rows={4} className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] transition-all duration-300 resize-none"></textarea>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-[1.25rem] text-sm font-semibold">
                    تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-[1.25rem] text-sm font-semibold">
                    حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.
                  </div>
                )}

                <div className="pt-2">
                  <button type="submit" disabled={isSubmitting} className="bg-[#1a365d] hover:bg-[#12284c] disabled:opacity-70 text-white rounded-full px-8 py-4 w-fit flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-[#1a365d]/20 mr-auto ml-0">
                    <span className="font-semibold">{isSubmitting ? 'جاري الإرسال...' : (formSectionData.submit_button_text || 'إرسال')}</span>
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Left Side: Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-6 space-y-14 mt-4"
            >
              <div>
                <h2 className="text-3xl font-bold text-[#142642] mb-14 relative inline-block">
                  {infoData.title || "معلومات التواصل"}
                </h2>
                
                <div className="space-y-10">
                  {/* Address */}
                  {(infoData.address || infoData.address_title) && (
                    <div className="flex items-start gap-6 group">
                      <div>
                        <h4 className="text-lg font-bold text-[#142642] mb-3">{infoData.address_title || "العنوان"}</h4>
                        <p className="text-gray-500 leading-relaxed mb-4 text-sm max-w-sm">
                          {infoData.address || "مبنى رقم 6718، شارع الأمير ماجد بن عبد العزيز، الخبر الشمالية، المملكة العربية السعودية"}
                        </p>
                        {infoData.directions_link && (
                          <a href={infoData.directions_link} target="_blank" rel="noopener noreferrer" className="text-[#1a365d] font-semibold flex items-center gap-2 hover:text-[#EAB308] transition-colors text-xs">
                            <span>{infoData.directions_text || "احصل على اتجاهات"}</span>
                            <ArrowLeft className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {(infoData.phone || infoData.phone_title) && (
                    <div className="flex items-start gap-6 group">
                      <div>
                        <h4 className="text-lg font-bold text-[#142642] mb-3">{infoData.phone_title || "الهاتف"}</h4>
                        <div className="flex flex-col gap-2">
                          {infoData.phone && (
                            <a href={`tel:${infoData.phone}`} className="text-gray-500 hover:text-[#EAB308] transition-colors inline-block text-sm" dir="ltr">
                              {infoData.phone}
                            </a>
                          )}
                          {infoData.phone2 && (
                            <a href={`tel:${infoData.phone2}`} className="text-gray-500 hover:text-[#EAB308] transition-colors inline-block text-sm" dir="ltr">
                              {infoData.phone2}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {(infoData.email || infoData.email_title) && (
                    <div className="flex items-start gap-6 group">
                      <div>
                        <h4 className="text-lg font-bold text-[#142642] mb-3">{infoData.email_title || "البريد الإلكتروني"}</h4>
                        <div className="flex flex-col gap-2">
                          {infoData.email && (
                            <a href={`mailto:${infoData.email}`} className="text-gray-500 hover:text-[#EAB308] transition-colors text-sm">
                              {infoData.email}
                            </a>
                          )}
                          {infoData.email2 && (
                            <a href={`mailto:${infoData.email2}`} className="text-gray-500 hover:text-[#EAB308] transition-colors text-sm">
                              {infoData.email2}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media */}
              {Object.keys(socialLinks).length > 0 && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.linkedin && (
                      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                        <FaLinkedinIn className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {socialLinks.youtube && (
                      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                        <FaYoutube className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {socialLinks.twitter && (
                      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                        <FaTwitter className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {socialLinks.facebook && (
                      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                        <FaFacebookF className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {socialLinks.instagram && (
                      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                        <FaInstagram className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {socialLinks.tiktok && (
                      <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                        <FaTiktok className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {socialLinks.snapchat && (
                      <a href={socialLinks.snapchat} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                        <FaSnapchatGhost className="w-4 h-4 fill-current" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

          </div>
          
          {/* Map Section */}
          {infoData.maps_iframe && (
            <div className="mt-20 rounded-3xl overflow-hidden shadow-xl h-[400px]">
              <iframe
                src={infoData.maps_iframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
