import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'

import { usePreloader } from '../context/PreloaderContext'
import './Contact.css'

export default function Contact() {
  const pageRef = useRef(null)
  const { isPreloaderFinished } = usePreloader();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!isPreloaderFinished) return;

    let ctx = gsap.context(() => {
      // High-end reveal animations
      gsap.from('.reveal-text', {
        y: 150, opacity: 0, rotationX: -30, stagger: 0.1, duration: 1.5, ease: 'expo.out'
      })
      gsap.from('.info-block', {
        x: -40, opacity: 0, stagger: 0.15, duration: 1.2, ease: 'power4.out', delay: 0.6
      })
      gsap.from('.lux-form-wrapper', {
        scale: 0.95, opacity: 0, duration: 2, ease: 'expo.out', delay: 0.8
      })
      gsap.from('.lux-form-group', {
        y: 20, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 1.2
      })
    }, pageRef)

    return () => ctx.revert()
  }, [isPreloaderFinished])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main ref={pageRef} className="contact-page bg-theme-offwhite-premium">
      <div className="container">

        {/* ── LUXURY TYPOGRAPHY HERO ── */}
        <div className="contact-hero-wrap">
          <div style={{ overflow: 'hidden' }}>
            <span className="text-secondary uppercase tracking-[10px] block mb-4 font-bold" style={{ fontSize: '0.8rem' }}>LET'S DIALOGUE</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1 className="contact-hero-text reveal-text" style={{ fontSize: 'clamp(3rem, 15vw, 15rem)', color: '#000' }}>GET IN</h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1 className="contact-hero-text reveal-text gradient-stroke-heading" style={{ fontSize: 'clamp(3rem, 15vw, 15rem)' }}>TOUCH.</h1>
          </div>
        </div>

        <div className="grid-split-half" style={{ gap: '6rem' }}>

          {/* Left: Global Inquiries */}
          <div className="contact-sidebar">
            <div className="info-block">
              <span className="info-label">Corporate Inquiries</span>
              <a href="mailto:contact@tryoai.in" className="info-value">contact@tryoai.com</a>
            </div>

            <div className="info-block">
              <span className="info-label">Direct Dial</span>
              <a href="tel:+918147540362" className="info-value">+91 8147540362</a>
            </div>

            <div className="info-block">
              <span className="info-label">Office Address</span>
              <p className="text-lg text-secondary uppercase font-bold tracking-widest leading-none">
                C-116, Sector-2,<br />
                Noida, UP 201301<br />
                India
              </p>
            </div>

            <div className="info-block" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '4rem' }}>
              <span className="info-label">Working Hours</span>
              <p className="text-sm text-secondary font-bold uppercase tracking-widest">Global Ops: 09:00 - 18:00 IST</p>
              <p className="text-sm text-secondary font-bold uppercase tracking-widest">Support: 24/7 Enterprise Dedicated</p>
            </div>
          </div>

          {/* Right: The Luxury Form Panel */}
          <div className="contact-form-col">
            <div className="lux-form-wrapper">

              {!submitted ? (
                <form className="lux-contact-form" onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '4rem' }}>
                    <h3 className="heading-md uppercase font-bold tracking-widest leading-none mb-4">Start Your <span style={{ color: 'var(--color-primary)' }}>Vision.</span></h3>
                    <div style={{ width: '40px', height: '2px', background: 'var(--color-primary)' }}></div>
                  </div>

                  <div className="lux-form-group">
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="YOUR FULL NAME *" className="lux-input" />
                  </div>

                  <div className="lux-form-group">
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="CORPORATE EMAIL *" className="lux-input" />
                  </div>

                  <div className="lux-form-group">
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required placeholder="NAME OF YOUR BRAND *" className="lux-input" />
                  </div>

                  <div className="lux-form-group">
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="PROJECT DETAILS & VISION *" className="lux-input" rows="4"></textarea>
                  </div>

                  <div className="lux-form-group" style={{ marginTop: '2rem' }}>
                    <button type="submit" className="btn-form-submit">
                      <span className="btn-text">INITIATE CONNECTION</span>
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  className="lux-success-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ textAlign: 'center', padding: '4rem 1rem' }}
                >
                  <div style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>✦</div>
                  <h2 className="heading-lg uppercase mb-6 leading-tight">Transmission<br />Complete.</h2>
                  <div style={{ width: '40px', height: '2px', background: 'var(--color-primary)', margin: '0 auto 2rem' }}></div>
                  <p className="text-md text-secondary font-medium tracking-wide uppercase">An implementation director will reach out to you within the next 12 business hours.</p>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
