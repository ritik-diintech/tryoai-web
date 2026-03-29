import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import heroImg1 from '../assets/indianTryo/plateform1.jpeg'
import heroImg2 from '../assets/indianTryo/plateform2.png'
import heroImg3 from '../assets/indianTryo/plateform3.png'
import heroImg4 from '../assets/indianTryo/plateform4.png'
import heroImg5 from '../assets/indianTryo/plateform5.png'
import wall1 from '../assets/tryoImage/girl-dress2-try2.png'
import wall2 from '../assets/tryoImage/man-hoddeytry.jpeg'
import wall3 from '../assets/tryoImage/groupOfModel2.jpeg'
import wall4 from '../assets/tryoImage/cardsfashon3.jpeg'
import wall5 from '../assets/tryoImage/cardfashon2.jpeg'
import wall6 from '../assets/tryoImage/woman-tshirtTry2.jpeg'

import stack1 from '../assets/indianTryo/mobileIndeianDRess2.jpeg'
import stack2 from '../assets/indianTryo/twoWomanSameDREss.jpeg'
import stack3 from '../assets/indianTryo/womanCards3.jpeg'
import stack4 from '../assets/indianTryo/womanRedDress.jpeg'

import feat1Before from '../assets/indianTryo/manTry1-image1.jpeg'
import feat1After from '../assets/indianTryo/manTry1-image2.png'
import feat2Before from '../assets/indianTryo/womanTry1-image1.png'
import feat2After from '../assets/indianTryo/womanTry2-image2.png'
import feat3Before from '../assets/tryoImage/girl-dress1-try.jpg'
import feat3After from '../assets/tryoImage/girl-dress1-try2.png'
import feat4Before from '../assets/tryoImage/man-dress1-try1.png'
import feat4After from '../assets/tryoImage/man-dress1-try2.png'

// 5 New Platform Showcase Images
import imgPlat1 from '../assets/indianTryo/womanGreenDrees2.jpeg'
import imgPlat2 from '../assets/indianTryo/verticalMobiledress3.jpeg'
import imgPlat3 from '../assets/indianTryo/womanREdLahnga.jpeg'
import imgPlat4 from '../assets/tryoImage/mansuit-try.jpeg'
import imgPlat5 from '../assets/tryoImage/mobileDress2.jpeg'
import imgUpload1 from '../assets/tryoImage/uploadImage1.jpeg'

import { usePreloader } from '../context/PreloaderContext'
import './Platform.css'

gsap.registerPlugin(ScrollTrigger)

