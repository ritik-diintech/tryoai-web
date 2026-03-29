import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePreloader } from '../context/PreloaderContext';
import './Preloader.css';

gsap.registerPlugin(ScrollTrigger);

const Preloader = () => {
  const containerRef = useRef(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setIsPreloaderFinished } = usePreloader();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Simulated progress loading
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      // Slower increment for a more luxurious feel
      currentProgress += Math.floor(Math.random() * 5) + 1;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
      }
      setProgress(currentProgress);
    }, 80); // Quick updates, small increments

    const ctx = gsap.context(() => {
      // Basic reveal animation for logo
      gsap.fromTo('.char', 
        { y: '100%', rotateX: -45, opacity: 0 },
        {
          y: '0%',
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.5
        }
      );

      gsap.fromTo(['.preloader-tagline', '.progress-text'], 
        { opacity: 0, y: 15 },
        { 
          opacity: 0.7, 
          y: 0, 
          duration: 1, 
          delay: 1.2,
          ease: 'power3.out' 
        }
      );

      gsap.fromTo('.preloader-bar-fill', 
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 2.2, /* Snapshot matching loading simulation speed */
          ease: 'power2.inOut',
          delay: 0.2
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(progressInterval);
      document.body.style.overflow = '';
    };
  }, []);

  // Sync color wash and EXIT logic with Progress
  useEffect(() => {
    if (progress === 100) {
      // TRIGGER SNAPPY EXIT
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setIsRemoved(true);
          setIsPreloaderFinished(true);
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 50);
        }
      });

      // 1. FASTER FADE OUT for EVERYTHING (Branding + Loading bar) 
      // This leaves only the Colorful "Design" visible.
      exitTl.to('.preloader-content-inner', {
        opacity: 0,
        filter: 'blur(20px)',
        duration: 0.5,
        ease: 'power2.in'
      });

      // 2. The "CUT" DESIGN (Panels slide open)
      // This happens AFTER the text is gone, so only the color-wash splits.
      exitTl.to('.preloader-panel-top', {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut'
      }, 0.5);

      exitTl.to('.preloader-panel-bottom', {
        yPercent: 100,
        duration: 0.9,
        ease: 'power4.inOut'
      }, 0.5);

      // 3. Fade out the color wash wash background (revealing the website cleanly)
      exitTl.to('.preloader-color-wash', {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut'
      }, 0.9);
    }

    if (containerRef.current) {
      const radius = 10 + (progress * 1.5); 
      const colorOpacity = 0.3 + (progress / 100 * 0.7); 
      
      gsap.to('.preloader-color-wash', {
        clipPath: `circle(${radius}% at 0% 0%)`,
        opacity: colorOpacity,
        duration: 0.4,
        ease: 'none'
      });
    }
  }, [progress]);

  if (isRemoved) return null;

  return (
    <div className="preloader-container" ref={containerRef}>
      {/* Top Panel with its own Color Wash */}
      <div className="preloader-panel-top">
        <div className="preloader-color-wash top-wash"></div>
      </div>

      {/* Bottom Panel with its own Color Wash */}
      <div className="preloader-panel-bottom">
        <div className="preloader-color-wash bottom-wash"></div>
      </div>

      {/* Single Whole Branding Content */}
      <div className="preloader-content-inner">
        <div className="preloader-brand-box">
          <h1 className="preloader-main-title">
            {"TRYO".split("").map((char, i) => (
              <span key={`tryo-char-final-${i}`} className="char-wrap">
                <span className="char">{char}</span>
              </span>
            ))}
            <span className="char-wrap">
              <span className="char accent-char">AI</span>
            </span>
          </h1>
          <p className="preloader-tagline">VIRTUAL FASHION ARCHITECTURE</p>
        </div>
        
        <div className="preloader-loading-wrapper">
          <div className="preloader-modern-bar">
            <div className="preloader-bar-fill"></div>
          </div>
          <div className="progress-text">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
