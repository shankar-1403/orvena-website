import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { contact } from '../../data/site'
import { submitDemoRequest } from '../../lib/enquiries'

const inputClass =
  'w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-base text-navy outline-none transition-colors placeholder:text-navy/35 hover:border-navy/20 focus:border-accent/50 md:text-sm'

const empty = { name: '', specialization: '', email: '', mobile: '', city: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Name is required.'
  if (!v.specialization.trim()) e.specialization = 'Specialization is required.'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email.trim())) e.email = 'Enter a valid email.'
  const digits = v.mobile.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 12) e.mobile = 'Enter a valid phone number.'
  if (!v.city.trim()) e.city = 'City is required.'
  return e
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-navy/55">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-[12px] text-accent">{error}</span> : null}
    </label>
  )
}

/**
 * The "Book a Demo" form in a popup. It saves to doctorOnboarding, which admins see in the
 * Doctor Onboarding tab of the CMS.
 */
export default function DemoModal({ open, onClose }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState('')
  const [trap, setTrap] = useState('')
  const firstField = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstField.current?.focus(), 50)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, onClose])

  const close = () => {
    onClose()
    setTimeout(() => {
      setValues(empty)
      setErrors({})
      setSent(false)
      setSendError('')
    }, 250)
  }

  const onChange = (e) => {
    const { name, value } = e.target
    if (name === 'name' && /\d/.test(value)) return
    if (name === 'mobile' && (/[a-zA-Z]/.test(value) || value.replace(/\D/g, '').length > 12)) return
    setValues((p) => ({ ...p, [name]: value }))
    setErrors((p) => ({ ...p, [name]: '' }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length) return
    if (trap) {
      setSent(true)
      return
    }
    setSending(true)
    setSendError('')
    try {
      await submitDemoRequest(values)
      setSent(true)
    } catch {
      setSendError(`We couldn’t send your request just now. Please try again, or email us at ${contact.email}.`)
    } finally {
      setSending(false)
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-midnight/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] bg-pale p-5 text-navy shadow-[0_30px_80px_-30px_rgba(2,20,28,0.6)] sm:max-w-[520px] sm:rounded-[28px] sm:p-7"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-navy ring-1 ring-line hover:bg-soft"
            >
              <X className="h-4 w-4" />
            </button>

            {sent ? (
              <div role="status" className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-teal" strokeWidth={1.5} />
                <p id="demo-title" className="mt-4 text-[24px] font-extrabold tracking-tight">Demo request sent</p>
                <p className="mx-auto mt-2 max-w-[36ch] text-[15px] leading-7 text-muted">
                  Our team will get in touch to set up a ClinicOS walkthrough for your practice.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 rounded-full bg-navy px-6 py-3 text-[14px] font-semibold text-white hover:bg-midnight"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">ClinicOS</p>
                <h2 id="demo-title" className="mt-2 pr-10 text-[26px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[30px]">
                  Book a Demo
                </h2>
                <p className="mt-2 text-[14.5px] leading-6 text-muted">
                  Tell us a little about your practice and we’ll set up a live walkthrough.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Name" error={errors.name}>
                    <input ref={firstField} name="name" value={values.name} onChange={onChange} className={inputClass} placeholder="Dr. Your Name" autoComplete="name" />
                  </Field>
                  <Field label="Specialization" error={errors.specialization}>
                    <input name="specialization" value={values.specialization} onChange={onChange} className={inputClass} placeholder="e.g. General Physician" />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input name="email" type="email" value={values.email} onChange={onChange} className={inputClass} placeholder="you@example.com" autoComplete="email" />
                  </Field>
                  <Field label="Phone" error={errors.mobile}>
                    <input name="mobile" value={values.mobile} onChange={onChange} className={inputClass} placeholder="10-digit number" autoComplete="tel" inputMode="tel" />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="City" error={errors.city}>
                      <input name="city" value={values.city} onChange={onChange} className={inputClass} placeholder="Your city" autoComplete="address-level2" />
                    </Field>
                  </div>
                </div>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                {sendError ? <p className="mt-4 text-[13px] text-accent">{sendError}</p> : null}

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-colors hover:bg-accent-deep disabled:opacity-70"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {sending ? 'Sending…' : 'Book My Demo'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
