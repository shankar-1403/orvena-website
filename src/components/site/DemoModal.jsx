import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, BadgeCheck, CheckCircle2, Loader2, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { contact } from '../../data/site'
import { submitDemoRequest } from '../../lib/enquiries'
import { otpError, resetOtp, sendOtp, verifyOtp } from '../../lib/phoneOtp'

const inputClass =
  'w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-base text-navy outline-none transition-colors placeholder:text-navy/35 hover:border-navy/20 focus:border-accent/50 md:text-sm'

const empty = { name: '', specialization: '', email: '', city: '' }
const RESEND_AFTER = 30

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Name is required.'
  if (!v.specialization.trim()) e.specialization = 'Specialization is required.'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email.trim())) e.email = 'Enter a valid email.'
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

/** Two steps: 1 verify the mobile number (number, then SMS code), 2 practice details. */
function Progress({ at }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-2">
      {['Verify mobile', 'Your details'].map((label, i) => (
        <div key={label}>
          <span className={`block h-1.5 rounded-full ${i + 1 < at ? 'bg-teal' : i + 1 === at ? 'bg-accent' : 'bg-navy/10'}`} />
          <span className={`mt-1.5 block text-[11.5px] font-semibold ${i + 1 <= at ? 'text-navy/70' : 'text-navy/35'}`}>
            {i + 1}. {label}
          </span>
        </div>
      ))}
    </div>
  )
}

/**
 * The "Book a Demo" form in a popup, in two steps: verify the mobile number by SMS code, then the details.
 * It saves to doctorOnboarding (with the verified number), which admins see in the CMS.
 */
export default function DemoModal({ open, onClose }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState('')
  const [trap, setTrap] = useState('')
  const firstField = useRef(null)
  // step 1 is 'phone' then 'code' (verify mobile); step 2 is 'details'
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [verified, setVerified] = useState('')
  const [otpBusy, setOtpBusy] = useState(false)
  const [otpErr, setOtpErr] = useState('')
  const [wait, setWait] = useState(0)

  useEffect(() => {
    if (wait <= 0) return undefined
    const t = setTimeout(() => setWait((w) => w - 1), 1000)
    return () => clearTimeout(t)
  }, [wait])

  const send = async () => {
    if (otpBusy) return
    if (!/^[6-9]\d{9}$/.test(phone)) return setOtpErr('Enter a valid 10-digit mobile number.')
    setOtpBusy(true)
    setOtpErr('')
    try {
      setConfirmation(await sendOtp(`+91${phone}`, 'demo-recaptcha'))
      setCode('')
      setStep('code')
      setWait(RESEND_AFTER)
    } catch (err) {
      resetOtp()
      setOtpErr(otpError(err))
    } finally {
      setOtpBusy(false)
    }
  }

  const verify = async () => {
    if (otpBusy || !confirmation) return
    if (!/^\d{6}$/.test(code)) return setOtpErr('Enter the 6-digit code from the SMS.')
    setOtpBusy(true)
    setOtpErr('')
    try {
      setVerified(await verifyOtp(confirmation, code))
      resetOtp()
      setStep('details')
    } catch (err) {
      setOtpErr(otpError(err))
    } finally {
      setOtpBusy(false)
    }
  }

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
      setStep('phone')
      setPhone('')
      setCode('')
      setConfirmation(null)
      setVerified('')
      setOtpErr('')
      setWait(0)
      resetOtp()
    }, 250)
  }

  const onChange = (e) => {
    const { name, value } = e.target
    if (name === 'name' && /\d/.test(value)) return
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
      await submitDemoRequest({ ...values, mobile: verified })
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
            <div id="demo-recaptcha" />

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
            ) : step !== 'details' ? (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault()
                  if (step === 'phone') send()
                  else verify()
                }}
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">ClinicOS</p>
                <h2 id="demo-title" className="mt-2 pr-10 text-[26px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[30px]">
                  Book a Demo
                </h2>
                <p className="mt-2 text-[14.5px] leading-6 text-muted">
                  {step === 'phone'
                    ? 'First, verify your mobile number. We’ll send a 6-digit code by SMS.'
                    : `Enter the 6-digit code sent to +91 ${phone}.`}
                </p>

                <Progress at={1} />

                {step === 'phone' ? (
                  <div className="mt-6">
                    <Field label="Mobile number" error={otpErr}>
                      <span className="flex items-stretch overflow-hidden rounded-2xl border border-navy/10 bg-white focus-within:border-accent/50 hover:border-navy/20">
                        <span className="flex items-center gap-1.5 border-r border-navy/10 bg-pale px-3.5 text-[15px] font-semibold text-navy md:text-sm">
                          <Phone className="h-3.5 w-3.5 text-teal" aria-hidden="true" /> +91
                        </span>
                        <input
                          ref={firstField}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                            setOtpErr('')
                          }}
                          className="w-full bg-transparent px-4 py-3 text-base text-navy outline-none placeholder:text-navy/35 focus-visible:outline-none md:text-sm"
                          placeholder="10-digit mobile number"
                          autoComplete="tel-national"
                          inputMode="numeric"
                        />
                      </span>
                    </Field>
                  </div>
                ) : (
                  <div className="mt-6">
                    <Field label="Verification code" error={otpErr}>
                      <input
                        autoFocus
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                          setOtpErr('')
                        }}
                        className={`${inputClass} text-center text-[22px] font-bold tracking-[0.5em] md:text-[22px]`}
                        placeholder="••••••"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                      />
                    </Field>
                    <div className="mt-3 flex items-center justify-between text-[13px]">
                      <button
                        type="button"
                        onClick={() => {
                          setStep('phone')
                          setOtpErr('')
                          resetOtp()
                        }}
                        className="inline-flex items-center gap-1 font-semibold text-navy/70 hover:text-navy"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Change number
                      </button>
                      {wait > 0 ? (
                        <span className="text-muted">Resend code in {wait}s</span>
                      ) : (
                        <button type="button" onClick={send} disabled={otpBusy} className="font-semibold text-teal hover:underline disabled:opacity-60">
                          Resend code
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={otpBusy}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-colors hover:bg-accent-deep disabled:opacity-70"
                >
                  {otpBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {step === 'phone' ? (otpBusy ? 'Sending code…' : 'Send Code') : otpBusy ? 'Verifying…' : 'Verify & Continue'}
                </button>
              </form>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">ClinicOS</p>
                <h2 id="demo-title" className="mt-2 pr-10 text-[26px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[30px]">
                  Book a Demo
                </h2>
                <p className="mt-2 text-[14.5px] leading-6 text-muted">
                  Tell us a little about your practice and we’ll set up a live walkthrough.
                </p>
                <Progress at={2} />
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-[12.5px] font-semibold text-teal">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> {verified} verified
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Name" error={errors.name}>
                    <input autoFocus name="name" value={values.name} onChange={onChange} className={inputClass} placeholder="Dr. Your Name" autoComplete="name" />
                  </Field>
                  <Field label="Specialization" error={errors.specialization}>
                    <input name="specialization" value={values.specialization} onChange={onChange} className={inputClass} placeholder="e.g. General Physician" />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input name="email" type="email" value={values.email} onChange={onChange} className={inputClass} placeholder="you@example.com" autoComplete="email" />
                  </Field>
                  <Field label="City" error={errors.city}>
                    <input name="city" value={values.city} onChange={onChange} className={inputClass} placeholder="Your city" autoComplete="address-level2" />
                  </Field>
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
