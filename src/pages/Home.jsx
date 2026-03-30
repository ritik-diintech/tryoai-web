import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePreloader } from '../context/PreloaderContext'
import SectionReveal from '../components/SectionReveal'

// Images
import heroImg from '../assets/tryoImage/homeHero1.png'
import heroImg2 from '../assets/tryoImage/homeHero2.png'
import heroImg3 from '../assets/tryoImage/homeHero3.png'
import heroImg4 from '../assets/tryoImage/homeHero4.png'
import heroImg5 from '../assets/tryoImage/homeHero5.png'
import heroImg6 from '../assets/tryoImage/homeHero6.png'
import showcase1 from '../assets/images/dressTrial.jpg'
import showcase2 from '../assets/images/multidress.jpg'
import processImg from '../assets/images/meta-retail-concept-.avif'
import visionImg from '../assets/images/showcaseCloth.jpg'
import girlMirrorEffect from '../assets/images/girlMirrorEffect.jpg'
import virtualDressTrial from '../assets/images/virualDressTrial.jpg'
import futuristicVirtual from '../assets/indianTryo/indainWomanDressCard.jpeg'
import animatedClothDesign from '../assets/images/animatedClosthdesing.jpg'
import multidressPng from '../assets/images/multidress.png'

// New Floating Images for Intro
import floatImg1 from '../assets/tryoImage/man-hoddeytry.jpeg'
import floatImg3 from '../assets/tryoImage/groupOfModel2.jpeg'
import floatImg2 from '../assets/indianTryo/womanDress2.jpeg'
import floatImg4 from '../assets/tryoImage/cardfashon2.jpeg'
import floatImg5 from '../assets/indianTryo/womanREdLahnga.jpeg'

// Images for the new Upload Section
import uploadImg1 from '../assets/tryoImage/uploadImage1.jpeg'
import uploadImg2 from '../assets/indianTryo/mobileIndianDress.jpeg'

// Comparison Slider Images
import girl1Before from '../assets/tryoImage/looktry2.png'
import girl1After from '../assets/tryoImage/looktry3.png'
import girl2Before from '../assets/tryoImage/girl-dress2-try1.jpg'
import girl2After from '../assets/tryoImage/girl-dress2-try2.png'
import man1Before from '../assets/indianTryo/classicCloths2.jpeg'
import man1After from '../assets/indianTryo/classicCloths.jpeg'

// New Feature Images
import multiMobile1 from '../assets/indianTryo/verticalMobileDress.jpeg'
import multiMobile2 from '../assets/tryoImage/mulitimobileDress.jpeg'

const framesGlob = import.meta.glob('../assets/clothChangeingFrames/*.jpg', { eager: true });
const frameUrls = Object.keys(framesGlob).sort().map(key => framesGlob[key].default);

const manFramesGlob = import.meta.glob('../assets/manClothChangingFrames/*.jpg', { eager: true });
const manFrameUrls = Object.keys(manFramesGlob).sort().map(key => manFramesGlob[key].default);

import TryoMagic from '../components/TryoMagic'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

// BeforeAfterSlider Component
const BeforeAfterSlider = ({ beforeImg, afterImg }) => {
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
      let x = e.clientX || e.touches[0].clientX;
      let rect = slider.getBoundingClientRect();
      let newX = x - rect.left;

      // Clamp the position within the slider bounds
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
      onMouseMove(e); // Set initial position on click/touch
    };

    handle.addEventListener('mousedown', onMouseDown);
    handle.addEventListener('touchstart', onMouseDown);

    // Initial setup
    const initialPosition = slider.clientWidth / 2;
    imgAfter.style.clipPath = `inset(0 ${slider.clientWidth - initialPosition}px 0 0)`;
    handle.style.left = `${initialPosition}px`;
    divider.style.left = `${initialPosition}px`;

    const handleResize = () => {
      const currentPosition = parseFloat(handle.style.left);
      const rect = slider.getBoundingClientRect();
      const newPosition = Math.max(0, Math.min(currentPosition, rect.width));
      imgAfter.style.clipPath = `inset(0 ${rect.width - newPosition}px 0 0)`;
      handle.style.left = `${newPosition}px`;
      divider.style.left = `${newPosition}px`;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      handle.removeEventListener('mousedown', onMouseDown);
      handle.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
    };
  }, []);

  return (
    <div className="before-after-slider" ref={sliderRef}>
      <img src={beforeImg} alt="Before" className="before-img" />
      <img src={afterImg} alt="After" className="after-img" ref={imgAfterRef} />
      <div className="slider-divider" ref={dividerRef}></div>
      <div className="slider-handle" ref={handleRef}>
        <div className="handle-arrow left"></div>
        <div className="handle-arrow right"></div>
      </div>
      <span className="slider-label before-label">Before</span>
      <span className="slider-label after-label">After</span>
    </div>
  );
};

