import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Assets - TryoImages
import imgHero from '../assets/tryoImage/mansuit-try2.jpeg'
import imgHeroMobile from '../assets/tryoImage/mansuit-try3.png'
import imgTab1 from '../assets/tryoImage/attractiveDressCard.jpeg'
import imgTab2 from '../assets/tryoImage/mobileDress5.jpeg'
import imgTab3 from '../assets/tryoImage/uplaodImge2.jpeg'

import imgConvMain from '../assets/tryoImage/newDrsson.jpeg'
import imgGlobalMain from '../assets/tryoImage/groupOfModel2.jpeg'
import imgCard1 from '../assets/indianTryo/womanCards3.jpeg'
import imgCard2 from '../assets/tryoImage/mobile-dresstry.jpeg'
import imgCard3 from '../assets/indianTryo/newDreses.jpeg'

import { usePreloader } from '../context/PreloaderContext'
import './UseCases.css'

gsap.registerPlugin(ScrollTrigger)

const useCases = [
  {
    id: 'ecommerce',
    tab: 'E-commerce',
    title: 'Precision Digital Retail',
    subtitle: 'Zero Bounce, Infinite Engagement',
    desc: 'Integrates natively into your existing storefront. Let customers virtually try clothes before purchasing, drastically reducing returns and increasing overall satisfaction with pixel-perfect drape mapping.',
    features: [
      'Simple Shopify & Commerce Integration',
      'Real-time fabric physics simulation',
      'High-conversion "Try-now" CTAs',
      'Accurate body-mesh visualizations',
    ],
    image: imgTab1,
    stat: { value: '45%', label: 'Average Reduction in Online Returns' },
  },
  {
    id: 'instore',
    tab: 'In-Store',
    title: 'The Smart Mirror Portal',
    subtitle: 'Transform Every Fitting Room',
    desc: 'Turn your physical retail space into a futuristic experience. Our Smart Mirror SDK allows customers to try your entire digital inventory without stepping foot into a trial room.',
    features: [
      'Zero-queue fitting room experience',
      'Instant color & variant switching',
      'Contactless NFC/QR activation',
      'In-store footfall analytics sync',
    ],
    image: imgTab2,
    stat: { value: '3.5x', label: 'Faster Turnover in Flagship Locations' },
  },
  {
    id: 'ar-mobile',
    tab: 'Mobile AR',
    title: 'VIP Home Sessions',
    subtitle: 'The Fitting Room in their Pocket',
    desc: 'Bring the exclusivity of a luxury boutique directly into the customers home. Our mobile SDK renders outfits privately on-device using advanced neural camera tracking.',
    features: [
      'iOS & Android native implementation',
      'End-to-end device privacy security',
      'Integrated social-ready camera capture',
      'Direct-to-checkout pipeline integration',
    ],
    image: imgTab3,
    stat: { value: '24/7', label: 'Global Retail Accessibility' },
  },
]

