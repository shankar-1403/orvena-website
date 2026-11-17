import { useState } from 'react'
import { Mail, MapPin } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { contact, healthosWebUrl } from '../data/site'
import { programs } from '../data/diseaseReversal'
import { submitEnquiry } from '../lib/enquiries'
import { Section } from './site/blocks'
import Button from './ui/Button'
import Reveal from './ui/Reveal'

const topics = [
  { value: 'healthos', label: 'HealthOS for me or my family' },
  { value: 'clinicos', label: 'A ClinicOS demo for my clinic or hospital' },
  { value: 'reversal', label: 'A Disease Reversal program' },
]

// conditions offered when the visitor picks a Disease Reversal program
const conditions = [...programs.map((p) => p.title), 'Others']

// Same rules as the PCRED website contact form.
function validate(values) {
  const errors = {}
  const name = values.name.trim()
  if (!name) errors.name = 'Full name is required.'
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (/\d/.test(name)) errors.name = 'Name must not contain numbers.'
  else if (!/^[a-zA-Z\s'.-]+$/.test(name)) errors.name = 'Name contains invalid characters.'

  const email = values.email.trim()
  if (!email) errors.email = 'Email is required.'
  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.email = 'Enter a valid email address (e.g. name@domain.com).'
  }

  if (!values.mobile.trim()) errors.mobile = 'Phone number is required.'
  else {
    const digits = values.mobile.replace(/\D/g, '')
    if (digits.length !== 10 && digits.length !== 12) {
      errors.mobile = 'Enter a 10-digit mobile number or 12-digit number with country code.'
    }
  }

  if (values.topic === 'reversal' && !values.condition) errors.condition = 'Please choose a condition.'

  const message = values.message.trim()
  if (!message) errors.message = 'Message is required.'
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-navy/55">
        {label}
      </span>
      {children}
      {error ? <span className="mt-1.5 block text-[12px] text-accent">{error}</span> : null}
    </label>
  )
}

const inputClass =
  'w-full rounded-2xl border border-navy/10 bg-white px-4 py-3.5 text-base text-navy outline-none transition-colors placeholder:text-navy/35 hover:border-navy/20 focus:border-accent/50 md:text-sm'

function InfoRow({ icon: Icon, label, value, href }) {
  const body = (
    <>
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
        <span className="block break-words text-[15px] font-semibold leading-6 text-navy">{value}</span>
      </span>
    </>
  )
  const cls =
    'o-card o-card--rule flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 hover:border-accent/30'
  return href ? (
    <a href={href} className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  )
}

/**
 * The contact form. It validates, then saves the enquiry to the Firebase Realtime Database, where admins
 * see it in the dashboard at /admin.
 */
export default function Contact() {
  const [params] = useSearchParams()
  const requested = params.get('topic')
  const [values, setValues] = useState({
    name: '',
    mobile: '',
    email: '',
    topic: topics.some((t) => t.value === requested) ? requested : 'healthos',
    condition: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  // spam trap: a hidden field people never see, so only bots fill it in
  const [trap, setTrap] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    // like PCRED: digits can't be typed into the name, letters can't be typed into the phone,
    // and the phone stops at 12 digits
    if (name === 'name' && /\d/.test(value)) return
    if (name === 'mobile') {
      if (/[a-zA-Z]/.test(value)) return
      if (value.replace(/\D/g, '').length > 12) return
    }
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (sending) return
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) return
    if (trap) {
      setSubmitted(true)
      return
    }
    setSending(true)
    setSendError('')
    try {
      await submitEnquiry(values)
      setSubmitted(true)
    } catch {
      setSendError(`We couldn’t send your message just now. Please try again, or email us at ${contact.email}.`)
    } finally {
      setSending(false)
    }
  }

  return (
    <Section id="contact-form-section" dots>
      <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <Reveal>
          <form
            id="contact-form"
            onSubmit={onSubmit}
            noValidate
            className="o-plate rounded-[24px] border border-white/60 bg-pale p-5 text-navy sm:rounded-[32px] sm:p-8"
          >
            {submitted ? (
              <div role="status" className="py-10 text-center">
                <p className="text-2xl font-semibold text-navy">Thank you.</p>
                <p className="mt-3 text-muted">We have your details and will be in touch soon.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                <div>
                  <h2 className="text-[24px] font-extrabold tracking-[-0.03em] text-navy">
                    Send Us a Message
                  </h2>
                  <p className="mt-1.5 text-[14px] text-muted">
                    We usually reply within one working day.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" error={errors.name}>
                    <input name="name" value={values.name} onChange={onChange} className={inputClass} placeholder="Your name" autoComplete="name" />
                  </Field>
                  <Field label="Mobile Number" error={errors.mobile}>
                    <input name="mobile" value={values.mobile} onChange={onChange} className={inputClass} placeholder="10-digit number" autoComplete="tel" inputMode="tel" />
                  </Field>
                </div>
                <Field label="Email" error={errors.email}>
                  <input name="email" type="email" value={values.email} onChange={onChange} className={inputClass} placeholder="you@example.com" autoComplete="email" />
                </Field>
                <Field label="I’m interested in">
                  <select name="topic" value={values.topic} onChange={onChange} className={inputClass}>
                    {topics.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </Field>
                {values.topic === 'reversal' ? (
                  <Field label="Condition" error={errors.condition}>
                    <select name="condition" value={values.condition} onChange={onChange} className={inputClass}>
                      <option value="" disabled>
                        Choose a condition
                      </option>
                      {conditions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                ) : null}
                <Field label="Message" error={errors.message}>
                  <textarea name="message" value={values.message} onChange={onChange} rows="4" className={`${inputClass} resize-none`} placeholder="Tell us a little about what you need" />
                </Field>
                <input
                  type="text"
                  name="website"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                {sendError ? (
                  <p role="alert" className="rounded-xl bg-[#FDECEE] px-4 py-3 text-[13px] text-[#B4232C]">
                    {sendError}
                  </p>
                ) : null}
                <Button
                  as="button"
                  type="submit"
                  variant="primary"
                  disabled={sending}
                  className="mt-1 w-full disabled:opacity-60 sm:w-auto sm:justify-self-start"
                >
                  {sending ? 'Sending…' : 'Send Message'}
                </Button>
              </div>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Reach us directly</p>
          <div className="mt-4 grid gap-3">
            {/* Phone number hidden on request.
            <InfoRow icon={Phone} label="Call" value={contact.phone} href={contact.phoneHref} /> */}
            <InfoRow icon={Mail} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
            <InfoRow icon={MapPin} label="Office" value={contact.office} />
            <div className="o-card o-card--rule rounded-2xl border border-line bg-white p-4">
              <p className="text-[15px] font-semibold text-navy">Already a user?</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Button href={healthosWebUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                  Open HealthOS
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
