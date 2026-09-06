import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { MapPin, Phone, Mail, ArrowLeft, Settings, Play } from 'lucide-react';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black">
      {/* Hero Section */}
      <Hero
        id="contact-hero"
        badge="اتصل بنا"
        title={
          <>
            نحن هنا لنستمع إليك. <br />
            تواصل معنا اليوم.
          </>
        }
        subtitle={
          <div className="space-y-2 text-right">
            <p>
              فريقنا مستعد للإجابة على استفساراتك ومناقشة تفاصيل مشروعك القادم.
            </p>
          </div>
        }
        buttonText="ابدأ المحادثة"
        buttonLink="#contact-form"
        bgImage="/saudi_engineers_construction.jpg"
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
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white relative overflow-hidden"
            >
              {/* Subtle gradient overlay in form */}
              <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-[#1a365d] to-[#EAB308]"></div>
              
              <h2 className="text-3xl font-bold text-[#142642] mb-3">ابدأ محادثة حول مشروعك</h2>
              <p className="text-gray-500 mb-10 text-sm">أرسل لنا تفاصيل مشروعك وسيتواصل معك فريقنا.</p>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="relative group">
                  <input type="text" placeholder="الاسم الكامل" className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] transition-all duration-300" />
                </div>
                <div className="relative group">
                  <input type="email" placeholder="عنوان البريد الإلكتروني" className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] transition-all duration-300" />
                </div>
                <div className="relative group">
                  <input type="tel" placeholder="رقم الهاتف" className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] transition-all duration-300" />
                </div>
                <div className="relative group">
                  <input type="text" placeholder="سبب الاستفسار" className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] transition-all duration-300" />
                </div>
                <div className="relative group">
                  <textarea placeholder="رسالتك" rows={4} className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] transition-all duration-300 resize-none"></textarea>
                </div>
                
                <div className="pt-2">
                  <button type="submit" className="bg-[#1a365d] hover:bg-[#12284c] text-white rounded-full px-8 py-4 w-fit flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-[#1a365d]/20 mr-auto ml-0">
                    <span className="font-semibold">إرسال</span>
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Left Side: Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-6 space-y-14 mt-4"
            >
              <div>
                <h2 className="text-3xl font-bold text-[#142642] mb-14 relative inline-block">
                  معلومات التواصل
                </h2>
                
                <div className="space-y-10">
                  {/* Address */}
                  <div className="flex items-start gap-6 group">
                    <div>
                      <h4 className="text-lg font-bold text-[#142642] mb-3">العنوان</h4>
                      <p className="text-gray-500 leading-relaxed mb-4 text-sm max-w-sm">
                        مبنى رقم 6718، شارع الأمير ماجد بن<br />
                        عبد العزيز، الخبر الشمالية، المملكة العربية السعودية
                      </p>
                      <a href="#" className="text-[#1a365d] font-semibold flex items-center gap-2 hover:text-[#EAB308] transition-colors text-xs">
                        <span>احصل على اتجاهات</span>
                        <ArrowLeft className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-6 group">
                    <div>
                      <h4 className="text-lg font-bold text-[#142642] mb-3">الهاتف</h4>
                      <a href="tel:+9660512345678" className="text-gray-500 hover:text-[#EAB308] transition-colors inline-block text-sm" dir="ltr">
                        +966 (05) 12345678
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-6 group">
                    <div>
                      <h4 className="text-lg font-bold text-[#142642] mb-3">البريد الإلكتروني</h4>
                      <a href="mailto:info@info200.com" className="text-gray-500 hover:text-[#EAB308] transition-colors text-sm">
                        info@info 200.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-2">
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                    <span className="font-bold text-sm">in</span>
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                    <Play className="w-4 h-4 fill-current" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                    <span className="font-bold text-sm">X</span>
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transform hover:-translate-y-1">
                    <Settings className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
