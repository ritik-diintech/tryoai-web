import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Assets - Base images
import img1 from '../assets/images/animatedClosthdesing.jpg'
import img2 from '../assets/images/girlMirrorEffect.jpg'
import img3 from '../assets/images/orangGirlfashon.jpg'
import img4 from '../assets/images/vomanclickCloth.jpg'

// Assets - User Requested TryoImages
import imgHero from '../assets/tryoImage/cardfashon4.jpeg'
import imgCenter from '../assets/tryoImage/whiteDress.jpeg'

// Specific Image Set Requested
import imgRequested1 from '../assets/indianTryo/verticalMobileDress.jpeg'
import imgRequested2 from '../assets/tryoImage/man-tshirt2.jpeg'
import imgRequested3 from '../assets/tryoImage/galssphorimsCardDress.jpeg'
import imgRequested4 from '../assets/indianTryo/womanCArdsindia.jpeg'
import imgRequested5 from '../assets/tryoImage/mandiffrentCArds.jpeg'
import imgRequested6 from '../assets/tryoImage/multidressmodel.jpeg'
import imgRequested7 from '../assets/tryoImage/multimobiledress.jpeg'
import imgRequested8 from '../assets/indianTryo/attractiveDress.jpeg'
import imgRequested9 from '../assets/indianTryo/womanREdLahnga.jpeg'

// 4 New Showcase Images for Couture Section
import imgBlueDress from '../assets/indianTryo/blueDress.jpeg'
import imgIndianWoman from '../assets/indianTryo/indainWomanDressCard.jpeg'
import imgNewDresses from '../assets/indianTryo/newDreses.jpeg'
import imgTwoWoman from '../assets/indianTryo/twoWomanSameDREss.jpeg'

// 5 More Showcase Images
import imgAttractive from '../assets/tryoImage/attractiveDressCard.jpeg'
import imgCardsFashon from '../assets/tryoImage/cardsFashon.jpeg'
import imgGroupOfModel from '../assets/tryoImage/multiGallry.jpeg'
import imgManTshirt from '../assets/indianTryo/newCote.png'
import imgManSuit from '../assets/indianTryo/newSuitstyle.png'

// Additional Unique Images for Scroller
import imgExtra1 from '../assets/tryoImage/mobilecard.jpeg'
import imgExtra2 from '../assets/indianTryo/womanSuit.jpeg'
import imgExtra3 from '../assets/indianTryo/womanDress2.jpeg'
import imgExtra4 from '../assets/tryoImage/uplaodImge2.jpeg'
import { usePreloader } from '../context/PreloaderContext'

import './Features.css'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  { icon: '✦', title: 'Neural Cloth physics', desc: 'Experience garment flow that reacts to every movement with cinematic accuracy and zero latency.' },
  { icon: '✧', title: 'Global SDK Access', desc: 'Deploy our luxury try-on engine across web, iOS, and Android platforms in less than 48 hours.' },
  { icon: '✦', title: 'Enterprise Analytics', desc: 'Gain deep insights into customer preferences, engagement time, and true conversion drivers.' },
  { icon: '✧', title: 'Cross-Mirror Sync', desc: 'Synchronize physical smart mirrors with digital apps for a seamless omnichannel shopping story.' },
]

