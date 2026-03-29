import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TextReveal({ children, className = '', tag: Tag = 'div', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current
      if (!el) return

      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay,
        ease: 'power4.out',
      })
    }, ref)

    return () => ctx.revert()
  }, [delay])

  return (
    <Tag ref={ref} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </Tag>
  )
}
