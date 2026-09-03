import { useEffect, useState } from 'react'

export function useActiveSection(ids, offset = 120) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) setActive(visible[0].target.id)
      },
      {
        rootMargin: `-${offset}px 0px -45% 0px`,
        threshold: [0.15, 0.3, 0.5],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, offset])

  return active
}