export default function Features() {
  const pageRef = useRef(null)
  const scrollerTrackRef = useRef(null)
  const { isPreloaderFinished } = usePreloader();

  useEffect(() => {
    if (!isPreloaderFinished) return;

    let ctx = gsap.context(() => {
      // ── HERO REVEALS ──
      gsap.fromTo('.hero-back-text', { y: -100, opacity: 0 }, { y: 0, opacity: 0.8, duration: 2, ease: 'expo.out' });
      gsap.fromTo('.hero-front-text', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: 'expo.out', delay: 0.2 });

      gsap.fromTo('.hero-center-img-wrapper',
        { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
        { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.8, ease: 'expo.out' }
      );

      // ── EDITORIAL REVEAL ──
      gsap.fromTo('.editorial-img-main',
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out', scrollTrigger: { trigger: '.section-editorial', start: 'top 70%' } }
      );
      gsap.fromTo('.editorial-img-sub',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: 'power4.out', scrollTrigger: { trigger: '.section-editorial', start: 'top 60%' } }
      );

      // ── GALLERY STAGGER ──
      gsap.fromTo('.gallery-item',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.luxury-gallery', start: 'top bottom-=50px' } }
      );

      // ── INFINITE MARQUEE ──
      const track = scrollerTrackRef.current;
      if (track) {
        gsap.to(track, {
          xPercent: -50,
          ease: 'none',
          duration: 25,
          repeat: -1
        });
      }

      // Parallax for all images
      gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // ── Diverse Staggered Reveal ──
      const showcaseCards = gsap.utils.toArray('.couture-card');
      showcaseCards.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateY: 15,
          scale: 0.9,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        });
      });

      gsap.from('.couture-header', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.couture-header',
          start: 'top 85%'
        }
      });

      // Capabilities Entrance
      gsap.utils.toArray('.capability-lux-card').forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%'
          }
        });
      });

    }, pageRef)

    return () => ctx.revert()
  }, [isPreloaderFinished])

  return (
    <main ref={pageRef} className="features-page" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ── HERO ── */}
      <section className="features-hero-unique section-fullscreen" id="features-hero" style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="features-hero-bg-wrap" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={imgHero} alt="Features BG" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) contrast(1.1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.6) 100%)' }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="heading-huge hero-back-text gradient-stroke-heading" style={{ position: 'absolute', zIndex: 1, top: '40%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, fontSize: 'clamp(5rem, 15vw, 15rem)', letterSpacing: '0.5vw', whiteSpace: 'nowrap', opacity: 0.8 }}>
            FEATURES
          </h1>

          <div className="hero-center-img-wrapper" style={{ position: 'absolute', width: '35vw', minWidth: '320px', height: '58vh', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '12px', overflow: 'hidden', zIndex: 5, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
            <img src={imgCenter} alt="Features Target" className="hero-center-img" style={{ width: '100%', height: '110%', objectFit: 'cover', objectPosition: 'center 10%', filter: 'brightness(0.95)' }} />
          </div>

          <h1 className="heading-huge hero-front-text" style={{ position: 'absolute', zIndex: 10, top: '65%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, fontSize: 'clamp(4rem, 12vw, 12rem)', color: '#fff', whiteSpace: 'nowrap', pointerEvents: 'none', mixBlendMode: 'overlay', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            UNLOCKED.
          </h1>

          <div className="features-hero-footer" style={{ position: 'absolute', bottom: '10%', left: '5%', right: '5%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 15 }}>
            <p className="text-sm" style={{ maxWidth: '300px', margin: 0, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>
              Explore the advanced proprietary technology that powers the TryOAI session ecosystem.
            </p>
            <div className="scroll-indicator" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <span className="text-xs" style={{ letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>SCROLL</span>
              <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
                <div className="scroll-line-fill" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--color-primary)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: NEURAL PRECISION ── */}
      <section className="section-editorial bg-theme-offwhite-premium">
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-text-col">
              <span className="text-gradient mb-4 block italic-accent" style={{ letterSpacing: '2px', fontWeight: 600 }}>[ 01 ] ALGORITHMIC FLOW</span>
              <h2 className="heading-xl mb-8 uppercase leading-tight">Neural Precision<br />Fabric Fit.</h2>
              <p className="text-lg text-secondary mb-8 leading-relaxed italic">
                Our technology simulates real-world garments with pixel-perfect accuracy.
              </p>
              <div style={{ width: '40px', height: '2px', background: 'var(--color-primary)', marginBottom: '2rem' }}></div>
              <p className="text-md text-secondary opacity-90">
                Experience fabric drape and flow that reacts to every posture, providing a true-to-life fitting experience across all luxury apparel categories.
              </p>
            </div>
            <div className="editorial-img-stack">
              <div className="editorial-img-main">
                <img src={imgRequested3} alt="AI Dress" className="parallax-img" />
              </div>
              <div className="editorial-img-sub">
                <img src={imgRequested7} alt="Mobile UI" className="parallax-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE RUNWAY GALLERY ── */}
      <section className="section-gallery bg-theme-gradient-1">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="heading-xl uppercase mb-4">Interactive<br />Session <span className="text-gradient">Gallery</span></h1>
          </div>
          <div className="luxury-gallery">
            <div className="gallery-item gallery-item-1">
              <img src={imgRequested1} alt="Fashion" className="parallax-img" />
            </div>
            <div className="gallery-item gallery-item-2">
              <img src={imgRequested2} alt="Fashion" className="parallax-img" />
            </div>
            <div className="gallery-item gallery-item-3">
              <img src={imgRequested5} alt="Fashion" className="parallax-img" />
            </div>
            <div className="gallery-item gallery-item-4">
              <img src={imgRequested8} alt="Fashion" className="parallax-img" />
            </div>
            <div className="gallery-item gallery-item-5">
              <img src={imgRequested9} alt="Fashion" className="parallax-img" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OMNICHANNEL ── */}
      <section className="section-editorial bg-theme-offwhite-premium">
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-img-stack order-last md:order-first">
              <div className="editorial-img-main" style={{ left: 'auto', right: 0 }}>
                <img src={imgRequested4} alt="In-store" className="parallax-img" />
              </div>
              <div className="editorial-img-sub" style={{ right: 'auto', left: 0 }}>
                <img src={imgRequested6} alt="Group fashion" className="parallax-img" />
              </div>
            </div>
            <div className="editorial-text-col" style={{ paddingLeft: '2rem' }}>
              <span className="text-gradient mb-4 block italic-accent" style={{ letterSpacing: '2px', fontWeight: 600 }}>[ 02 ] INTEGRATION</span>
              <h2 className="heading-xl mb-8 uppercase leading-tight">Infinite Stores.<br />Zero return.</h2>
              <p className="text-lg text-secondary mb-8 leading-relaxed">
                Empower your customers to shop with absolute confidence. Our SDK turns any screen into a high-utility virtual fitting room that mirrors physical precision.
              </p>
              <ul className="feature-lux-list no-list" style={{ padding: 0 }}>
                {['Drape Mesh Generation', 'Pose-Independent Mapping', 'Real-time Texture Sync'].map((item, i) => (
                  <li key={i} className="mb-4 flex align-center gap-4 text-md font-semibold">
                    <span style={{ color: 'var(--color-primary)' }}>✧</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: UNIQUE WARDROBE ── */}
      <section className="section-wardrobe bg-theme-gradient-2" style={{ padding: '10rem 0' }}>
        <div className="container mb-12">
          <h2 className="heading-xl uppercase leading-none mb-4">Unified Wardrobe</h2>
          <div style={{ width: '100px', height: '1px', background: '#000', marginBottom: '2rem' }}></div>
          <p className="text-lg opacity-80">Thousands of luxury SKUs ready for instant digital trial.</p>
        </div>
        <div className="wardrobe-scroller-wrap">
          <div className="wardrobe-track" ref={scrollerTrackRef}>
            {[imgExtra1, imgExtra2, imgExtra3, imgExtra4, imgExtra1, imgExtra2, imgExtra3, imgExtra4].map((img, i) => (
              <div key={i} className="wardrobe-img">
                <img src={img} alt="Wardrobe Selection" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CAPABILITIES ── */}
      <section className="features-capabilities section bg-theme-offwhite-premium" id="features-capabilities" style={{ padding: '15rem 0' }}>
        <div className="container">
          <div className="mb-20">
            <h2 className="heading-xl uppercase">Enterprise<br /><span className="gradient-stroke-heading">Platform</span> Pillars.</h2>
          </div>

          <div className="features-capabilities__grid">
            {capabilities.map((cap, i) => (
              <div key={i} className="capability-lux-card">
                <div className="cap-icon-wrap">{cap.icon}</div>
                <h3 className="heading-md mb-6 uppercase leading-tight font-bold">{cap.title}</h3>
                <p className="text-sm text-secondary leading-relaxed opacity-90">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: COUTURE DIVERSITY MATRIX ── */}
      <section className="couture-showcase-section" style={{ padding: '12rem 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <div className="couture-header text-center mb-20">
            <h2 className="heading-huge mb-6 italic-accent">Diversity<br /><span className="gradient-stroke-heading">Matrix</span></h2>
            <p className="text-md text-secondary" style={{ maxWidth: '750px', margin: '0 auto', opacity: 0.85 }}>
              Exploring the infinite spectrum of digital silhouettes. Each card represents a unique neural fitting paradigm.
            </p>
          </div>

          <div className="couture-grid-layout">
            {/* Card 1 - Small Horiz - Neon Aura */}
            <div className="couture-card card-small-horiz card-type-aura" style={{ marginTop: '2rem' }}>
              <div className="card-outer-border">
                <div className="card-image-box">
                  <img src={imgBlueDress} alt="Royal Satin" />
                  <div className="card-glass-tag">
                    <span className="tag-title">Royal Satin</span>
                    <span className="tag-desc">Neural Fabric Fit 100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Glassy */}
            <div className="couture-card card-regular card-type-glassy" style={{ marginTop: '6rem' }}>
              <div className="card-image-box">
                <img src={imgIndianWoman} alt="Traditional Lux" />
                <div className="card-glass-tag">
                  <span className="tag-title">Traditional Lux</span>
                  <span className="tag-desc">Smart Fitting Matrix</span>
                </div>
              </div>
            </div>

            {/* Card 3 - Small Horiz - Editorial Minimal */}
            <div className="couture-card card-small-horiz card-type-minimal" style={{ marginTop: '0rem' }}>
              <div className="card-image-box">
                <img src={imgNewDresses} alt="Modern Cut" />
                <div className="card-glass-tag">
                  <span className="tag-title">Modern Cut</span>
                  <span className="tag-desc">Texture Engine 2.0</span>
                </div>
              </div>
            </div>

            {/* Card 4 - HORIZONTAL CINEMATIC - The Evolution */}
            <div className="couture-card card-wide card-type-float">
              <div className="card-image-box">
                <img src={imgTwoWoman} alt="The Evolution" />
                <div className="card-glass-tag">
                  <span className="tag-title">The Evolution</span>
                  <span className="tag-desc">Dynamic Cloth Physics</span>
                </div>
              </div>
            </div>

            {/* Card 5 - Beveled 3D */}
            <div className="couture-card card-regular card-type-beveled" style={{ marginTop: '3rem' }}>
              <div className="card-outer-border">
                <div className="card-image-box">
                  <img src={imgAttractive} alt="Crimson Lux" />
                  <div className="card-glass-tag">
                    <span className="tag-title">Crimson Lux</span>
                    <span className="tag-desc">8K Neural Fabric Flow</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6 - Neon Aura */}
            <div className="couture-card card-tall card-type-aura" style={{ marginTop: '-4rem' }}>
              <div className="card-outer-border">
                <div className="card-image-box">
                  <img src={imgCardsFashon} alt="Runway Ready" />
                  <div className="card-glass-tag">
                    <span className="tag-title">Runway Ready</span>
                    <span className="tag-desc">Batch Fit Processing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 7 - Glassy */}
            <div className="couture-card card-regular card-type-glassy" style={{ marginTop: '5rem' }}>
              <div className="card-image-box">
                <img src={imgGroupOfModel} alt="Multi Gallery" />
                <div className="card-glass-tag">
                  <span className="tag-title">Multi Gallery Look</span>
                  <span className="tag-desc">8K Neural Synthesis</span>
                </div>
              </div>
            </div>

            {/* Card 8 - HORIZONTAL CINEMATIC - Designer Coat */}
            <div className="couture-card card-wide card-type-minimal" style={{ marginTop: '2rem' }}>
              <div className="card-image-box">
                <img src={imgManTshirt} alt="Designer Coat" />
                <div className="card-glass-tag">
                  <span className="tag-title">Designer Coat</span>
                  <span className="tag-desc">Luxury Cotton Texture</span>
                </div>
              </div>
            </div>

            {/* Card 9 - Float Overlay - Signature Suit */}
            <div className="couture-card card-regular card-type-float" style={{ marginTop: '9rem' }}>
              <div className="card-image-box">
                <img src={imgManSuit} alt="Signature Suit" />
                <div className="card-glass-tag">
                  <span className="tag-title">Signature Suit</span>
                  <span className="tag-desc">Executive Smart Fitting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="features-cta section bg-theme-gradient-1" id="features-cta" style={{ padding: '10rem 0' }}>
        <div className="container" style={{ borderTop: '2px solid #000', paddingTop: '10rem' }}>
          <div className="grid-split-half align-center" style={{ gap: '2rem' }}>
            <div className="grid-left">
              <h1 className="heading-huge uppercase leading-none">Elevate Your<br />Platform.</h1>
            </div>
            <div className="grid-right text-right flex flex-col items-end">
              <p className="text-lg text-secondary mb-12" style={{ maxWidth: '400px', fontWeight: 500 }}>
                Join the elite brands redefining fashion commerce with TryOAI technology.
              </p>
              <Link to="/contact" className="heading-md" style={{ textDecoration: 'underline', textUnderlineOffset: '10px', color: '#000', fontWeight: 700 }}>
                CONTACT SALES
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
