import { useLayoutEffect, useRef, useState } from 'react'

/** Scale factor that fits a fixed-width canvas into the element the returned ref is on. */
export function useFitScale(width) {
  const ref = useRef(null)
  const [scale, setScale] = useState(0.5)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return [ref, scale]
}