export default function Home() {
  const pageRef = useRef(null)
  const canvasRef = useRef(null)
  const clothChangeContainerRef = useRef(null)
  const manCanvasRef = useRef(null)
  const manContainerRef = useRef(null)
  const { isPreloaderFinished } = usePreloader();

  useEffect(() => {
    if (!isPreloaderFinished) return;

    const delayBase = 0.2; // Small base delay after preloader completes/navigation occurs

    const ctx = gsap.context(() => {
      const cleanups = [];

      // Initial Page Load Reveal
      gsap.fromTo('.home-hero__bg',
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power3.out', delay: delayBase }
      )

      gsap.from('.hero-huge-text span', {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.5,
        ease: 'power4.out',
        delay: delayBase + 0.2
      })

      gsap.from('.hero-subtext-layer', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: delayBase + 0.8
      })

      gsap.from('.hero-sidebar-link', {
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        delay: delayBase + 1.0
      })

      // Hero Scroll Interactions (No opacity conflict)
      gsap.to('.hero-text-left', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      gsap.to('.hero-text-right', {
        xPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Additional background zoom on scroll
      gsap.to('.home-hero__bg', {
        scale: 1.35,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Hero Image Slideshow
      const heroImages = gsap.utils.toArray('.hero-fullscreen-img');
      if (heroImages.length > 0) {
        gsap.set(heroImages, { opacity: 0 });
        gsap.set(heroImages[0], { opacity: 1 }); // Start with first image visible

        const heroTl = gsap.timeline({ repeat: -1 });

        heroImages.forEach((img, i) => {
          const nextIndex = (i + 1) % heroImages.length;
          const nextImg = heroImages[nextIndex];

          // Image stays visible for a decent amount of time then crossfades
          heroTl.to(img, {
            opacity: 0,
            duration: 1.2,
            ease: 'power2.inOut'
          }, `+=${2}`) // Visible for 2 seconds
            .to(nextImg, {
              opacity: 1,
              duration: 1.2,
              ease: 'power2.inOut'
            }, '<'); // Crossfade: start at the same time the previous one starts fading
        });
      }

      // Video Section Cinematic Reveal
      const videoTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#home-videos',
          start: 'top 75%'
        }
      });

      videoTl.from('.video-heading', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
        .from('.video-subheading', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.6')
        .from('.video-card', {
          y: 60,
          opacity: 0,
          rotationX: -15,
          stagger: 0.2,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=0.4');

      // Shorts Section Cinematic Reveal
      const shortsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#home-shorts',
          start: 'top 75%'
        }
      });

      shortsTl.from('.shorts-heading', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
        .from('.shorts-subheading', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.6')
        .from('.short-card', {
          y: 60,
          opacity: 0,
          rotationY: -15,
          stagger: 0.2,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=0.4');

      // Intro Editorial Reveal Animation
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#home-intro',
          start: 'top 75%'
        }
      })

      introTl.from('.intro-editorial__heading', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      })
        .from('.intro-editorial__text-col', {
          borderLeftColor: 'rgba(255,255,255,0)',
          duration: 0.8
        }, '-=1')
        .from('.intro-editorial__desc p', {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.8')
        .from('.intro-editorial__text-col .btn-magnetic', {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.8')
        .from('.intro-editorial__image-col', {
          clipPath: 'inset(100% 0 0 0)',
          opacity: 0,
          duration: 1.4,
          ease: 'power4.inOut'
        }, '-=1.8')
        .from('.intro-editorial__image-col img', {
          scale: 1.5,
          duration: 1.8,
          ease: 'power3.out'
        }, '-=1.4')

      // Cloth Changing Canvas Animation
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

            // Align center horizontally
            const centerShift_x = (canvas.width - img.width * ratio) / 2;

            // Align top vertically so the model's head doesn't get cropped
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
            start: 'top 65px', // Pin below the 65px navbar
            end: window.innerWidth < 900 ? '+=300%' : '+=600%', // Faster speed on mobile, smooth cinematic on desktop
            scrub: window.innerWidth < 900 ? 0.8 : 1.5,     // More responsive scrub on mobile, fluid on desktop
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

        // Push cleanup to array to be safely returned at end
        cleanups.push(() => window.removeEventListener('resize', handleResize));
      }

      // 2.7 NEW: Man Cloth Changing Canvas Animation
      if (manCanvasRef.current && manContainerRef.current) {
        const canvas = manCanvasRef.current;
        const ctxCanvas = canvas.getContext('2d');

        const updateCanvasSize = () => {
          if (manContainerRef.current) {
            canvas.width = manContainerRef.current.clientWidth;
            canvas.height = manContainerRef.current.clientHeight;
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

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = 0;

            ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
            ctxCanvas.drawImage(img, 0, 0, img.width, img.height,
              centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
          }
        };

        for (let i = 0; i < manFrameUrls.length; i++) {
          const img = new Image();
          img.src = manFrameUrls[i];
          img.onload = () => {
            if (i === 0) render();
          };
          images.push(img);
        }

        const stepTl = gsap.timeline({
          scrollTrigger: {
            trigger: manContainerRef.current,
            start: 'top 65px',
            end: window.innerWidth < 900 ? '+=300%' : '+=600%',
            scrub: window.innerWidth < 900 ? 0.8 : 1.5,
            pin: true,
            anticipatePin: 1
          }
        });

        stepTl.to(frameState, {
          frame: manFrameUrls.length - 1,
          snap: 'frame',
          ease: 'none',
          duration: 3,
          onUpdate: render
        });

        // Text Step Animations
        stepTl.to('.man-step-1', { opacity: 0, y: -40, duration: 0.4, ease: 'power2.in' }, 0.8);
        stepTl.fromTo('.man-step-2',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          1.2
        );
        stepTl.to('.man-step-2', { opacity: 0, y: -40, duration: 0.4, ease: 'power2.in' }, 1.8);
        stepTl.fromTo('.man-step-3',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          2.2
        );

        const handleResize = () => {
          updateCanvasSize();
          render();
        };
        window.addEventListener('resize', handleResize);
        cleanups.push(() => window.removeEventListener('resize', handleResize));
      }

      // Parallax images
      gsap.utils.toArray('.img-parallax').forEach(img => {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })

      // Showcase text 3D continuous rotation scrub
      gsap.utils.toArray('.showcase-huge-text-wrapper').forEach((wrapper, i) => {
        const rotationElement = wrapper.querySelector('.heading-rotation');
        gsap.fromTo(rotationElement,
          { rotateX: 90 },
          {
            rotateX: -20, // Final rotation so the face tilts up smoothly as you scroll past
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top bottom', // when the top of the text hits the bottom of the viewport
              end: 'bottom top',   // when the bottom of the text hits the top of the viewport
              scrub: 1
            }
          }
        );
      });

      // Showcase image and text entrance animation
      const showcaseEnterTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#home-showcase',
          start: 'top 65%'
        }
      })

      showcaseEnterTl.from('.showcase-image-wrap', {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out'
      })
        .from('.showcase-text-wrap p', {
          x: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out'
        }, '-=1')

      // Line reveals
      gsap.utils.toArray('.divider-line').forEach(line => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'left center',
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%'
          }
        })
      })

      // Process section cinematic reveal
      const processTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#home-process',
          start: 'top 65%'
        }
      });

      processTl.to('.process-img-reveal', {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.5,
        ease: 'power4.inOut'
      })
        .fromTo('.img-parallax-strong',
          { scale: 1.3 },
          { scale: 1, duration: 1.5, ease: 'power3.out' },
          '-=1.5'
        )
        .to('.process-word', {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out'
        }, '-=1.0')
        .from('.process-desc', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.6');

      // Add parallax to strong parallax images independently
      gsap.utils.toArray('.img-parallax-strong').forEach(img => {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // Stats Counter Animation
      const statsCards = gsap.utils.toArray('.stat-premium-card');
      if (statsCards.length > 0) {
        gsap.from(statsCards, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#home-stats',
            start: 'top 75%'
          }
        });

        const numbers = gsap.utils.toArray('.stat-number-val');
        numbers.forEach(num => {
          const target = parseFloat(num.getAttribute('data-target'));
          const decimals = num.getAttribute('data-decimals') ? parseInt(num.getAttribute('data-decimals')) : 0;
          const counter = { val: 0 };

          gsap.to(counter, {
            val: target,
            duration: 2.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: num,
              start: 'top 85%'
            },
            onUpdate: function () {
              num.innerHTML = (counter.val).toFixed(decimals);
            }
          });
        });
      }

      // Ultra-Premium Top Benefits Entrance Animation
      const capabilityRows = gsap.utils.toArray('.capability-row');
      if (capabilityRows.length > 0) {
        gsap.set('.capabilities-list', { perspective: 1200 });

        const capTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-capabilities',
            start: 'top 75%'
          }
        });

        capTl.from('.capabilities-header .heading-lg', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'expo.out'
        })
          .from('.capabilities-header p', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
          }, '-=0.6')
          .from(capabilityRows, {
            y: 50,
            opacity: 0,
            rotationX: -45,
            scale: 0.98,
            transformOrigin: '50% 0%',
            stagger: 0.2,
            duration: 1.5,
            ease: 'expo.out',
            clearProps: 'all'
          }, '-=0.4');

        // Micro-stagger for elements inside each row to cascade beautifully
        capabilityRows.forEach((row, i) => {
          capTl.from(row.querySelectorAll('.text-sm, .heading-xl, .arrow'), {
            x: -15,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'all'
          }, `<${i * 0.2 + 0.2}`);
        });
      }

      // Virtual Try On Clothes (Home Feature Upload) Reveal
      const uploadTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#home-feature-upload',
          start: 'top 70%'
        }
      });

      uploadTl.from('.feature-img-card', {
        y: 80,
        opacity: 0,
        stagger: 0.25,
        duration: 1.5,
        ease: 'power3.out'
      })
        .from('.feature-text-side .text-tag', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=1.2')
        .from('.reveal-text-line-simple', {
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out'
        }, '-=1.0')
        .from('.feature-text-side p, .feature-text-side .btn-magnetic', {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.8')
        .from('.feature-steps .feature-step-row', {
          x: -20,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.8');

      // What is Virtual Try-On Section Animation
      const tryonTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#home-what-is-tryon',
          start: 'top 70%'
        }
      });

      tryonTl.from('.home-what-is-tryon .heading-huge', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      })
        .from('.home-what-is-tryon .text-lg', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.8')
        .from('.feature-block-item', {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.6')
        .from('.tryon-card-landscape', {
          x: 60,
          opacity: 0,
          stagger: 0.3,
          duration: 1.5,
          ease: 'expo.out'
        }, '-=1.2')
        .from('.home-what-is-tryon .btn-magnetic', {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        }, '-=1');

      // Testimonials Marquee MatchMedia
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        // Desktop: Vertical Marquee
        gsap.to('.col-marquee-1', {
          y: '-50%',
          duration: 35,
          ease: 'none',
          repeat: -1,
          force3D: true, // Use GPU acceleration
          scrollTrigger: {
            trigger: '.home-testimonials',
            toggleActions: 'play pause play pause' // Only animate when in view
          }
        });
        gsap.to('.col-marquee-2', {
          y: '-50%',
          duration: 45,
          ease: 'none',
          repeat: -1,
          force3D: true,
          scrollTrigger: {
            trigger: '.home-testimonials',
            toggleActions: 'play pause play pause'
          }
        });
      });

      mm.add("(max-width: 900px)", () => {
        // Mobile: Horizontal Marquee
        gsap.set(['.col-marquee-1', '.col-marquee-2'], { y: 0 }); // Ensure Y is reset

        gsap.to('.col-marquee-1', {
          x: '-50%',
          duration: 22,
          ease: 'none',
          repeat: -1,
          force3D: true,
          scrollTrigger: {
            trigger: '.home-testimonials',
            toggleActions: 'play pause play pause'
          }
        });
        gsap.to('.col-marquee-2', {
          x: '-50%',
          duration: 28,
          ease: 'none',
          repeat: -1,
          force3D: true,
          scrollTrigger: {
            trigger: '.home-testimonials',
            toggleActions: 'play pause play pause'
          }
        });
      });

      // Cinematic Vision Reveal Animation
      const visionTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#home-vision',
          start: 'top 60%'
        }
      });

      visionTl.fromTo('#home-vision .img-parallax',
        { scale: 1.6, transformOrigin: 'center center' },
        { scale: 1, duration: 5, ease: 'power3.out' }
      )
        .fromTo('.vision-overlay',
          { backgroundColor: 'rgba(0,0,0,0.95)' },
          { backgroundColor: 'rgba(0,0,0,0.4)', duration: 2.5, ease: 'power2.out' },
          '<0'
        )
        .from('.vision-line', {
          y: '100%',
          opacity: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: 'power4.out'
        }, '-=2.8')
        .from('.vision-heading', {
          scale: 0.85,
          duration: 3.5,
          ease: 'power2.out'
        }, '-=3.0');

      // Ultra-Unique Pinned Sequence Animation
      const uniqueSteps = gsap.utils.toArray('.unique-step');
      if (uniqueSteps.length > 0) {

        gsap.set(uniqueSteps, { autoAlpha: 0, zIndex: 1 });

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.unique-pinned-wrapper',
            start: 'center center',
            end: '+=400%', // 400% of viewport height for scrolling
            pin: true,
            scrub: 1
          }
        });

        pinTl.to('.unique-progress-fill', { width: '100%', ease: 'none', duration: uniqueSteps.length * 2 }, 0);

        // Slow cinematic horizontal sweep pan for the persistent image
        pinTl.fromTo('.unique-pan-img',
          { xPercent: 25, scale: 1.5, transformOrigin: 'center center' },
          { xPercent: -25, ease: 'none', duration: uniqueSteps.length * 2 },
          0
        );

        uniqueSteps.forEach((step, i) => {
          const startTime = i * 2;

          pinTl.set(step, { zIndex: 10 }, startTime);

          pinTl.to(step, {
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out'
          }, startTime);

          const children = step.children;
          pinTl.fromTo(children,
            { y: 100, rotationX: -60, autoAlpha: 0, scale: 0.8 },
            { y: 0, rotationX: 0, autoAlpha: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: 'expo.out' },
            startTime
          );

          pinTl.to({}, { duration: 0.7 }, startTime + 0.8);

          if (i !== uniqueSteps.length - 1) {
            pinTl.to(step, {
              autoAlpha: 0,
              y: -100,
              scale: 1.1,
              duration: 0.5,
              ease: 'power2.in'
            }, startTime + 1.5);

            pinTl.set(step, { zIndex: 1 }, startTime + 2);
          }
        });
      }

      // Quick Implementation Scrub Text Fill Animation
      const quickTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#home-quick-cta',
          start: 'top 90%',
          end: 'center 60%',
          scrub: 1
        }
      });

      quickTl.to('.quick-text-fill', {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none'
      });

      gsap.from('.quick-cta-content', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.quick-cta-content',
          start: 'top 90%'
        }
      });

      // Prevent ScrollTrigger calculation issues by sorting them
      ScrollTrigger.sort();

      return () => {
        cleanups.forEach(fn => fn());
      };
    }, pageRef);

    return () => ctx.revert();
  }, [isPreloaderFinished])

  return (
    <main ref={pageRef} className="home-page">

      {/* 1. HERO SECTION */}
      <section className="home-hero section-fullscreen" id="home-hero">
        <div className="home-hero__bg">
          <img src={heroImg} alt="Virtual Fashion Background" className="hero-fullscreen-img" style={{ position: 'absolute', inset: 0, transformOrigin: 'top', width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src={heroImg2} alt="Virtual Fashion Background 2" className="hero-fullscreen-img" style={{ position: 'absolute', inset: 0, transformOrigin: 'top', width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src={heroImg3} alt="Virtual Fashion Background 3" className="hero-fullscreen-img" style={{ position: 'absolute', inset: 0, transformOrigin: 'top', width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src={heroImg4} alt="Virtual Fashion Background 4" className="hero-fullscreen-img" style={{ position: 'absolute', inset: 0, transformOrigin: 'top', width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src={heroImg5} alt="Virtual Fashion Background 5" className="hero-fullscreen-img" style={{ position: 'absolute', inset: 0, transformOrigin: 'top', width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src={heroImg6} alt="Virtual Fashion Background 6" className="hero-fullscreen-img" style={{ position: 'absolute', inset: 0, transformOrigin: 'top', width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="home-hero__content">
          <div className="hero-huge-text">
            <span className="hero-text-left">VIRTUAL</span>
            <span className="hero-text-right">TRY- ON</span>
          </div>
        </div>

        <div className="hero-subtext-layer" style={{
          position: 'absolute',
          bottom: '1%',
          right: '4%',
          maxWidth: '480px',
          textAlign: 'right',
          zIndex: 10,
          pointerEvents: 'auto',
          cursor: 'default'
        }}>
          {/* Decorative accent line */}
          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7))',
            marginLeft: 'auto',
            marginBottom: '1rem'
          }} />
          {/* Label */}
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-primary)',
            fontSize: '0.7rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '0.75rem',
            fontWeight: 400
          }}>
            The <span className="italic-accent">Future</span> of Fashion
          </span>
          {/* Main tagline */}
          <p style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
            lineHeight: '1.75',
            color: 'rgba(255,255,255,0.65)',
            fontWeight: 300,
            letterSpacing: '0.02em',
            margin: 0
          }}>
            Redefine how your customers experience style —
            <br />
            <span style={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              letterSpacing: '0.04em'
            }}>
              instant AI-powered virtual try-ons,
            </span>
            <br />
            crafted for modern retail & Platform.
          </p>
        </div>

        <div className="hero-sidebar">
          <Link to="/features" className="hero-sidebar-link">AI TRY-ON</Link>
          <Link to="/use-cases" className="hero-sidebar-link">IN-STORE MIRRORS</Link>
          <Link to="/platform" className="hero-sidebar-link">PLATFORM</Link>
          <a href="#" className="hero-sidebar-link">BOOK A DEMO</a>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="home-intro section border-bottom bg-theme-offwhite-premium" id="home-intro" style={{ padding: '8rem 0' }}>
        <div className="container">
          <div className="intro-editorial">
            <div className="intro-editorial__text-col">
              <h2 className="intro-editorial__heading">
                READY TO MODERNIZE<br />
                YOUR <span className="italic-accent">FASHION<br />
                  STORE?</span>
              </h2>
              <div className="intro-editorial__desc">
                <p style={{ marginBottom: '1.5rem' }}>
                  TryOAI lets customers click a photo, choose outfits, and see themselves in new clothes – instantly, via AI.
                </p>
                <p>
                  Experience the future of fashion trials with these exclusive advantages. Replace sluggish trial room queues with a seamless digital shopping experience on mobile or in-store kiosks.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                <Link to="/platform" className="btn-magnetic btn-primary" style={{ padding: '0.85rem 2rem', fontWeight: 600 }}>Try Demo</Link>
                <Link to="/contact" className="btn-magnetic btn-outline" style={{ padding: '0.85rem 2rem', fontWeight: 600 }}>Book a Demo</Link>
              </div>
            </div>
            <div className="intro-editorial__image-col floating-images-container">
              <div className="float-img float-img-1"><img src={floatImg1} alt="Fashion 1" /></div>
              <div className="float-img float-img-2"><img src={floatImg2} alt="Fashion 2" /></div>
              <div className="float-img float-img-3"><img src={floatImg3} alt="Fashion 3" /></div>
              <div className="float-img float-img-4"><img src={floatImg4} alt="Fashion 4" /></div>
              <div className="float-img float-img-5"><img src={floatImg5} alt="Fashion 5" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 CLOTH CHANGING FRAMES */}
      <section ref={clothChangeContainerRef} className="cloth-changing-section section" id="cloth-changing">
        <canvas ref={canvasRef} className="cloth-changing-canvas"></canvas>
        <div className="cloth-changing-text-overlay container">
          <div className="scroll-experience-hint" style={{
            marginTop: '35vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            opacity: 0.8
          }}>
            <div style={{ width: '1px', height: '60px', background: 'var(--color-text)', opacity: 0.3 }}></div>
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              fontWeight: 500,
              color: 'var(--color-text)'
            }}>
              Scroll to Experience
            </span>
          </div>
        </div>
      </section>

      {/* 2.8 VIRTUAL TRY ON FEATURE (NEW) */}
      <section className="home-feature-upload section border-bottom bg-theme-offwhite-premium" id="home-feature-upload">
        <div className="container" style={{ padding: '8rem var(--container-padding)' }}>
          <div className="grid-split-half feature-grid" style={{ alignItems: 'center', gap: '5rem' }}>

            <div className="feature-images-side">
              <div className="feature-images-wrapper">
                <div className="feature-img-card img-card-bottom">
                  <img src={uploadImg2} alt="Try On Step 2" className="full-cover" />
                </div>
                <div className="feature-img-card img-card-top">
                  <img src={uploadImg1} alt="Try On Step 1" className="full-cover" />
                  <div className="upload-indicator">
                    <span>UPLOAD IMAGE</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="feature-text-side">
              <span className="text-tag mb-4 italic-accent">AI Innovation</span>
              <h2 className="heading-lg mb-8 reveal-text-line-simple" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1' }}>
                Virtual Try On <br /> <span className="text-secondary italic-accent">Clothes</span>
              </h2>
              <p className="text-lg text-secondary mb-12" style={{ maxWidth: '500px', lineHeight: '1.8' }}>
                Upload a photo or use your camera to instantly try on a wide variety of digital outfits. From everyday wear to trendy styles, the AI Clothes Changer automatically adjusts the clothes to fit your body and pose, giving you a realistic preview of how an outfit looks on you.
              </p>
              <div className="feature-steps">
                <div className="feature-step-row">
                  <div className="step-circle">01</div>
                  <p>Click or upload your photo</p>
                </div>
                <div className="feature-step-row">
                  <div className="step-circle">02</div>
                  <p>Choose your outfit</p>
                </div>
                <div className="feature-step-row">
                  <div className="step-circle">03</div>
                  <p>Instantly see the result</p>
                </div>
              </div>
              <Link to="/contact" className="btn-magnetic btn-primary mt-12" style={{ padding: '1rem 2.5rem' }}>Experience AI Now</Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2.9 TRYO MAGIC SECTION */}
      <TryoMagic />

      {/* 3. COMPARISON SLIDER SECTION (NEW) */}
      <section className="home-comparisons section bg-theme-gradient-2" id="home-comparisons">
        <div className="container" style={{ padding: '10rem var(--container-padding)' }}>
          <div className="comparison-header text-center mb-16" style={{ width: '100%', textAlign: 'center' }}>
            <h2 className="heading-lg mb-6" style={{ margin: '0 auto 1.5rem' }}>Witness the <span className="text-gradient">TryoAI Magic</span></h2>
            <p className="text-lg text-secondary mx-auto" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Experience the seamless transformation. Slide through to see how our AI instantly changes outfits while maintaining perfect body pose and fabric flow.
            </p>
          </div>

          <div className="comparison-stack row-desktop" style={{ display: 'flex', flexDirection: 'row', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <BeforeAfterSlider beforeImg={girl1Before} afterImg={girl1After} />
            <BeforeAfterSlider beforeImg={girl2Before} afterImg={girl2After} />
            <BeforeAfterSlider beforeImg={man1Before} afterImg={man1After} />
          </div>
        </div>
      </section>

      {/* 3.5 CAPABILITIES (SERVICES LIST) */}
      <section className="home-capabilities section border-bottom bg-theme-gradient-1" id="home-capabilities">
        <div className="container" style={{ padding: 0 }}>
          <div className="capabilities-header" style={{ padding: 'var(--space-xl) var(--container-padding) var(--space-md)' }}>
            <h2 className="heading-lg italic-accent">Top Benefits</h2>
          </div>
          <div className="capabilities-list">
            <Link to="/features" className="capability-row">
              <div className="capability-content container">
                <span className="text-sm">01</span>
                <h3 className="heading-xl">Save <span className="text-gradient">trial room</span> time</h3>
                <span className="arrow">→</span>
              </div>
            </Link>
            <div className="divider-line"></div>

            <Link to="/features" className="capability-row">
              <div className="capability-content container">
                <span className="text-sm">02</span>
                <h3 className="heading-xl">Better <span className="text-gradient">in-store</span> engagement</h3>
                <span className="arrow">→</span>
              </div>
            </Link>
            <div className="divider-line"></div>

            <Link to="/features" className="capability-row">
              <div className="capability-content container">
                <span className="text-sm">03</span>
                <h3 className="heading-xl">Reduce <span className="text-gradient">product</span> returns</h3>
                <span className="arrow">→</span>
              </div>
            </Link>
            <div className="divider-line"></div>

            <Link to="/features" className="capability-row">
              <div className="capability-content container">
                <span className="text-sm">04</span>
                <h3 className="heading-xl">Seamless <span className="text-gradient">digital shopping</span></h3>
                <span className="arrow">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3.7 MAN CLOTH CHANGING FRAMES (NEW) */}
      <section ref={manContainerRef} className="man-cloth-changing-section section" id="man-cloth-changing">
        <canvas ref={manCanvasRef} className="man-cloth-changing-canvas"></canvas>
        <div className="man-cloth-changing-overlay">
          <div className="container" style={{ position: 'relative', height: '100%' }}>
            <div className="man-change-steps-wrap">

              <div className="man-change-content man-step-1" style={{ position: 'absolute', bottom: 0, left: 0 }}>
                <span className="text-tag mb-4 italic-accent">01 // NEURAL RENDERING</span>
                <h2 className="heading-huge mb-6" style={{ color: 'white' }}>
                  INSTANT <span className="text-gradient" style={{ fontStyle: 'italic' }}>STYLE</span><br />
                  REVOLUTION
                </h2>
                <p className="text-lg" style={{ maxWidth: '480px', color: 'rgba(255,255,255,0.8)' }}>
                  The digital transformation of retail is here. Let customers choose, click, and see their outfits live on their own bodies within seconds.
                </p>
              </div>

              <div className="man-change-content man-step-2" style={{ opacity: 0, position: 'absolute', bottom: 0, left: 0 }}>
                <span className="text-tag mb-4 italic-accent">02 // PRECISE ACCURACY</span>
                <h2 className="heading-huge mb-6" style={{ color: 'white' }}>
                  LIMITLESS <span className="text-gradient" style={{ fontStyle: 'italic' }}>CATALOG</span><br />
                  DISCOVERY
                </h2>
                <p className="text-lg" style={{ maxWidth: '480px', color: 'rgba(255,255,255,0.8)' }}>
                  Unmatched accuracy in fabric physics. Every fold, shadow, and texture is rendered with AI-powered precision for a hyper-realistic trial experience.
                </p>
              </div>

              <div className="man-change-content man-step-3" style={{ opacity: 0, position: 'absolute', bottom: 0, left: 0 }}>
                <span className="text-tag mb-4 italic-accent">03 // STORE FUTURE</span>
                <h2 className="heading-huge mb-6" style={{ color: 'white' }}>
                  YOUR <span className="text-gradient" style={{ fontStyle: 'italic' }}>STUDIO</span><br />
                  EVERYWHERE
                </h2>
                <p className="text-lg" style={{ maxWidth: '480px', color: 'rgba(255,255,255,0.8)' }}>
                  Your entire catalog is available anywhere — whether in-store on smart mirrors or at home on a smartphone. Redefine fashion browsing instantly.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3.8 WHAT IS VIRTUAL TRY-ON (NEW PREMIUM SECTION) */}
      <section className="home-what-is-tryon section bg-theme-offwhite-premium" id="home-what-is-tryon">
        <div className="container" style={{ padding: '10rem var(--container-padding)' }}>
          <div className="grid-split-half align-center" style={{ gap: '6rem' }}>

            <div className="tryon-text-side">
              <span className="text-tag mb-6 italic-accent" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--color-text)', padding: '0.5rem 1.2rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em' }}>REDEFINING RETAIL</span>
              <h2 className="heading-huge mb-8" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: '0.95', textTransform: 'uppercase' }}>
                Next-Gen <br />
                <span className="text-gradient">Virtual Fitting</span>
              </h2>
              <p className="text-lg text-secondary mb-10" style={{ maxWidth: '540px', lineHeight: '1.7', fontSize: '1.2rem' }}>
                Step into a world where fitting rooms are obsolete. Our AI-powered virtual try-on technology creates a portable, personal dressing room within your device.
              </p>
              <div className="tryon-feature-blocks">
                <div className="feature-block-item mb-8">
                  <h4 className="heading-md mb-2 italic-accent" style={{ fontWeight: 700 }}>Beyond the Mirror</h4>
                  <p className="text-secondary" style={{ maxWidth: '400px' }}>Upload a single photo and watch as our neural engines overlay digital garments with physics-accurate precision.</p>
                </div>
                <div className="feature-block-item">
                  <h4 className="heading-md mb-2 italic-accent" style={{ fontWeight: 700 }}>Portable Convenience</h4>
                  <p className="text-secondary" style={{ maxWidth: '400px' }}>Access your personal style lab anywhere—turning your smartphone into a high-fidelity fashion studio.</p>
                </div>
              </div>
              <Link to="/features" className="btn-magnetic btn-primary mt-12" style={{ padding: '1.2rem 3rem' }}>Explore Technology</Link>
            </div>

            <div className="tryon-image-side">
              <div className="landscape-image-stack">
                <div className="tryon-card-landscape card-top">
                  <div className="tryon-img-wrap-premium">
                    <img src={multiMobile1} alt="Horizontal View 1" className="full-cover img-parallax" />
                  </div>
                  <div className="tryon-label-box glass-premium">
                    <span className="label-num">01</span>
                    <span className="label-txt">NEURAL FITTING</span>
                  </div>
                </div>
                <div className="tryon-card-landscape card-bottom">
                  <div className="tryon-img-wrap-premium">
                    <img src={multiMobile2} alt="Horizontal View 2" className="full-cover img-parallax" />
                  </div>
                  <div className="tryon-label-box glass-premium">
                    <span className="label-num">02</span>
                    <span className="label-txt">INSTANT STYLE</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SHOWCASE GALLERY (REDESIGNED) */}
      <section className="home-showcase section border-bottom bg-theme-offwhite-premium" id="home-showcase" style={{ overflow: 'hidden' }}>
        <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>

          <div className="showcase-heading-container">
            <div className="showcase-huge-text-wrapper align-left">
              <div className="heading-rotation">
                <div className="heading-rotation-front"><h3 className="heading-huge gradient-text-1">AI-POWERED</h3></div>
                <div aria-hidden="true" className="heading-rotation-back"><h3 className="heading-huge gradient-text-1">AI-POWERED</h3></div>
              </div>
            </div>
            <div className="showcase-huge-text-wrapper align-right">
              <div className="heading-rotation">
                <div className="heading-rotation-front"><h3 className="heading-huge gradient-text-2">VIRTUAL</h3></div>
                <div aria-hidden="true" className="heading-rotation-back"><h3 className="heading-huge gradient-text-2">VIRTUAL</h3></div>
              </div>
            </div>
            <div className="showcase-huge-text-wrapper align-center margin-left">
              <div className="heading-rotation">
                <div className="heading-rotation-front"><h3 className="heading-huge gradient-text-3">FASHION</h3></div>
                <div aria-hidden="true" className="heading-rotation-back"><h3 className="heading-huge gradient-text-3">FASHION</h3></div>
              </div>
            </div>
          </div>

          <div className="showcase-bottom-grid container">
            <div className="showcase-image-layout">
              <div className="showcase-image-wrap img-1">
                <img src={futuristicVirtual} alt="Futuristic Virtual Try-On" className="img-parallax" />
              </div>
              <div className="showcase-image-wrap img-2">
                <img src={virtualDressTrial} alt="Virtual Dress Trial" className="img-parallax" />
              </div>
            </div>
            <div className="showcase-text-wrap">
              <p>
                Trusted by leading brands to provide a smart fashion try-on experience.
              </p>
              <p>
                Add depth and capacity to your e-commerce journey by engaging with TryOAI. Elevating digital store interactions to human levels with positive purpose and precision.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4.5. SHOWCASE VIDEOS SECTION */}
      <section className="home-videos section bg-theme-gradient-2" id="home-videos" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="videos-header mb-16" style={{ textAlign: 'center' }}>
            <h2 className="heading-lg video-heading" style={{ position: 'relative', display: 'block', margin: '0 auto', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'var(--color-text)' }}>
              EXPERIENCE THE MAGIC
            </h2>
            <p className="text-lg text-secondary mt-5 video-subheading" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: '1.7', fontSize: '1.25rem', textAlign: 'center' }}>
              Watch how our AI-powered virtual try-on technology transforms the shopping experience in real-time. Unveil instantaneous results effortlessly.
            </p>
          </div>

          <div className="videos-grid-container" style={{ position: 'relative' }}>
            <div className="ambient-glow glow-1" style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none', borderRadius: '50%' }}></div>
            <div className="ambient-glow glow-2" style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none', borderRadius: '50%' }}></div>

            <div className="videos-grid" style={{ position: 'relative', zIndex: 1, alignItems: 'center' }}>
              <div className="video-card video-card-left">
                <div className="video-wrapper border-glow">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dhFldGdvrJA?si=UgIYJek3WOiArjYV&autoplay=1&mute=1&loop=1&playlist=dhFldGdvrJA&controls=0&modestbranding=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="video-card video-card-right" style={{ width: '100%', maxWidth: '320px', margin: '0 auto' }}>
                <div className="video-wrapper border-glow" style={{ paddingBottom: '0', height: 'auto', aspectRatio: '9/16' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/J6E5oc9MpB8?autoplay=1&mute=1&loop=1&playlist=J6E5oc9MpB8&controls=0&modestbranding=1"
                    title="YouTube video short"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS STATEMENT */}
      <section className="home-process section border-bottom bg-theme-gradient-2" id="home-process">
        <div className="grid-split-half process-grid">
          <div className="process-img-side">
            <div className="process-img-reveal">
              <img src={processImg} alt="Platform process" className="full-cover img-parallax-strong" />
            </div>
          </div>
          <div className="process-text-side">
            <div className="process-text-content">
              <h2 className="heading-xl mb-8 process-heading">
                <div className="process-word-wrap"><span className="process-word text-gradient">Click.</span></div>
                <div className="process-word-wrap"><span className="process-word text-gradient">Choose.</span></div>
                <div className="process-word-wrap"><span className="process-word text-gradient">See.</span></div>
              </h2>
              <div className="process-desc">
                <p className="text-lg text-secondary mb-12" style={{ maxWidth: '400px' }}>
                  TryOAI lets customers click a photo, choose outfits, and see themselves in new clothes – instantly. Improve satisfaction and reduce returns seamlessly.
                </p>
                <Link to="/contact" className="btn-magnetic btn-primary" style={{ padding: '0.85rem 2rem', fontWeight: 600 }}>Book a Demo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATS & METRICS */}
      <section className="home-stats section border-bottom bg-theme-gradient-1" id="home-stats">
        <div className="container" style={{ padding: 'var(--space-2xl) var(--container-padding)' }}>
          <div className="stats-header text-center mb-16">
            <h2 className="heading-lg">Store Metrics</h2>
            <p className="text-lg text-secondary mx-auto mt-4" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              Real results driving the next generation of digital storefronts.
            </p>
          </div>
          <div className="stats-grid-premium">
            <div className="stat-premium-card">
              <div className="stat-number-wrap">
                <h4 className="stat-number-val" data-target="80">0</h4><span className="stat-suffix">%</span>
              </div>
              <div className="divider-line-premium mb-6"></div>
              <p className="stat-premium-desc">Cheaper than traditional photoshoots</p>
            </div>

            <div className="stat-premium-card">
              <div className="stat-number-wrap">
                <h4 className="stat-number-val" data-target="3.5" data-decimals="1">0</h4><span className="stat-suffix">x</span>
              </div>
              <div className="divider-line-premium mb-6"></div>
              <p className="stat-premium-desc">Higher Add-to-Cart engagement rate</p>
            </div>

            <div className="stat-premium-card">
              <div className="stat-number-wrap">
                <h4 className="stat-number-val" data-target="60">0</h4><span className="stat-suffix">%</span>
              </div>
              <div className="divider-line-premium mb-6"></div>
              <p className="stat-premium-desc">Average reduction in product returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VISION IMAGE OVERLAY */}
      <section className="home-vision section" id="home-vision">
        <div className="vision-wrap">
          <img src={visionImg} alt="Vision outlook" className="full-cover img-parallax" />
          <div className="vision-overlay"></div>
          <div className="vision-content container">
            <h2 className="heading-xl vision-heading" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', color: 'white' }}>
              <div className="vision-line-wrap"><span className="vision-line">"REVOLUTIONIZING</span></div>
              <div className="vision-line-wrap"><span className="vision-line">HOW BRANDS</span></div>
              <div className="vision-line-wrap"><span className="vision-line">SHOWCASE FASHION."</span></div>
            </h2>
          </div>
        </div>
      </section>

      {/* 8. UNIQUE PINNED SEQUENCE FEATURES */}
      <section className="home-unique-features bg-theme-offwhite-premium" id="home-unique-features">
        <div className="unique-pinned-wrapper" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

          <div className="container" style={{ position: 'relative', height: '100%', width: '100%', perspective: '1200px' }}>
            <div className="grid-split-half" style={{ height: '100%', alignItems: 'center', gap: '4rem' }}>

              <div className="unique-left-side" style={{ position: 'relative', height: '100%' }}>
                <div className="unique-step" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
                  <span className="step-num text-gradient heading-md" style={{ letterSpacing: '0.05em', display: 'block', marginBottom: '1rem' }}>01 — AI TECHNOLOGY</span>
                  <h2 className="heading-huge mt-0 mb-6" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: '0.9', textTransform: 'uppercase' }}>VIRTUAL<br />FITTING</h2>
                  <p className="step-desc text-secondary" style={{ maxWidth: '500px', lineHeight: '1.6', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>Let customers virtually try clothes before purchasing, drastically reducing returns and increasing satisfaction.</p>
                </div>

                <div className="unique-step" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
                  <span className="step-num text-gradient heading-md" style={{ letterSpacing: '0.05em', display: 'block', marginBottom: '1rem' }}>02 — ECOSYSTEM</span>
                  <h2 className="heading-huge mt-0 mb-6" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: '0.9', textTransform: 'uppercase' }}><span className="text-gradient">MOBILE</span> &<br />IN-STORE</h2>
                  <p className="step-desc text-secondary" style={{ maxWidth: '500px', lineHeight: '1.6', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>Seamlessly works on mobile devices for at-home trials or in-store on smart mirrors and interactive displays.</p>
                </div>

                <div className="unique-step" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
                  <span className="step-num text-gradient heading-md" style={{ letterSpacing: '0.05em', display: 'block', marginBottom: '1rem' }}>03 — SYNC PLATFORM</span>
                  <h2 className="heading-huge mt-0 mb-6" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: '0.9', textTransform: 'uppercase' }}>Seamless<br />Flow</h2>
                  <p className="step-desc text-secondary" style={{ maxWidth: '500px', lineHeight: '1.6', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>Easily integrates with your existing Platform backends for a totally frictionless shopping experience.</p>
                </div>

                <div className="unique-step" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
                  <span className="step-num text-gradient heading-md" style={{ letterSpacing: '0.05em', display: 'block', marginBottom: '1rem' }}>04 — BIG DATA</span>
                  <h2 className="heading-huge mt-0 mb-6" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: '0.9', textTransform: 'uppercase' }}>SMART<br />ANALYTICS</h2>
                  <p className="step-desc text-secondary" style={{ maxWidth: '500px', lineHeight: '1.6', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>Track customer preferences, uncover most popular items, and skyrocket conversion rates with detailed data insights.</p>
                </div>
              </div>

              <div className="unique-right-side" style={{ position: 'relative', height: '65vh', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <img src={multidressPng} alt="Multi Dress Showroom" className="unique-pan-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '8%', left: '10%', right: '10%', height: '1px', background: 'rgba(0,0,0,0.1)' }}>
            <div className="unique-progress-fill" style={{ height: '100%', width: '0%', background: 'var(--color-primary)' }}></div>
          </div>

          <div style={{ position: 'absolute', bottom: '3%', left: '10%', fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            SCROLL TO DISCOVER WHY TRYOAI
          </div>

        </div>
      </section>

      {/* 9. UNIQUE TEXT FILL CTA */}
      <section className="home-quick-cta section border-bottom bg-theme-gradient-2" id="home-quick-cta" style={{ padding: '15vh 0' }}>
        <div className="container text-center">

          <div className="quick-scrub-text-wrap" style={{ position: 'relative', display: 'inline-block' }}>
            <h2 className="heading-huge quick-text-outline gradient-stroke-heading" style={{ fontSize: 'clamp(4rem, 12vw, 15rem)', lineHeight: '0.85', margin: '0', textTransform: 'uppercase' }}>
              QUICK<br />DEPLOYMENT
            </h2>
            <h2 className="heading-huge quick-text-fill" style={{ fontSize: 'clamp(4rem, 12vw, 15rem)', lineHeight: '0.85', margin: '0', color: 'var(--color-text)', textTransform: 'uppercase', position: 'absolute', top: 0, left: 0, clipPath: 'inset(100% 0% 0% 0%)' }}>
              QUICK<br />DEPLOYMENT
            </h2>
          </div>

          <div className="quick-cta-content" style={{ marginTop: '4rem' }}>
            <p className="text-xl text-secondary mb-12 mx-auto" style={{ maxWidth: '600px', lineHeight: '1.6', margin: '0 auto 3rem auto', textAlign: 'center' }}>
              Get up and running in days, not months, with our turnkey solution and expert support team. Customer data is securely handled with enterprise-grade encryption.
            </p>

            <Link to="/contact" className="btn-magnetic btn-primary" style={{ padding: '1.2rem 3.5rem', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Start Now
            </Link>
          </div>

        </div>
      </section>

      {/* 9.5. MORE MAGIC (SHORTS) SECTION */}
      <section className="home-shorts section border-bottom bg-theme-gradient-2" id="home-shorts" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="videos-header mb-16" style={{ textAlign: 'center' }}>
            <h2 className="heading-lg shorts-heading" style={{ position: 'relative', display: 'block', margin: '0 auto', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'var(--color-text)', textAlign: 'center' }}>
              REAL EXPERIENCES
            </h2>
            <p className="text-lg text-secondary mx-auto mt-5 shorts-subheading" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: '1.7', fontSize: '1.25rem', textAlign: 'center' }}>
              Dive into more authentic transformations and see the TryOAI virtual try-on in action. Unstoppable results for your shopping experience.
            </p>
          </div>

          <div className="videos-grid-container" style={{ position: 'relative' }}>
            {/* Premium glow colors to differentiate from the first section */}
            <div className="ambient-glow glow-1" style={{ position: 'absolute', top: '0%', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none', borderRadius: '50%' }}></div>
            <div className="ambient-glow glow-2" style={{ position: 'absolute', bottom: '0%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none', borderRadius: '50%' }}></div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', perspective: '1500px', padding: '40px 0' }}>

              <div className="short-card" style={{ width: '100%', maxWidth: '300px', transform: 'translateY(-20px)' }}>
                <div className="phone-frame">
                  <iframe
                    src="https://www.youtube.com/embed/LaNvbKwr8lI?autoplay=1&mute=1&loop=1&playlist=LaNvbKwr8lI&controls=0&modestbranding=1"
                    title="YouTube video short"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="short-card" style={{ width: '100%', maxWidth: '300px', transform: 'translateY(30px)' }}>
                <div className="phone-frame phone-frame-delayed">
                  <iframe
                    src="https://www.youtube.com/embed/4hyhx7H_un8?autoplay=1&mute=1&loop=1&playlist=4hyhx7H_un8&controls=0&modestbranding=1"
                    title="YouTube video short"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 11. TESTIMONIALS SECTION (AUTO MARQUEE) */}
      <section className="home-testimonials section border-bottom bg-theme-offwhite-premium" id="home-testimonials">
        <div className="container" style={{ padding: '10rem var(--container-padding)' }}>
          <div className="testimonials-header text-center mb-16">
            <span className="text-tag mb-4 italic-accent">User Stories</span>
            <h2 className="heading-lg" style={{ fontWeight: 500 }}>Voices of <span className="text-gradient">Success</span></h2>
          </div>

          <div className="testimonials-track-wrapper">
            <div className="testimonial-col col-marquee-1">
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"TryOAI has reduced our photoshoot costs by 75%. The AI models look incredibly natural."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Aarav Sharma" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Aarav Sharma</h4>
                    <span className="user-title">Urban Styles Lead</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"The best virtual try-on tech in the market. It's fast and highly precise."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya Verma" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Priya Verma</h4>
                    <span className="user-title">Creative Designer</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"Our returns have dropped significantly. A true game-changer for our store."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Rohan Gupta" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Rohan Gupta</h4>
                    <span className="user-title">Fashion Merchant</span>
                  </div>
                </div>
              </div>
              {/* Second set for seamless loop */}
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"TryOAI has reduced our photoshoot costs by 75%. The AI models look incredibly natural."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Aarav Sharma" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Aarav Sharma</h4>
                    <span className="user-title">Urban Styles Lead</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"The best virtual try-on tech in the market. It's fast and highly precise."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya Verma" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Priya Verma</h4>
                    <span className="user-title">Creative Designer</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"Our returns have dropped significantly. A true game-changer for our store."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Rohan Gupta" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Rohan Gupta</h4>
                    <span className="user-title">Fashion Merchant</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-col col-marquee-2">
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"Revolutionary tool for Indian e-commerce. Seamless integration."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Ananya Iyer" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Ananya Iyer</h4>
                    <span className="user-title">Global Retail Lead</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"The AI models match Indian body types perfectly. Very impressive."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Vikram Khurana" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Vikram Khurana</h4>
                    <span className="user-title">EthniCo Visionary</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"Highly recommend for any fashion brand looking to scale digital trials."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/women/17.jpg" alt="Sneha Nair" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Sneha Nair</h4>
                    <span className="user-title">Marketing Head</span>
                  </div>
                </div>
              </div>
              {/* Second set for seamless loop */}
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"Revolutionary tool for Indian e-commerce. Seamless integration."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Ananya Iyer" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Ananya Iyer</h4>
                    <span className="user-title">Global Retail Lead</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"The AI models match Indian body types perfectly. Very impressive."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Vikram Khurana" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Vikram Khurana</h4>
                    <span className="user-title">EthniCo Visionary</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="rating">★★★★★</div>
                <p>"Highly recommend for any fashion brand looking to scale digital trials."</p>
                <div className="user-profile">
                  <div className="avatar-img-wrap">
                    <img src="https://randomuser.me/api/portraits/women/17.jpg" alt="Sneha Nair" className="avatar-img" loading="lazy" />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">Sneha Nair</h4>
                    <span className="user-title">Marketing Head</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER PRE-CTA */}
      <section className="home-cta section border-bottom bg-theme-offwhite-premium" id="home-cta">
        <div className="container" style={{ padding: 'var(--space-2xl) var(--container-padding)' }}>
          <SectionReveal className="grid-split align-center">
            <div className="grid-left">
              <h2 className="heading-xl">Ready to<br />Scale?</h2>
            </div>
            <div className="grid-right text-right">
              <p className="text-lg text-secondary mb-8" style={{ marginLeft: 'auto', maxWidth: '400px' }}>
                Join leading brands in modernizing their trial rooms and digital platforms.
              </p>
              <Link to="/contact" className="heading-md" style={{ textDecoration: 'underline', textUnderlineOffset: '8px' }}>
                BOOK A DEMO
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

    </main>
  )
}
