import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TryoMagic.css'

// Import images
import man1Before from '../assets/indianTryo/manTry1-image1.jpeg'
import man1After from '../assets/indianTryo/manTry1-image2.png'
import girl1Before from '../assets/indianTryo/womanTry1-image1.png'
import girl1After from '../assets/indianTryo/womanTry2-image2.png'

gsap.registerPlugin(ScrollTrigger)

const TryoMagic = () => {
    const sectionRef = useRef(null)
    const containerRef = useRef(null)
    const portalRef = useRef(null)

    useEffect(() => {
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 901px)",
            isMobile: "(max-width: 900px)"
        }, (context) => {
            let { isDesktop, isMobile } = context.conditions;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    end: "bottom center",
                },
                repeat: -1,
                repeatDelay: 3
            })

            // Dynamic distance calculation
            const getDistX = () => {
                if (isMobile) return 0;
                const containerWidth = containerRef.current.offsetWidth
                const portalCenter = containerWidth / 2
                const inputCenter = containerWidth * 0.08 + 175
                return portalCenter - inputCenter
            }

            const getDistY = () => {
                if (isDesktop) return 0;
                // On mobile, they are stacked. 
                // Approx distance from input zone center to portal center
                // Input height 450, margin 40. Portal height 300, margin 60.
                return 400;
            }

            const distX = getDistX()
            const distY = getDistY()

            // Initial states
            gsap.set(".magic-card", { opacity: 0, scale: 0.8, x: 0, y: 0 })
            gsap.set(".magic-card-after", { opacity: 0, scale: 0, x: -distX, y: -distY })

            // Man Animation
            tl.to(".man-before", {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out"
            })
                .to(".man-before", {
                    x: distX,
                    y: distY,
                    scale: 0.1,
                    opacity: 0,
                    rotationY: isDesktop ? 90 : 0,
                    rotationX: isMobile ? 45 : 0, // More subtle exit
                    duration: 1.8, // Slightly faster
                    ease: "power2.in"
                })

                .to(portalRef.current, {
                    scale: 1.4,
                    filter: "brightness(4) blur(30px)",
                    duration: 0.6,
                    yoyo: true,
                    repeat: 1
                }, "-=0.3")

                .fromTo(".man-after",
                    {
                        opacity: 0,
                        scale: 0,
                        x: -distX,
                        y: -distY,
                        rotationY: isDesktop ? -180 : 0,
                        rotationX: isMobile ? -50 : 0 // More subtle entry
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotationY: 0,
                        rotationX: 0,
                        duration: 1.8, // Slightly faster
                        ease: "power3.out"
                    }, "-=0.7"
                )
                .to(".man-after", {
                    opacity: 0,
                    x: isDesktop ? 100 : 0,
                    y: isMobile ? 50 : 0, // Reduced mobile exit distance
                    scale: 0.9,
                    duration: 1,
                    delay: 2.5,
                    ease: "power3.in"
                })

            // Girl Animation
            tl.to(".girl-before", {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out"
            }, "+=0.2")
                .to(".girl-before", {
                    x: distX,
                    y: distY,
                    scale: 0.2,
                    opacity: 0,
                    rotationY: isDesktop ? -90 : 0,
                    rotationX: isMobile ? -90 : 0,
                    duration: 1.8,
                    ease: "power2.in"
                })

                .to(portalRef.current, {
                    scale: 1.4,
                    filter: "brightness(4) blur(30px)",
                    duration: 0.6,
                    yoyo: true,
                    repeat: 1
                }, "-=0.3")

                .fromTo(".girl-after",
                    {
                        opacity: 0,
                        scale: 0,
                        x: -distX,
                        y: -distY,
                        rotationY: isDesktop ? 180 : 0,
                        rotationX: isMobile ? 180 : 0
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotationY: 0,
                        rotationX: 0,
                        duration: 2.2,
                        ease: "power4.out"
                    }, "-=0.7"
                )
                .to(".girl-after", {
                    opacity: 0,
                    x: isDesktop ? 100 : 0,
                    y: isMobile ? 50 : 0, // Reduced mobile exit distance
                    scale: 0.9,
                    duration: 1,
                    delay: 2.5,
                    ease: "power3.in"
                })
        });

        return () => mm.revert();
    }, [])

    return (
        <section className="tryo-magic-section" ref={sectionRef}>
            <div className="tryo-magic-header">
                <h2 className="magic-title">AI Fashion <span className="gradient-text italic-accent">Evolution</span></h2>
                <p className="magic-subtitle">See your style transform instantly with our advanced AI engine</p>
            </div>

            <div className="magic-container" ref={containerRef}>
                {/* Left Side: Input */}
                <div className="magic-input-zone">
                    <div className="magic-card man-before">
                        <img src={man1Before} alt="Original Man" />
                        <div className="card-tag">Original</div>
                    </div>
                    <div className="magic-card girl-before">
                        <img src={girl1Before} alt="Original Girl" />
                        <div className="card-tag">Original</div>
                    </div>
                </div>

                {/* Center: Portal */}
                <div className="magic-portal-wrapper">
                    <div className="magic-portal" ref={portalRef}>
                        <div className="portal-ring"></div>
                        <div className="portal-ring"></div>
                        <div className="portal-ring"></div>
                        <div className="portal-core">
                            <span className="portal-logo">TryoAI</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Output */}
                <div className="magic-output-zone">
                    <div className="magic-card-after man-after">
                        <img src={man1After} alt="Transformed Man" />
                        <div className="card-tag gold">TryoAI Magic</div>
                    </div>
                    <div className="magic-card-after girl-after">
                        <img src={girl1After} alt="Transformed Girl" />
                        <div className="card-tag gold">TryoAI Magic</div>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="magic-glow-bg"></div>
        </section>
    )
}

export default TryoMagic
