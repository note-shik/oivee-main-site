'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number
    let hasMoved = false

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!hasMoved) {
        hasMoved = true
        cursor.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }
    document.addEventListener('mousemove', onMove)

    const tick = () => {
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const onEnter = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'
      ring.style.width = '56px'
      ring.style.height = '56px'
    }
    const onLeave = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)'
      ring.style.width = '38px'
      ring.style.height = '38px'
    }

    // mouseover/mouseout bubble and carry relatedTarget, making delegation reliable
    // even for links/buttons that contain child elements (spans, icons, etc.)
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) onEnter()
    }
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null
      // Only leave hover state when the cursor exits the interactive zone entirely
      if (
        (e.target as Element).closest('a, button') &&
        !related?.closest('a, button')
      ) {
        onLeave()
      }
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  )
}
