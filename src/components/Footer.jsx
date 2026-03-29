import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePreloader } from '../context/PreloaderContext'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const marqueeRef = useRef(null)
  const { isPreloaderFinished } = usePreloader();

  useEffect(() => {
    if (!isPreloaderFinished) return;

    const ctx = gsap.context(() => {
      // Marquee animation
      gsap.to('.footer-marquee__track', {
        xPercent: -50,
        duration: 25,
        ease: 'none',
        repeat: -1,
      })

      // Reveal footer content
      gsap.from('.footer__content', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    }, footerRef)

    return () => ctx.revert()
  }, [isPreloaderFinished])

  return (
    <footer ref={footerRef} className="footer" id="site-footer">
      <div className="footer-marquee" ref={marqueeRef}>
        <div className="footer-marquee__track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="footer-marquee__item">
              <span className="footer-marquee__text">TRYOAI</span>
              <span className="footer-marquee__star">✦</span>
              <span className="footer-marquee__text footer-marquee__text--outline">FUTURE OF FASHION</span>
              <span className="footer-marquee__star">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="footer__content container">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <div className="footer__logo">
              <span className="footer__logo-text">Tryo</span>
              <span className="footer__logo-accent">AI</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)', maxWidth: '300px', marginTop: '1rem' }}>
              Redefining how the world experiences fashion through the power of artificial intelligence.
            </p>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Platform</h4>
            <div className="footer__links">
              <Link to="/platform" className="footer__link">How It Works</Link>
              <Link to="/features" className="footer__link">Features</Link>
              <Link to="/use-cases" className="footer__link">Use Cases</Link>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Company</h4>
            <div className="footer__links">
              <Link to="/about" className="footer__link">About</Link>
              <Link to="/contact" className="footer__link">Contact</Link>
              <a href="#" className="footer__link">Careers</a>
              <a href="#" className="footer__link">Blog</a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Connect</h4>
            <div className="footer__links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__link">Twitter / X</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__link">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__link">LinkedIn</a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="footer__link">Discord</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="divider-line" style={{ marginBottom: '1.5rem' }}></div>
          <div className="footer__bottom-inner">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              © 2026 TryoAI. All rights reserved.
            </p>
            <div className="footer__bottom-links">
              <Link to="/privacy" className="footer__bottom-link">Privacy</Link>
              <a href="#" className="footer__bottom-link">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
