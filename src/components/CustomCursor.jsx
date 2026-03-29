import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12
      follower.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      requestAnimationFrame(animate)
    }

    const handleEnterLink = () => {
      cursor.classList.add('cursor--hover')
      follower.classList.add('cursor-follower--hover')
    }

    const handleLeaveLink = () => {
      cursor.classList.remove('cursor--hover')
      follower.classList.remove('cursor-follower--hover')
    }

    document.addEventListener('mousemove', handleMove)
    animate()

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', handleEnterLink)
        el.addEventListener('mouseleave', handleLeaveLink)
      })
    }

    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', handleMove)
      observer.disconnect()
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
