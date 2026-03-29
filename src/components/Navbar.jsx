import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { usePreloader } from '../context/PreloaderContext'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isPreloaderFinished } = usePreloader();

  useEffect(() => {
    if (!isPreloaderFinished) return;

    let ctx = gsap.context(() => {
      // Animate the entire navbar to prevent link misalignments
      gsap.fromTo('.navbar', 
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
    })

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    }
  }, [isPreloaderFinished])

  const closeMenu = () => setIsOpen(false);

  // Helper to check active route
  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  const isPlatformPage = location.pathname === '/platform';

  return (
    <nav className={`navbar ${(scrolled || isPlatformPage) ? 'navbar-scrolled' : ''}`} id="navbar">
      <div className="navbar__container">
        
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/TryoAI-Logo.png" alt="Tryo AI Logo" className="navbar-logo-image" />
          <span className="navbar-logo-text">Tryo<span style={{color: 'var(--color-primary)'}}>AI</span></span>
        </Link>

        {/* Links Panel */}
        <div className={`navbar-links ${isOpen ? 'mobile-active' : ''}`}>
          <Link to="/about" className={`navbar-link ${isActive('/about')}`} onClick={closeMenu}>About</Link>
          <Link to="/features" className={`navbar-link ${isActive('/features')}`} onClick={closeMenu}>Features</Link>
          <Link to="/use-cases" className={`navbar-link ${isActive('/use-cases')}`} onClick={closeMenu}>Use Cases</Link>
          <Link to="/contact" className={`navbar-link ${isActive('/contact')}`} onClick={closeMenu}>Contact</Link>
          
          <a href="https://play.google.com/store/apps/details?id=com.diin.tryoai.triyoai" target="_blank" rel="noopener noreferrer" className="navbar-btn-get-started" onClick={closeMenu}>
            Get Started <span className="btn-arrow-nav">-&gt;</span>
          </a>
        </div>

        {/* Mobile Burger Toggle */}
        <button 
          className={`navbar-toggle ${isOpen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>

      </div>
    </nav>
  )
}
