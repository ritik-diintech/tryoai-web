import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import imgVision from '../assets/images/girlfeshon.jpg'
import imgTeam from '../assets/images/dressTrial.jpg'
import imgHero from '../assets/tryoImage/mobileDress4.jpeg'
import imgGroupModels from '../assets/indianTryo/womanGreenDRess.jpeg'
import imgLimitless from '../assets/indianTryo/attractiveDress2.jpeg'

import { usePreloader } from '../context/PreloaderContext'
import './About.css'

const framesGlob = import.meta.glob('../assets/aboutClothChanging/*.jpg', { eager: true });
const frameUrls = Object.keys(framesGlob).sort().map(key => framesGlob[key].default);

gsap.registerPlugin(ScrollTrigger)

const values = [
  { title: 'AI Try-On Tech', desc: 'We enable customers to virtually try on clothes before purchasing, drastically reducing returns and increasing satisfaction.' },
  { title: 'Mobile & In-Store', desc: 'Our solutions seamlessly work on mobile devices for at-home trials or in-store on smart mirrors and displays.' },
  { title: 'Quick Implement', desc: 'Get up and running in days, not months, with our sophisticated turnkey solution and expert support team.' },
  { title: 'Ironclad Privacy', desc: 'Customer data is securely handled with enterprise-grade encryption and privacy measures. Safety is paramount.' },
]

const milestones = [
  { year: '2022', event: 'Founded with a vision to modernize fashion store trial rooms globally.' },
  { year: '2023', event: 'Launched beta smart mirrors with top 10 luxury retail partners.' },
  { year: '2024', event: 'Expanded to comprehensive E-commerce API integrations.' },
  { year: '2025', event: 'Reached 50M+ seamless digital shopping sessions.' },
  { year: '2026', event: 'Rolling out advanced analytics dashboards for global brands.' },
]