// BeforeAfterSlider Component for Pillars (Matched to Home)
const PillarBeforeAfter = ({ beforeImg, afterImg }) => {
  const sliderRef = useRef(null);
  const imgAfterRef = useRef(null);
  const handleRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const imgAfter = imgAfterRef.current;
    const handle = handleRef.current;
    const divider = dividerRef.current;

    if (!slider || !imgAfter || !handle || !divider) return;

    let isDragging = false;

    const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      let x = e.clientX || (e.touches && e.touches[0].clientX);
      let rect = slider.getBoundingClientRect();
      let newX = x - rect.left;
      newX = Math.max(0, Math.min(newX, rect.width));

      imgAfter.style.clipPath = `inset(0 ${rect.width - newX}px 0 0)`;
      handle.style.left = `${newX}px`;
      divider.style.left = `${newX}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
    };

    const onMouseDown = (e) => {
      isDragging = true;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);
      onMouseMove(e);
    };

    handle.addEventListener('mousedown', onMouseDown);
    handle.addEventListener('touchstart', onMouseDown);

    // Initial setup
    const initialPosition = slider.clientWidth / 2;
    imgAfter.style.clipPath = `inset(0 ${slider.clientWidth - initialPosition}px 0 0)`;
    handle.style.left = `${initialPosition}px`;
    divider.style.left = `${initialPosition}px`;

    return () => {
      handle.removeEventListener('mousedown', onMouseDown);
      handle.removeEventListener('touchstart', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
    };
  }, []);

  return (
    <div className="before-after-slider" ref={sliderRef} style={{ maxWidth: 'none', borderRadius: '0' }}>
      <img src={beforeImg} alt="Before" className="before-img" />
      <img src={afterImg} alt="After" className="after-img" ref={imgAfterRef} />
      <div className="slider-divider" ref={dividerRef}></div>
      <div className="slider-handle" ref={handleRef}>
        <div className="handle-arrow left"></div>
        <div className="handle-arrow right"></div>
      </div>
      <span className="slider-label before-label">Before</span>
      <span className="slider-label after-label" style={{ right: '1.5rem', left: 'auto' }}>After</span>
    </div>
  );
};

export default function Platform() {
  const pageRef = useRef(null)
  const { isPreloaderFinished } = usePreloader();

  useEffect(() => {
    if (!isPreloaderFinished) return;
    const delayBase = 0.2;

    let ctx = gsap.context(() => {
      // ── HERO REVEAL ──
      gsap.from('.hero-title span > span', {
        y: 120, opacity: 0, stagger: 0.1, duration: 1.8, ease: 'power4.out', delay: delayBase
      })
      gsap.from('.hero-img-wrap', {
        scale: 0.8, opacity: 0, duration: 2, ease: 'expo.out', delay: delayBase + 0.4
      })

      // Hero Image Slideshow WITHIN the card
      const heroImages = gsap.utils.toArray('.platform-hero-img');
      if (heroImages.length > 0) {
        gsap.set(heroImages, { opacity: 0 });
        gsap.set(heroImages[0], { opacity: 1 });

        const heroTl = gsap.timeline({ repeat: -1 });
        heroImages.forEach((img, i) => {
          const nextIndex = (i + 1) % heroImages.length;
          const nextImg = heroImages[nextIndex];

          heroTl.to(img, {
            opacity: 0,
            duration: 1.2,
            ease: 'power2.inOut'
          }, `+=${2}`)
            .to(nextImg, {
              opacity: 1,
              duration: 1.2,
              ease: 'power2.inOut'
            }, '<');
        });
      }

      // ── MASONRY WALL PARALLAX ──
      gsap.utils.toArray('.wall-item').forEach(el => {
        gsap.to(el.querySelector('img'), {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })

      // ── STICKY HORIZONTAL SCROLL ──
      const pinSection = document.querySelector('.horizontal-pin-section')
      const horizontalTrack = document.querySelector('.horizontal-track')
      if (pinSection && horizontalTrack) {
        let scrollWidth = horizontalTrack.scrollWidth - window.innerWidth
        gsap.to(horizontalTrack, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: pinSection,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: `+=${scrollWidth}`
          }
        })
      }

      // ── PILLARS FADE & SLIDE ──
      gsap.utils.toArray('.pillar-card').forEach((card, i) => {
        gsap.from(card, {
          y: 80, opacity: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' }
        })
      })

      // Platform Ecosystem Staggered Reveal
      const ecoItems = gsap.utils.toArray('.plat-eco-item');
      ecoItems.forEach((item, i) => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          rotateX: 10,
          scale: 0.95,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
          }
        });
      });

      gsap.from('.plat-eco-header', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.plat-eco-header',
          start: 'top 85%'
        }
      });

    }, pageRef)

    return () => ctx.revert()
  }, [isPreloaderFinished])

  return (
    <main ref={pageRef} className="platform-page">

      {/* ── 01. HERO SECTION ── */}
      <section className="platform-hero">
        <div className="container" style={{ padding: '0 2rem' }}>
          <div className="hero-text-center">
            <h1 className="hero-title">
              <span className="inline-block overflow-hidden"><span className="block">Architecting</span></span><br />
              <span className="inline-block overflow-hidden"><span className="block italic-accent font-light">the Future</span></span><br />
              <span className="inline-block overflow-hidden"><span className="block">of Retail.</span></span>
            </h1>
          </div>
          <div className="hero-img-container">
            <div className="hero-img-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={heroImg1} alt="Platform 1" className="platform-hero-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src={heroImg2} alt="Platform 2" className="platform-hero-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src={heroImg3} alt="Platform 3" className="platform-hero-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src={heroImg4} alt="Platform 4" className="platform-hero-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src={heroImg5} alt="Platform 5" className="platform-hero-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="hero-data">
              <p className="overline-text">Neural Physics Core</p>
              <p className="desc-text">From distributed rendering to absolute precision fit. Enter the new paradigm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. ASYMMETRIC EDITORIAL WALL ── */}
      <section className="wall-section bg-theme-offwhite-premium section">
        <div className="container">
          <div className="wall-header">
            <h2 className="heading-huge uppercase">Institutional<br /><span className="outline-text">Scale</span></h2>
            <p className="wall-subtitle">Reliable. Massive. Distinct.</p>
          </div>

          <div className="masonry-grid-luxury">
            <div className="flex flex-col">
              <div className="wall-item item-1 mt-0"><img src={wall1} alt="Fashion" /></div>
              <div className="wall-item item-4 mt-20"><img src={wall4} alt="Fashion" /></div>
            </div>
            <div className="flex flex-col pt-32">
              <div className="wall-item item-2 mt-0"><img src={wall2} alt="Fashion" /></div>
              <div className="wall-item item-5 mt-20"><img src={wall5} alt="Fashion" /></div>
            </div>
            <div className="flex flex-col pt-16">
              <div className="wall-item item-3 mt-0"><img src={wall3} alt="Fashion" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. HORIZONTAL CAPABILITY SCROLL ── */}
      <section className="horizontal-pin-section bg-theme-dark">
        <div className="horizontal-track">
          {/* Slide 1 - Intro */}
          <div className="h-slide text-slide">
            <span className="overline-text-light">[ CAPABILITY METRICS ]</span>
            <h2 className="heading-large-light mt-8">Precision<br />Mesh Logic.</h2>
            <p className="p-light mt-8">Calculated body estimation using advanced point-cloud reconstruction ensures every highlight sits correctly.</p>
            <div className="line-divider mt-12"></div>
          </div>
          {/* Slide 2 */}
          <div className="h-slide img-slide">
            <div className="img-frame"><img src={stack1} alt="Mobile Fit" /></div>
            <div className="slide-caption">01. Mobile Adaptive</div>
          </div>
          {/* Slide 3 */}
          <div className="h-slide img-slide">
            <div className="img-frame"><img src={stack2} alt="Upload Experience" /></div>
            <div className="slide-caption">02. Seamless Upload</div>
          </div>
          {/* Slide 4 */}
          <div className="h-slide img-slide">
            <div className="img-frame"><img src={stack3} alt="Render Quality" /></div>
            <div className="slide-caption">03. Realtime Render</div>
          </div>
          {/* Slide 5 */}
          <div className="h-slide img-slide">
            <div className="img-frame"><img src={stack4} alt="Multi-device" /></div>
            <div className="slide-caption">04. Omnichannel Distribution</div>
          </div>
        </div>
      </section>

      {/* ── 04. VISIONARY PILLARS ── */}
      <section className="pillars-section bg-theme-offwhite-premium section">
        <div className="container">
          <div className="pillars-header">
            <h2 className="heading-huge">The Visionary<br /><span className="italic-accent">Pillars</span></h2>
            <p className="p-dark">Every asset is processed against our neural physics core, achieving studio results in milliseconds.</p>
          </div>

          <div className="pillars-grid">
            {[
              { before: feat1Before, after: feat1After, num: '01', title: 'Fabric Dynamics', detail: 'Physics-based tension mapping.' },
              { before: feat2Before, after: feat2After, num: '02', title: 'Global Shadows', detail: 'Real-time raytraced lighting.' },
              { before: feat3Before, after: feat3After, num: '03', title: 'Session Speed', detail: 'Ultra-low latency rendering.' },
              { before: feat4Before, after: feat4After, num: '04', title: 'Data Privacy', detail: 'Face-anonymized sessions.' }
            ].map((pill, i) => (
              <div key={i} className="pillar-card pointer-events-none">
                <div className="pillar-img-wrap pointer-events-auto">
                  <PillarBeforeAfter beforeImg={pill.before} afterImg={pill.after} />
                  <div className="pillar-num" style={{ zIndex: 10 }}>{pill.num}</div>
                </div>
                <div className="pillar-content">
                  <h4 className="pillar-title">{pill.title}</h4>
                  <p className="pillar-desc">{pill.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CINEMATIC FILMSTRIP PORTAL - OMNI-CHANNEL ── */}
      <section className="platform-ecosystem-section">
        <div className="container">
          <div className="plat-eco-header text-center mb-32">
            <span className="overline-text text-gradient">[ THE ECOSYSTEM ]</span>
            <h2 className="heading-huge mt-6 italic-accent">Omni-Channel<br /><span className="gradient-stroke-heading">Ecosystem</span></h2>
          </div>

          <div className="plat-film-track">
            {/* Slide 1 - Mobile */}
            <div className="plat-film-item">
              <div className="film-bg-glow"></div>
              <div className="plat-landscape-frame">
                <img src={stack1} className="plat-landscape-img" alt="Mobile App" />
                <div className="plat-film-label">
                  <h4>Mobile Application</h4>
                  <p>Carry the entire boutique in your pocket with high-fidelity neural fitting.</p>
                </div>
              </div>
            </div>

            {/* Slide 2 - Tablet */}
            <div className="plat-film-item">
              <div className="film-bg-glow"></div>
              <div className="plat-landscape-frame">
                <img src={imgPlat1} className="plat-landscape-img" alt="Staff Tablet" />
                <div className="plat-film-label">
                  <h4>Staff Tablet POS</h4>
                  <p>Empower your showroom staff with interactive real-time lookbooks.</p>
                </div>
              </div>
            </div>

            {/* Slide 3 - Mirror */}
            <div className="plat-film-item">
              <div className="film-bg-glow"></div>
              <div className="plat-landscape-frame">
                <img src={imgPlat3} alt="Smart Mirror" className="plat-landscape-img" />
                <div className="plat-film-label">
                  <h4>Digital Smart Mirror</h4>
                  <p>The definitive retail focal point. Where physical and digital meet.</p>
                </div>
              </div>
            </div>

            {/* Slide 4 - B2B Showroom */}
            <div className="plat-film-item">
              <div className="film-bg-glow"></div>
              <div className="plat-landscape-frame">
                <img src={imgPlat4} alt="B2B Suite" className="plat-landscape-img" />
                <div className="plat-film-label">
                  <h4>B2B Showroom</h4>
                  <p>Tailored digital experiences for executive clientele and bespoke fittings.</p>
                </div>
              </div>
            </div>

            {/* Slide 5 - Retail V2 */}
            <div className="plat-film-item">
              <div className="film-bg-glow"></div>
              <div className="plat-landscape-frame">
                <img src={imgUpload1} alt="Retail Hub" className="plat-landscape-img" />
                <div className="plat-film-label">
                  <h4>Next-Gen Retail Hub</h4>
                  <p>Fully integrated POS systems that bridge every customer session.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05. BRUTALIST CTA ── */}
      <section className="cta-section section bg-theme-dark">
        <div className="container text-center">
          <span className="overline-text-light">[ COMMENCE DEPLOYMENT ]</span>
          <h1 className="heading-huge-light mt-8 mb-16">CONNECT<br />SYSTEM.</h1>
          <Link to="/contact" className="btn-luxury">BOOK THE AUDIT</Link>
        </div>
      </section>

    </main>
  )
}
