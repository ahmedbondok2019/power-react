import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Container from './components/ui/Container';
import SlideNavigator from './components/ui/SlideNavigator';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';

  // Initialize Smooth Scrolling (Lenis) for the cinematic feel
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle hash scrolling if navigating with hash
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.substring(1));
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Top Presentation Slide Navigator (on Home page) */}
      {isHomePage && !location.hash && <SlideNavigator />}

      <Container className="relative">
        <Navbar />
        
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/our-projects" element={<Projects />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer />
      </Container>
    </div>
  );
}

export default App;