export default function About() {
  const pageRef = useRef(null)
  const canvasRef = useRef(null)
  const clothChangeContainerRef = useRef(null)
  const { isPreloaderFinished } = usePreloader();

  useEffect(() => {
    if (!isPreloaderFinished) return;

    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-title-line', {
        y: 150,
        opacity: 0,
        rotateX: -45,
        stagger: 0.15,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.2
      });

      gsap.from('.hero-desc-line', {
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.8
      });

      // Vision Image Parallax
      gsap.to('.vision-img-parallax', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-vision',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Statement Scrub
      gsap.fromTo('.statement-text',
        { backgroundPositionX: '100%' },
        {
          backgroundPositionX: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-statement',
            start: 'top 80%',
            end: 'center center',
            scrub: 1
          }
        }
      );

      // Values List
      gsap.utils.toArray('.about-value-item').forEach((item) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%'
          }
        });
      });

      // Timeline Progress
      gsap.fromTo('.timeline-progress-bar',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top center',
            end: 'bottom center',
            scrub: true
          }
        }
      );

      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%'
          }
        });
      });

      // Cloth Changing Canvas Animation (Shared with Home)
      if (canvasRef.current && clothChangeContainerRef.current) {
        const canvas = canvasRef.current;
        const ctxCanvas = canvas.getContext('2d');

        const updateCanvasSize = () => {
          if (clothChangeContainerRef.current) {
            canvas.width = clothChangeContainerRef.current.clientWidth;
            canvas.height = clothChangeContainerRef.current.clientHeight;
          }
        };
        updateCanvasSize();

        const images = [];
        const frameState = { frame: 0 };

        const render = () => {
          if (images[frameState.frame] && images[frameState.frame].complete) {
            const img = images[frameState.frame];
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = window.innerWidth < 900 ? 0 : (canvas.width - img.width * ratio) / 2;
            const centerShift_y = 0;

            ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
            ctxCanvas.drawImage(img, 0, 0, img.width, img.height,
              centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
          }
        };

        for (let i = 0; i < frameUrls.length; i++) {
          const img = new Image();
          img.src = frameUrls[i];
          img.onload = () => {
            if (i === 0) render();
          };
          images.push(img);
        }

        gsap.to(frameState, {
          frame: frameUrls.length - 1,
          snap: 'frame',
          ease: 'none',
          scrollTrigger: {
            trigger: clothChangeContainerRef.current,
            start: 'top 65px',
            end: '+=400%',
            scrub: 1.2,
            pin: true,
            anticipatePin: 1
          },
          onUpdate: render
        });

        const handleResize = () => {
          updateCanvasSize();
          render();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }

    }, pageRef)
    return () => ctx.revert()
  }, [isPreloaderFinished])

  return (
    <main ref={pageRef} className="about-page" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ── HERO ── */}
      <section className="about-hero section-fullscreen" id="about-hero" style={{
        overflow: 'hidden',
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0' /* Space for navbar */
      }}>
        <div className="about-hero__bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <img src={imgHero} alt="Fashion Hero" className="img-parallax" style={{ width: '100%', height: '110%', objectFit: 'cover', filter: 'brightness(0.5) contrast(1.1)', objectPosition: 'center 20%' }} />
          {/* Subtle vignette for better text readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.4) 100%)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(217, 227, 228, 0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)', zIndex: 1 }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content-modern" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
              <span className="hero-subtitle hero-desc-line italic-accent" style={{
                display: 'inline-block',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.8)',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '0.5rem'
              }}>
                Our Philosophy
              </span>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <h1 className="hero-title-line about-hero-title" style={{
                textTransform: 'uppercase',
                color: '#fff',
                margin: '0 0 1rem 0',
                lineHeight: '1.1',
                fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}>
                Redefining the <br />
                <span className="gradient-stroke-heading">Digital</span> Experience.
              </h1>
            </div>

            <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
              <p className="hero-desc-line" style={{
                marginTop: '1.5rem',
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '600px',
                lineHeight: '1.6',
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                fontWeight: 400
              }}>
                At TryOAI, we're merging high-fashion sensibilities with advanced neural networks to create the world's most seamless virtual fitting experience.
              </p>
            </div>

            <div className="hero-desc-line" style={{ marginTop: '4rem' }}>
              <div style={{
                width: '1px',
                height: '100px',
                background: 'linear-gradient(to bottom, #fff, transparent)',
                margin: '0 auto',
                animation: 'scrollDown 2s infinite'
              }}></div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollDown {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.1% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>

      {/* ── VISION ── */}
      <section className="about-vision section bg-theme-offwhite-premium" id="about-vision" style={{ padding: '10rem 0' }}>
        <div className="container">
          <div className="grid-split-half align-center">
            <div className="vision-text-col" style={{ paddingRight: '2rem' }}>
              <h2 className="heading-lg mb-6">Fashion should be <br /><span style={{ color: 'var(--color-primary)' }}>limitless.</span></h2>
              <p className="text-md text-secondary mb-6" style={{ lineHeight: 1.7 }}>
                We founded TryOAI because we believe the trial room experience is broken. It takes too much time, causes bottleneck queues in-store, and results in massive product returns online.
              </p>
              <p className="text-md text-secondary" style={{ lineHeight: 1.7 }}>
                Our mission is to rethink fashion trials in the AI era. By creating innovative solutions that seamlessly work across mobile apps, e-commerce stores, and smart mirrors, we save time and dramatically improve customer engagement.
              </p>
            </div>
            <div className="vision-img-col" style={{ position: 'relative', height: '65vh' }}>
              <div className="vision-img-stack-1" style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '80%',
                height: '80%',
                overflow: 'hidden',
                borderRadius: '16px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                zIndex: 1,
                border: '2px solid transparent',
                background: 'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)) padding-box, linear-gradient(135deg, #667eea, #a78bfa, #f093fb, #5ee7df) border-box',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: '4px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.zIndex = '3';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.zIndex = '1';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
              }}>
                <img src={imgGroupModels} alt="Vision 1" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              </div>
              <div className="vision-img-stack-2" style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '70%',
                height: '70%',
                overflow: 'hidden',
                borderRadius: '16px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                zIndex: 2,
                border: '2px solid transparent',
                background: 'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)) padding-box, linear-gradient(135deg, #667eea, #a78bfa, #f093fb, #5ee7df) border-box',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: '4px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-20px) scale(1.04) rotate(-1deg)';
                e.currentTarget.style.boxShadow = '0 40px 80px rgba(102, 126, 234, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.2)';
              }}>
                <img src={imgLimitless} alt="Vision 2" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section className="about-statement section bg-theme-gradient-1" id="about-statement" style={{ padding: '10rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container text-center">
          <p className="statement-text heading-xl" style={{
            maxWidth: '1200px', margin: '0 auto',
            background: 'linear-gradient(90deg, var(--color-text) 50%, rgba(0,0,0,0.1) 50%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1.1,
            textTransform: 'uppercase'
          }}>
            "We don't want to simply change fashion. We want to unlock its true potential."
          </p>
        </div>
      </section>

      {/* ── CLOTH CHANGING FRAMES ── */}
      <section ref={clothChangeContainerRef} className="cloth-changing-section section" id="about-cloth-changing">
        <canvas ref={canvasRef} className="cloth-changing-canvas"></canvas>
        <div className="cloth-changing-text-overlay">
          <h2 className="italic-accent">Evolution</h2>
          <p className="text-secondary" style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Crafting tomorrow's wardrobe</p>
        </div>
      </section>

      {/* ── VALUES LIST ── */}
      <section className="about-values section bg-theme-offwhite-premium" id="about-values" style={{ padding: '10rem 0' }}>
        <div className="container">
          <h2 className="heading-xl mb-12 italic-accent">Core<br />Principles</h2>

          <div className="about-values-list" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {values.map((v, i) => (
              <div key={i} className="about-value-item">
                <span className="about-value-index text-gradient">0{i + 1}</span>
                <div className="about-value-content">
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="about-timeline section bg-theme-gradient-2" id="about-timeline" style={{ padding: '10rem 0', position: 'relative' }}>
        <div className="container mb-16 text-center">
          <h2 className="heading-xl italic-accent">Our<br />Journey</h2>
        </div>

        <div className="timeline-container container" style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          <div className="timeline-line-bg" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'rgba(0,0,0,0.1)', transform: 'translateX(-50%)' }}></div>
          <div className="timeline-progress-bar" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--color-primary)', transform: 'translateX(-50%)', transformOrigin: 'top center' }}></div>

          {milestones.map((m, i) => (
            <div key={i} className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', padding: '3rem 0', position: 'relative', width: '100%' }}>

              <div className="timeline-dot" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', border: '2px solid var(--color-primary)', zIndex: 2 }}></div>

              <div className="timeline-content-box" style={{ width: '45%', textAlign: i % 2 === 0 ? 'right' : 'left', padding: i % 2 === 0 ? '0 3rem 0 0' : '0 0 0 3rem' }}>
                <span className="timeline-year heading-lg text-gradient" style={{ display: 'block', marginBottom: '0.5rem' }}>{m.year}</span>
                <p className="text-md text-secondary" style={{ lineHeight: 1.6 }}>{m.event}</p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER PRE-CTA ── */}
      <section className="about-cta section bg-theme-offwhite-premium" id="about-cta" style={{ padding: '10rem 0 5rem 0' }}>
        <div className="container" style={{ padding: 'var(--space-2xl) var(--container-padding)', borderTop: '1px solid var(--color-border)' }}>
          <div className="grid-split-half align-center" style={{ gap: '2rem' }}>
            <div className="grid-left">
              <h2 className="heading-huge" style={{ lineHeight: '1', textTransform: 'uppercase' }}>Ready to<br />Transform?</h2>
            </div>
            <div className="grid-right text-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <p className="text-lg text-secondary mb-8" style={{ marginLeft: 'auto', maxWidth: '400px', lineHeight: 1.6 }}>
                Join leading brands in modernizing their trial rooms and e-commerce platforms with premium AI Try-On experiences.
              </p>
              <Link to="/contact" className="heading-md" style={{ textDecoration: 'underline', textUnderlineOffset: '8px', color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--color-text)'}>
                BOOK A DEMO
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
