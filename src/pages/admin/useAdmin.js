import { useEffect, useState } from 'react'
import { watchAdmin } from '../../lib/enquiries'

/** Sign-in state for the admin pages: 'loading' | 'signed-out' | 'not-admin' | 'admin'. */
export function useAdmin() {
  const [state, setState] = useState({ status: 'loading', user: null, error: '' })

  useEffect(() => {
    let unsub = () => {}
    let alive = true
    watchAdmin(({ user, isAdmin, reason }) => {
      if (!alive) return
      if (!user) setState({ status: 'signed-out', user: null, error: '' })
      else setState({ status: isAdmin ? 'admin' : 'not-admin', user, error: reason || '' })
    })
      .then((u) => {
        unsub = u
      })
      .catch((e) => alive && setState({ status: 'error', user: null, error: e.message }))
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
