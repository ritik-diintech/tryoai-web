import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { usePreloader } from '../context/PreloaderContext'
import './Privacy.css'

export default function Privacy() {
  const pageRef = useRef(null)
  const { isPreloaderFinished } = usePreloader();

  useEffect(() => {
    if (!isPreloaderFinished) return;

    let ctx = gsap.context(() => {
      // High-end reveal animations
      gsap.from('.reveal-privacy-text', {
        y: 100, opacity: 0, rotationX: -30, stagger: 0.1, duration: 1.5, ease: 'expo.out'
      })
      gsap.from('.privacy-content-block', {
        y: 40, opacity: 0, stagger: 0.1, duration: 1.2, ease: 'power3.out', delay: 0.6
      })
    }, pageRef)

    return () => ctx.revert()
  }, [isPreloaderFinished])

  return (
    <main ref={pageRef} className="privacy-page bg-theme-offwhite-premium">
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* ── LUXURY HEADER ── */}
        <div className="privacy-header-wrap">
          <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
            <span className="text-secondary uppercase tracking-[10px] block font-bold" style={{ fontSize: '0.8rem' }}>LEGAL FRAMEWORK</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1 className="privacy-header-line reveal-privacy-text" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', color: '#000' }}>PRIVACY</h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1 className="privacy-header-line reveal-privacy-text gradient-stroke-heading" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>POLICY.</h1>
          </div>
          <div style={{ overflow: 'hidden', marginTop: '3rem' }}>
             <p className="text-sm text-secondary font-bold uppercase tracking-widest reveal-privacy-text">Effective Date: March 20, 2026</p>
          </div>
        </div>

        {/* ── CONTENT SECTIONS ── */}
        <div className="privacy-content-wrapper">
          
          <section className="privacy-content-block">
            <h2 className="heading-md mb-8">01. Our Commitment</h2>
            <p className="text-lg text-secondary leading-relaxed">
              At TryOAI, we prioritize the protection of your digital identity alongside our pursuit of cutting-edge AI fashion technology. 
              This policy outlines our transparent approach to data privacy, ensuring that your experience remains both immersive and secure.
            </p>
          </section>

          <section className="privacy-content-block">
             <h2 className="heading-md mb-8">02. AI-Visual Data Handling</h2>
             <p className="text-lg text-secondary mb-8">
               Our proprietary Neural Try-On technology is designed with **Privacy by Design** principles. Here is how we manage visual visual assets:
             </p>
             <ul className="privacy-list no-list">
               <li>
                 <strong>Volatile Processing:</strong> Mesh calculations and garment physics are executed in volatile memory and are purged immediately after each session.
               </li>
               <li>
                 <strong>Local Camera Access:</strong> When using our mobile SDK, camera frames are processed on-device (Edge AI) and never uploaded to our permanent storage servers.
               </li>
               <li>
                 <strong>Biometric Mapping:</strong> Geometric body-mapping is used solely for fabric alignment and is never stored as persistent biometric identifiers.
               </li>
             </ul>
          </section>

          <section className="privacy-content-block">
             <h2 className="heading-md mb-8">03. Client & Enterprise Data</h2>
             <p className="text-lg text-secondary mb-8">
               We collect only the essential information required to deliver high-utility retail sessions:
             </p>
             <ul className="privacy-list no-list">
               <li>
                 <strong>Account Identity:</strong> Standard corporate identification including names, verified enterprise emails, and brand identifiers.
               </li>
               <li>
                 <strong>Usage Analytics:</strong> Anonymous telemetry used to optimize the rendering speeds and interaction quality of our 3D engine.
               </li>
               <li>
                 <strong>Encryption:</strong> All data is stored using AES-256 standard encryption across our global cloud infrastructure.
               </li>
             </ul>
          </section>

          <section className="privacy-content-block">
             <h2 className="heading-md mb-8">04. Global Compliance</h2>
             <p className="text-lg text-secondary mb-10">
               TryOAI operates in full alignment with international data directives including **GDPR**, **CCPA**, and **DPDP Act (India)**. 
               We provide every user with the inherent right to access, rectify, or purge their associated data logs at any moment.
             </p>
             <a href="mailto:contact@tryoai.in" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '8px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Initiate Data Purge Request
             </a>
          </section>

          <section className="privacy-content-block" style={{ border: 'none' }}>
             <h2 className="heading-md mb-8">05. Contact Legal</h2>
             <p className="text-md text-secondary uppercase font-bold tracking-widest leading-relaxed mb-4">
               Legal Inquiries: legal@tryoai.in
             </p>
             <p className="text-md text-secondary uppercase font-bold tracking-widest leading-relaxed">
               Registered HQ: Noida, Sector-2, Uttar Pradesh, India - 201301
             </p>
          </section>

        </div>

      </div>
    </main>
  )
}
