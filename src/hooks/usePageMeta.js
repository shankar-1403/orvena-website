import { useEffect } from 'react'

/**
 * Sets the tab title and the meta description for the current page, and puts the
 * site defaults back when the visitor moves on.
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title

    const tag = document.querySelector('meta[name="description"]')
    if (!tag || !description) return undefined

    const previous = tag.getAttribute('content')
    tag.setAttribute('content', description)
    return () => {
      if (previous !== null) tag.setAttribute('content', previous)
    }
  }, [title, description])
}
