import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CINEMATIC HOME PAGE ANIMATION SYSTEM
 * ─────────────────────────────────────
 * All animations are additive — they layer on top of the existing
 * design without touching HTML structure, CSS classes, or Framer Motion.
 *
 * Sections animated:
 *  01. Hero       – scroll-driven zoom-out + parallax text
 *  02. About      – section wipe-in + GSAP counters
 *  03. Services   – sequential stagger reveal with depth
 *  04. Group      – dark palette transition + logo stagger
 *  05. Projects   – clip-path card reveals + inner image parallax
 *  06. Clients    – CSS marquee speed reduced
 *  07. News Cards – staggered scale+clip-path entrance
 */
export function initCinematicAnimations() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return () => {};

  const ctx = gsap.context(() => {

    // ────────────────────────────────────────────────────────────────
    // 01. HERO — scroll-scrub zoom-out + headline parallax
    // ────────────────────────────────────────────────────────────────
    const heroSection = document.querySelector('#الرئيسية');

    if (heroSection) {
      const heroBgImg = heroSection.querySelector('img, video');
      const heroBgWrapper = heroBgImg?.parentElement;
      const heroH1 = heroSection.querySelector('h1');
      const heroSubtitle = heroSection.querySelector('.text-white\\/80');

      // Start bg at 1.12 scale — scrub back to 1.0 as user scrolls
      if (heroBgWrapper) {
        gsap.fromTo(heroBgWrapper, { scale: 1.12 }, {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
            invalidateOnRefresh: true,
          },
        });
      }

      // Headline drifts up slower than scroll (parallax depth)
      if (heroH1) {
        gsap.to(heroH1, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 2.5,
            invalidateOnRefresh: true,
          },
        });
      }

      if (heroSubtitle) {
        gsap.to(heroSubtitle, {
          y: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 3,
            invalidateOnRefresh: true,
          },
        });
      }
    }

    // ────────────────────────────────────────────────────────────────
    // 02. ABOUT — clip-path reveals + premium GSAP counters
    // ────────────────────────────────────────────────────────────────
    const aboutSection = document.querySelector('#من-نحن');

    if (aboutSection) {
      // Text content wipes up
      const textChildren = aboutSection.querySelectorAll(
        'h2, h3, p, a[href="/about"], a[href*="about"]'
      );
      textChildren.forEach((el, i) => {
        gsap.fromTo(el,
          { clipPath: 'inset(0 0 100% 0)', y: 16, opacity: 0 },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            opacity: 1,
            duration: 1.0,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutSection,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      // Stat cards — staggered scale-in
      const statCards = aboutSection.querySelectorAll('.rounded-2xl');
      statCards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 36, scale: 0.88 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            delay: i * 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutSection,
              start: 'top 78%',
              once: true,
            },
          }
        );

        // GSAP counter animation on stat numbers
        const numEl = card.querySelector('span > span');
        if (numEl) {
          const raw = numEl.textContent.replace(/[^0-9]/g, '');
          const target = parseInt(raw, 10);
          if (!isNaN(target)) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2.0,
              delay: 0.3 + i * 0.18,
              ease: 'power2.out',
              onUpdate: () => {
                numEl.textContent = `+${Math.floor(obj.val)}`;
              },
              scrollTrigger: {
                trigger: aboutSection,
                start: 'top 78%',
                once: true,
              },
            });
          }
        }
      });
    }

    // ────────────────────────────────────────────────────────────────
    // 03. SERVICES — sequential depth stagger (existing grid preserved)
    // ────────────────────────────────────────────────────────────────
    const servicesSection = document.querySelector('#خدماتنا');

    if (servicesSection) {
      // Section heading wipe
      const servHeading = servicesSection.querySelector('h2, [class*="SectionTitle"]');
      if (servHeading) {
        gsap.fromTo(servHeading,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
            scrollTrigger: { trigger: servicesSection, start: 'top 80%', once: true },
          }
        );
      }

      // Each service card — reveal with increasing delay and slight Y offset
      const serviceCards = servicesSection.querySelectorAll(
        '.rounded-\\[22px\\], [class*="ImageOverlayCard"], .group.relative.rounded'
      );

      serviceCards.forEach((card, i) => {
        // Card container reveal
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.93, filter: 'blur(3px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: servicesSection,
              start: 'top 70%',
              once: true,
            },
          }
        );

        // Inner image parallax on hover is handled by existing CSS
        // Add subtle entrance scale on the image itself
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(img,
            { scale: 1.1 },
            {
              scale: 1,
              duration: 1.4,
              delay: i * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: servicesSection,
                start: 'top 70%',
                once: true,
              },
            }
          );
        }
      });
    }

    // ────────────────────────────────────────────────────────────────
    // 04. GROUP STRUCTURE — dark palette + logo cascade
    // ────────────────────────────────────────────────────────────────
    const groupSection = document.querySelector('#هيكل-المجموعة');

    if (groupSection) {
      // Main logo reveal
      const mainLogo = groupSection.querySelector('img[alt*="Power"]');
      if (mainLogo) {
        gsap.fromTo(mainLogo,
          { opacity: 0, x: 40, filter: 'blur(6px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 1.3, ease: 'power3.out',
            scrollTrigger: { trigger: groupSection, start: 'top 80%', once: true },
          }
        );
      }

      // All company logos — staggered cascade
      const allLogos = groupSection.querySelectorAll('img:not([alt*="Power"])');
      gsap.fromTo(allLogos,
        { opacity: 0, y: 28, scale: 0.85, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.0,
          stagger: {
            each: 0.12,
            from: 'start',
            ease: 'power1.inOut',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: groupSection,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Section headings
      const groupHeadings = groupSection.querySelectorAll('h2, h3');
      groupHeadings.forEach((h, i) => {
        gsap.fromTo(h,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.9, delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: { trigger: groupSection, start: 'top 80%', once: true },
          }
        );
      });
    }

    // ────────────────────────────────────────────────────────────────
    // 05. PROJECTS — background subtle depth & parallax
    // ────────────────────────────────────────────────────────────────
    const projectsSection = document.querySelector('#مشاريعنا');

    if (projectsSection) {
      const projectCards = projectsSection.querySelectorAll(
        '.rounded-\\[22px\\], .rounded-\\[18px\\], [class*="max-w-\\[529px\\"]'
      );

      projectCards.forEach((card) => {
        const img = card.querySelector('img');
        if (img) {
          // Subtle vertical parallax on scroll (image moves slower than card)
          gsap.to(img, {
            y: -25,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      });
    }

    // ────────────────────────────────────────────────────────────────
    // 06. HALL OF FAME — logos fade in, section title reveal
    // ────────────────────────────────────────────────────────────────
    const hallSection = document.querySelector(
      'section:has([alt*="amazon"]), section:has([alt*="Almarai"])'
    );

    if (hallSection) {
      const hallHeading = hallSection.querySelector('h2, [class*="SectionTitle"]');
      if (hallHeading) {
        gsap.fromTo(hallHeading,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: hallSection, start: 'top 85%', once: true },
          }
        );
      }
    }

    // ────────────────────────────────────────────────────────────────
    // 07. NEWS / FEATURED CARDS — staggered clip-path card entries
    // ────────────────────────────────────────────────────────────────
    // Target the last section before footer (FeaturedProjectsCards)
    const newsCards = document.querySelectorAll(
      '.max-w-\\[410px\\].rounded-\\[24px\\]'
    );

    newsCards.forEach((card, i) => {
      const img = card.querySelector('img');

      gsap.fromTo(card,
        {
          clipPath: 'inset(10% 0 0 0 round 24px)',
          opacity: 0,
          y: 28,
        },
        {
          clipPath: 'inset(0% 0 0 0 round 24px)',
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: i * 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        }
      );

      if (img) {
        gsap.fromTo(img,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1.5,
            delay: i * 0.18,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    });

  }); // end gsap.context

  // Return cleanup function
  return () => ctx.revert();
}
