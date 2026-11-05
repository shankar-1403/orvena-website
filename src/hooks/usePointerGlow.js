import { useEffect } from 'react'

/**
 * Tells every .o-card where the pointer is, so its glow (see index.css) follows
 * the cursor. One delegated listener for the whole site; mouse devices only.
 */
export function usePointerGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    let frame = 0
    let latest = null

    const apply = () => {
      frame = 0
      const card = latest?.target?.closest?.('.o-card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${latest.clientX - rect.left}px`)
      card.style.setProperty('--my', `${latest.clientY - rect.top}px`)
    }

    const onMove = (event) => {
      latest = event
      if (!frame) frame = requestAnimationFrame(apply)
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}
