import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signOutAdmin } from '../../lib/enquiries'
import { useAdmin, useNoIndex } from './useAdmin'

// the inset shadow keeps browser autofill from painting the field blue
const input =
  'w-full rounded-2xl border border-line bg-[#F7FAFB] py-3.5 pl-11 pr-4 text-[15px] text-navy outline-none transition-[border-color,box-shadow,background-color] placeholder:text-navy/30 [&:-webkit-autofill]:shadow-[inset_0_0_0_40px_#F7FAFB] hover:border-navy/20 focus:border-teal/50 focus:bg-white focus:ring-4 focus:ring-teal/10'



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
    <div className="relative grid min-h-svh place-items-center overflow-hidden bg-[#0B4156] px-4 py-10">
      {/* background: a still teal gradient with the Orvena mark large and faint, plus two hairline arcs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1B6F86_0%,#0F5068_45%,#083647_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(4,30,40,0.55),transparent_60%)]" />
        {/* the mark is used as a mask, so it can carry a soft fade from top-left to bottom-right */}
        <div
          className="absolute -right-[20vmin] top-[55%] aspect-square w-[115vmin] max-w-[1080px] -translate-y-1/2 rotate-[-14deg] bg-[linear-gradient(160deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.05)_55%,rgba(255,255,255,0.015)_100%)] [mask-image:url(/orvena-mark.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] max-sm:-right-[45vmin] max-sm:w-[150vmin]"
        />
      </div>

      <div className="relative w-full max-w-[420px]">
        <div className="rounded-[28px] bg-white p-7 shadow-[0_40px_90px_-30px_rgba(2,20,28,0.65)] sm:p-9">
          <img src="/orvena_logo.webp" alt="Orvena" className="h-10 w-auto" />
          <h1 className="mt-7 text-[26px] font-extrabold leading-tight tracking-[-0.035em] text-navy">Welcome back</h1>
          <p className="mt-1.5 text-[14.5px] text-muted">Sign in to manage enquiries, doctor onboarding and blogs.</p>

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

          <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
            <span className="block">
              <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-navy/50">Email</span>
              <span className="relative block">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@orvenahealth.com"
                aria-label="Email"
                className={input}
              />
              </span>
            </span>
            <span className="block">
              <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-navy/50">Password</span>
              <span className="relative block">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type={show ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                aria-label="Password"
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
              </span>
            </span>
            {error ? (
              <p role="alert" className="text-[13px] text-[#B4232C]">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={busy || !email || !password || status === 'loading' || status === 'error'}
              className="group !mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e0610a] to-[#f08a3c] py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_28px_-14px_rgba(224,97,10,0.9)] transition-[opacity,transform] hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
            >
              {busy ? 'Signing in…' : 'Sign in'}
              {busy ? null : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
            </button>
          </form>
        </div>
        <p className="mt-5 text-center text-[12px] text-white/55">Orvena Health · admin area</p>
      </div>
    </div>
  )
}
