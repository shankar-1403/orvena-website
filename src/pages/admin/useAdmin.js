import { useEffect, useState } from 'react'
import { watchAdmin } from '../../lib/enquiries'

/**
 * Sign-in state for the admin pages: 'loading' | 'signed-out' | 'not-admin' | 'admin'.
 * `sections` lists the section keys this user may open; `isSuper` is the main admin.
 */
export function useAdmin() {
  const [state, setState] = useState({ status: 'loading', user: null, error: '', isSuper: false, sections: [] })

  useEffect(() => {
    let unsub = () => {}
    let alive = true
    watchAdmin(({ user, isAdmin, isSuper, sections, reason }) => {
      if (!alive) return
      if (!user) setState({ status: 'signed-out', user: null, error: '', isSuper: false, sections: [] })
      else setState({ status: isAdmin ? 'admin' : 'not-admin', user, error: reason || '', isSuper, sections })
    })
      .then((u) => {
        unsub = u
      })
      .catch((e) => alive && setState({ status: 'error', user: null, error: e.message, isSuper: false, sections: [] }))
    return () => {
      alive = false
      unsub()
    }
  }, [])

  return state
}

/** Keeps the admin pages out of search results. */
export function useNoIndex(title) {
  useEffect(() => {
    document.title = title
    const tag = document.createElement('meta')
    tag.name = 'robots'
    tag.content = 'noindex, nofollow'
    document.head.appendChild(tag)
    return () => tag.remove()
  }, [title])
}

/**
 * Where a page should send the visitor instead of rendering, or null to render.
 * `key` is a section key from SECTIONS, or 'users' for the main-admin-only Users page.
 */
export function accessRedirect(admin, key) {
  if (admin.status === 'signed-out' || admin.status === 'not-admin' || admin.status === 'error') return '/login'
  if (admin.status !== 'admin') return null
  if (key === 'users') return admin.isSuper ? null : '/admin'
  return admin.isSuper || admin.sections.includes(key) ? null : '/admin'
}
