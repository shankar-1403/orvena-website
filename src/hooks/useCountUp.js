import { useEffect, useRef, useState } from 'react'

export function useCountUp(end, { duration = 1600, startOnView = true } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(!startOnView)

  useEffect(() => {
    if (!startOnView) return undefined
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.45 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (!started) return undefined
    const start = performance.now()
    let frame

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(end * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, end, duration])

  return { ref, value }
}
