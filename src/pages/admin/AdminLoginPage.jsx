import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signOutAdmin } from '../../lib/enquiries'
import { useAdmin, useNoIndex } from './useAdmin'

const input =
  'w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 text-[15px] text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-teal/60 focus:ring-4 focus:ring-teal/10'

export default function AdminLoginPage() {
  useNoIndex('Sign in | Orvena Admin')
  const { status, user, error: adminError } = useAdmin()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (status === 'admin') navigate('/admin', { replace: true })
    // signed in but not the admin: sign straight back out and say why
    if (status === 'not-admin') {
      setNotice(
        adminError === 'no sections assigned'
          ? `${user?.email} has no CMS sections yet. Ask the main admin to give you access.`
          : `${user?.email} can’t open the CMS. The database said: ${adminError || 'not allowed'}.`,
      )
      signOutAdmin()
    }
  }, [status, navigate, user, adminError])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    setNotice('')
    try {
      await signIn(email.trim(), password)
    } catch (err) {
      const code = err?.code || ''
      setError(
        code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')
          ? 'That email and password don’t match a CMS account.'
          : code.includes('too-many-requests')
            ? 'Too many attempts. Wait a few minutes and try again.'
            : err?.message || 'Sign-in failed. Try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-svh place-items-center bg-gradient-to-br from-navy via-[#0d4a5c] to-midnight px-4 py-10">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none fixed inset-0 opacity-[0.08]" />
      <div className="relative w-full max-w-[400px]">
        <div className="rounded-[28px] bg-white p-7 shadow-[0_40px_80px_-30px_rgba(2,20,28,0.8)] sm:p-8">
          <img src="/orvena_logo.webp" alt="Orvena" className="h-9 w-auto" />
          <h1 className="mt-6 text-[24px] font-extrabold tracking-tight text-navy">CMS sign in</h1>
          <p className="mt-1 text-[14px] text-muted">Manage enquiries, doctor onboarding and blogs.</p>

          {notice ? (
            <div className="mt-6 rounded-xl bg-[#FDF1E1] px-4 py-3 text-[13px] text-[#8A5A00]">
              {notice}
            </div>
          ) : null}
          {status === 'error' ? (
            <div className="mt-6 rounded-xl bg-[#FDECEE] px-4 py-3 text-[13px] text-[#B4232C]">
              The admin area isn’t connected yet. Add the Firebase keys to .env.local.
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 space-y-3.5" noValidate>
            <label className="relative block">
              <span className="sr-only">Email</span>
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={input}
              />
            </label>
            <label className="relative block">
              <span className="sr-only">Password</span>
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type={show ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`${input} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted transition-colors hover:text-navy"
              >
                {show ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
              </button>
            </label>
            {error ? (
              <p role="alert" className="text-[13px] text-[#B4232C]">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={busy || !email || !password || status === 'loading' || status === 'error'}
              className="w-full rounded-xl bg-gradient-to-r from-[#e0610a] to-[#f08a3c] py-3 text-[15px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(224,97,10,0.8)] transition-opacity disabled:opacity-50"
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-[12px] text-white/50">Orvena Health · admin area</p>
      </div>
    </div>
  )
}
