import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import img1 from '../assets/images/vrinvoirment.png'
import img2 from '../assets/images/vomanclickCloth.jpg'
import img3 from '../assets/images/virucalStylecloths.jpg'
import imgHero from '../assets/images/checkingCloth.jpg'

import './Product.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Easy Integration',
    desc: 'Seamlessly integrate TryOAI with your existing e-commerce platform using our turnkey solution and dedicated partner deployment team.',
    image: img1,
  },
  {
    num: '02',
    title: 'Camera Access',
    desc: 'Customers simply click a photo or utilize an in-store smart mirror terminal to initialize the AI estimation engine.',
    image: img2,
  },
  {
    num: '03',
    title: 'Instant Visuals',
    desc: 'Via our proprietary neural fabric simulation, they see themselves draped in new garments instantly—drastically reducing returns.',
    image: img3,
  }
]

const techItems = [
  { title: 'Neural Fabric Simulation', desc: 'Physics-based draping and folding that respects real-world textile tension & behavior.' },
  { title: 'Body Mesh Reconstruction', desc: 'Precise 3D body estimation extrapolated from a single 2D photo—down to the specific millimeter.' },
  { title: 'Ambient Light Matching', desc: 'Automatically matches local lighting, ray-traced shadows, and color temperature of the user environment.' },
  { title: 'GPU Accelerated', desc: 'Edge-rendered or cloud-inferred via high-end GPUs delivering studio-quality renders under 3 seconds.' },
]

export default function Product() {
  const pageRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.prod-hero-title', {
        y: 120, opacity: 0, stagger: 0.15, duration: 1.5, ease: 'expo.out', delay: 0.2
      })

      // Mask Parallax
      gsap.to('.hero-prod-img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: '.product-hero-lux', start: 'top top', end: 'bottom top', scrub: true }
      })

      // Step Reveals
      gsap.utils.toArray('.lux-step-row').forEach(row => {
        gsap.from(row.querySelector('.lux-step-img'), {
          scrollTrigger: { trigger: row, start: 'top 80%' },
          scale: 1.1, opacity: 0, duration: 1.2, ease: 'power3.out'
        })
        gsap.from(row.querySelector('.lux-step-content'), {
          scrollTrigger: { trigger: row, start: 'top 80%' },
          y: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2
        })
      })

      // Tech Row Reveal
      gsap.utils.toArray('.lux-tech-item').forEach(item => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: 'top 90%' },
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
        })
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} className="product-page" style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* ── LUXURY MASKED HERO ── */}
      <section className="product-hero-lux section-fullscreen" id="product-hero" style={{ background: '#050505', position: 'relative', overflow: 'hidden' }}>

        {/* Background Overlay Graphic */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, background: 'radial-gradient(circle at 80% 50%, transparent 0%, #050505 60%)' }}></div>

        <div className="hero-prod-img" style={{ position: 'absolute', top: '-10%', right: '-10%', width: '70%', height: '120vh', zIndex: 0, filter: 'brightness(0.6)' }}>
          <img src={imgHero} alt="Engine Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="text-gradient" style={{ letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600, display: 'block' }}>The TryOAI Engine</span>

          <div style={{ overflow: 'hidden' }}>
            <h1 className="heading-huge prod-hero-title gradient-stroke-heading" style={{ margin: 0, lineHeight: 0.85, textTransform: 'uppercase' }}>INTELLIGENT.</h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1 className="heading-huge prod-hero-title" style={{ margin: 0, color: '#fff', lineHeight: 0.85, textTransform: 'uppercase' }}>SEAMLESS.</h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1 className="heading-huge prod-hero-title" style={{ margin: 0, color: 'var(--color-primary)', lineHeight: 0.85, textTransform: 'uppercase' }}>VIRTUAL.</h1>
          </div>

          <p className="text-lg text-secondary prod-hero-title" style={{ maxWidth: '550px', marginTop: '4rem', lineHeight: 1.6, paddingLeft: '2rem', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
            A completely seamless, secure, and boundary-pushing digital shopping architecture designed strictly to revolutionize e-commerce conversion models worldwide.
          </p>
        </div>
      </section>

      {/* ── PRODUCT STEPS ── */}
      <section className="product-steps section" id="product-steps" style={{ padding: '8rem 0' }}>
        <div className="container">
          {steps.map((step, i) => (
            <div key={i} className={`grid-split-half align-center lux-step-row ${i % 2 !== 0 ? 'order-reverse' : ''}`} style={{ marginBottom: '8rem', gap: '5rem' }}>

              <div className={`lux-step-img-col ${i % 2 !== 0 ? 'order-last' : ''}`} style={{ width: '100%', height: '75vh', overflow: 'hidden', borderRadius: '4px', position: 'relative' }}>
                <img src={step.image} alt={step.title} className="lux-step-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '1px solid rgba(255,255,255,0.1)', pointerEvents: 'none' }}></div>
              </div>

              <div className="lux-step-content" style={{ padding: '0 2rem' }}>
                <div className="heading-huge text-gradient" style={{ opacity: 0.6, fontSize: 'clamp(5rem, 12vw, 10rem)', lineHeight: 0.8, marginBottom: '2rem' }}>{step.num}</div>
                <h2 className="heading-xl" style={{ textTransform: 'uppercase', marginBottom: '2rem', lineHeight: 1.1 }}>{step.title}</h2>
                <p className="text-md text-secondary" style={{ lineHeight: 1.8 }}>{step.desc}</p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ── TECHNICAL TYPOGRAPHIC ACCORDION/ROWS ── */}
      <section className="product-tech section" id="product-tech" style={{ padding: '8rem 0', background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">

          <div style={{ marginBottom: '6rem' }}>
            <span className="text-gradient" style={{ letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>Under the Hood</span>
            <h2 className="heading-huge" style={{ textTransform: 'uppercase', lineHeight: 1 }}>
              Core <span className="gradient-stroke-heading">Systems</span>
            </h2>
          </div>

          <div className="lux-tech-list">
            {techItems.map((item, i) => (
              <div className="lux-tech-item" key={i}>
                <div className="tech-number">0{i + 1}</div>
                <h3 className="tech-title">{item.title}</h3>
                <p className="tech-desc">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PRE-FOOTER CTA ── */}
      <section className="product-cta section" id="product-cta" style={{ background: '#050505', padding: '10rem 0 5rem 0' }}>
        <div className="container" style={{ padding: 'var(--space-2xl) 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="grid-split-half align-center" style={{ gap: '2rem' }}>
            <div className="grid-left">
              <h2 className="heading-huge" style={{ lineHeight: '1', textTransform: 'uppercase' }}>System<br />Ready?</h2>
            </div>
            <div className="grid-right text-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <p className="text-lg text-secondary mb-8" style={{ marginLeft: 'auto', maxWidth: '400px', lineHeight: 1.6 }}>
                Save trial room time, exponentially reduce returns, and drive vastly superior in-store engagement visually.
              </p>
              <Link to="/contact" className="heading-md" style={{ textDecoration: 'underline', textUnderlineOffset: '8px', color: '#fff', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.target.style.color = '#fff'}>
                DEPLOY NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