export default function UseCases() {
  const [activeTab, setActiveTab] = useState(0)
  const pageRef = useRef(null)
  const { isPreloaderFinished } = usePreloader();

  useEffect(() => {
    if (!isPreloaderFinished) return;

    let ctx = gsap.context(() => {
      // ── HERO PARRALAX & REVEAL ──
      gsap.from('.hero-reveal-line', {
        y: 120,
        opacity: 0,
        rotateX: -30,
        stagger: 0.1,
        duration: 1.5,
        ease: 'expo.out'
      });

      gsap.fromTo('.usecase-hero-img-wrap',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'expo.out', delay: 0.4 }
      );

      // Parallax sections
      gsap.utils.toArray('.img-parallax').forEach(img => {
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

      // Stats Reveal
      gsap.utils.toArray('.usecase-stat-box').forEach(box => {
        gsap.from(box, {
          x: -50,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: box, start: 'top 85%' }
        });
      });

    }, pageRef)

    return () => ctx.revert()
  }, [isPreloaderFinished])

  const active = useCases[activeTab]

  return (
    <main ref={pageRef} className="usecases-page" style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* ── LUXURY ASYMMETRIC HERO ── */}
      <section className="usecases-hero-unique section-fullscreen flex align-center" style={{ overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #f7f7f7 0%, #ecebe7 100%)' }}>

        <div className="features-hero__bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 25%, rgba(0,0,0,0.02) 0%, transparent 60%)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #f7f7f7 40%, transparent 100%)', zIndex: 1 }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10vh' }}>

          <div className="usecase-hero-text-container" style={{ flex: '1 1 50%', paddingRight: '4rem', zIndex: 3 }}>
            <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
              <span className="text-gradient uppercase tracking-widest font-bold" style={{ fontSize: '0.8rem', letterSpacing: '8px' }}>[ PIONEERING RETAIL ]</span>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <h1 className="heading-huge hero-reveal-line" style={{ textTransform: 'uppercase', color: '#000', margin: 0, lineHeight: 0.75, letterSpacing: '-0.04em', fontWeight: 900 }}>REDEFINING</h1>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h1 className="heading-huge hero-reveal-line gradient-stroke-heading" style={{ textTransform: 'uppercase', margin: 0, lineHeight: 0.75, letterSpacing: '-0.04em', fontWeight: 900 }}>THE GLOBAL</h1>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h1 className="heading-huge hero-reveal-line" style={{ textTransform: 'uppercase', color: 'var(--color-primary)', margin: 0, lineHeight: 0.75, letterSpacing: '-0.04em', fontWeight: 900, textShadow: '0 0 40px rgba(0,0,0,0.05)' }}>EXPERIENCE.</h1>
            </div>

            <div className="hero-reveal-line" style={{ width: '60px', height: '4px', background: 'var(--color-primary)', marginTop: '3rem', marginBottom: '2rem' }}></div>

            <p className="hero-reveal-line text-lg" style={{ color: 'rgba(0,0,0,0.6)', maxWidth: '400px', lineHeight: '1.6', fontSize: '1.2rem', fontWeight: 500 }}>
              From bespoke boutiques to high-scale global commerce platforms—experience how TryOAI adapts to any retail environment.
            </p>
          </div>

          <div className="usecase-hero-img-wrap" style={{
            flex: '1 1 40%',
            height: '75vh',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '500px',
            boxShadow: '0 40px 80px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.03)'
          }}>
            <img src={imgHero} alt="Virtual Try" className="img-parallax desktop-hero-img" style={{ width: '100%', height: '120%', objectFit: 'cover', filter: 'brightness(0.8) contrast(1.1)', objectPosition: 'center top' }} />
            <img src={imgHeroMobile} alt="Virtual Try Mobile" className="img-parallax mobile-hero-img" style={{ width: '100%', height: '120%', objectFit: 'cover', filter: 'brightness(0.8) contrast(1.1)', objectPosition: 'center top' }} />
          </div>

        </div>
      </section>

      {/* ── TAB NAV LUXURY ── */}
      <section className="usecases-tab-wrapper bg-white">
        <div className="container" style={{ padding: 0 }}>
          <div className="usecases-tab-nav-container">
            {useCases.map((uc, i) => (
              <button
                key={uc.id}
                className={`usecases-tab-btn ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                <div style={{ fontWeight: 600, fontSize: '0.8rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '1.5rem', color: activeTab === i ? 'var(--color-primary)' : 'inherit' }}>
                  CASE 0{i + 1}
                </div>
                <h2 className="heading-sm font-bold uppercase tracking-widest" style={{ margin: 0 }}>{uc.tab}</h2>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAB CONTENT LUXURY ── */}
      <section className="usecases-tab-content section bg-theme-offwhite-premium" style={{ padding: '10rem 0', minHeight: '80vh' }}>
        <div className="container">
          <div className="usecase-panel" key={activeTab}>
            <div className="grid-split-half align-center">
              <div className="usecase-text-col">
                <span className="text-secondary uppercase tracking-widest font-bold mb-4 block">[ {active.subtitle} ]</span>
                <h2 className="heading-xl mb-8 uppercase leading-tight">{active.title}</h2>
                <div style={{ width: '40px', height: '1px', background: '#000', marginBottom: '2.5rem' }}></div>
                <p className="text-lg text-secondary mb-10 leading-relaxed font-medium">{active.desc}</p>

                <ul className="usecase-features-list no-list" style={{ padding: 0 }}>
                  {active.features.map((item, j) => (
                    <li key={j} className="mb-4 flex align-center gap-4 text-md font-semibold text-secondary">
                      <span style={{ color: 'var(--color-primary)' }}>✦</span> {item}
                    </li>
                  ))}
                </ul>

                <div className="usecase-stat-box">
                  <div className="heading-huge leading-none mb-2" style={{ color: 'var(--color-primary)', letterSpacing: '-2px' }}>{active.stat.value}</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-[#000] opacity-80">{active.stat.label}</div>
                </div>
              </div>

              <div className="usecase-img-wrap" style={{ borderRadius: '4px', overflow: 'hidden', height: '80vh', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}>
                <img src={active.image} alt={active.title} className="img-parallax" style={{ width: '100%', height: '115%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: EDITORIAL CONVERSION ENGINE ── */}
      <section className="section bg-theme-gradient-1" style={{ padding: '15rem 0' }}>
        <div className="container text-center mb-20">
          <span className="text-gradient uppercase tracking-widest font-semibold block mb-4">The Conversion Engine</span>
          <h2 className="heading-xl uppercase mb-8">Elevate Every<br />Digital Encounter.</h2>
        </div>
        <div className="container">
          <div className="editorial-case-grid">
            <div className="case-img-wrap">
              <img src={imgConvMain} alt="Conversion" className="img-parallax" />
            </div>
            <div className="case-text-col">
              <h3 className="heading-lg uppercase mb-8 leading-tight">Optimized<br />For Impulse.</h3>
              <p className="text-lg text-secondary mb-8 leading-relaxed">
                By removing the friction of physical trial rooms and online sizing uncertainty, TryOAI transforms passive viewers into active buyers instantly.
                Our real-time engine provides the confidence required to hit "checkout" on luxury apparel without hesitation.
              </p>
              <p className="text-md text-secondary opacity-80 border-l-2 border-black pl-6">
                Averages 40% higher Add-to-Cart rates across major premium luxury labels globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: GLOBAL SCALE PILLARS ── */}
      <section className="section bg-theme-offwhite-premium" style={{ padding: '15rem 0' }}>
        <div className="container">
          <div className="grid-split-half align-center" style={{ gap: '8vw' }}>
            <div className="grid-left">
              <h2 className="heading-xl uppercase mb-12">Universal<br />Reach.</h2>
              <div className="capability-case-card mb-8">
                <h3 className="heading-sm mb-4 uppercase font-bold">Diverse Brand Support</h3>
                <p className="text-sm text-secondary leading-relaxed">From experimental streetwear labels to established high-end luxury houses, our engine adapts to your unique brand DNA flawlessly.</p>
              </div>
              <div className="capability-case-card">
                <h3 className="heading-sm mb-4 uppercase font-bold">Global Infrastructure</h3>
                <p className="text-sm text-secondary leading-relaxed">Low-latency rendering nodes across the world ensure that your virtual trials are smooth, regardless of customer location.</p>
              </div>
            </div>
            <div className="grid-right">
              <div className="case-img-wrap" style={{ height: '70vh', borderRadius: '4px' }}>
                <img src={imgGlobalMain} alt="Global" className="img-parallax" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: DEMONSTRATIVE CARDS (New) ── */}
      <section className="section bg-theme-gradient-2" style={{ padding: '10rem 0' }}>
        <div className="container">
          <div className="grid-split-3">
            {[
              { img: imgCard1, title: 'Social Ready', desc: 'Allow customers to share their AI trials across social platforms instantly, driving viral growth.' },
              { img: imgCard2, title: 'Mesh Precision', desc: 'Proprietary mesh-mapping ensures every fold of fabric is rendered with physical accuracy.' },
              { img: imgCard3, title: 'User Confident', desc: 'Drastically reduce returns by providing absolute visual certainty before the package arrives.' }
            ].map((card, i) => (
              <div key={i} className="demo-lux-card" style={{ background: '#fff', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', height: '100%' }}>
                <div style={{ height: '300px', overflow: 'hidden' }}>
                  <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="demo-lux-card-content">
                  <h4 className="heading-sm mb-4 uppercase font-bold tracking-widest">{card.title}</h4>
                  <p className="text-sm text-secondary leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="usecases-cta section bg-theme-offwhite-premium" id="usecases-cta" style={{ padding: '10rem 0' }}>
        <div className="container" style={{ borderTop: '2px solid #000', paddingTop: '10rem' }}>
          <div className="grid-split-half align-center">
            <div className="grid-left">
              <h1 className="heading-huge uppercase leading-none">The Future<br />of Trial.</h1>
            </div>
            <div className="grid-right text-right flex flex-col items-end">
              <p className="text-lg text-secondary mb-12 usecase-cta-text" style={{ fontWeight: 600 }}>
                Join the retailers worldwide who are already redefining their shopping journey with TryOAI.
              </p>
              <Link to="/contact" className="heading-md" style={{ textDecoration: 'underline', textUnderlineOffset: '10px', color: '#000', fontWeight: 800 }}>
                SCHEDULE A CASE STUDY
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
