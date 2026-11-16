import { useState } from 'react'
import { Mail, MapPin } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { clinicosWebUrl, contact, healthosWebUrl } from '../data/site'
import { Section } from './site/blocks'
import Button from './ui/Button'
import Reveal from './ui/Reveal'

const topics = [
  { value: 'healthos', label: 'HealthOS for me or my family' },
  { value: 'clinicos', label: 'A ClinicOS demo for my clinic or hospital' },
  { value: 'reversal', label: 'A Disease Reversal program' },
  { value: 'other', label: 'Others' },
]

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  // support is by email only, so email is required and the mobile number is optional
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email.'
  if (values.mobile.trim() && !/^[0-9+\s]{10,15}$/.test(values.mobile.trim())) {
    errors.mobile = 'Enter a valid mobile number.'
  }
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
 * The contact form. It is front-end only for now: it validates and shows the thank-you
 * message, but nothing is sent anywhere until the owner decides where messages should go
 * (an inbox, WhatsApp or a CRM).
 */
export default function Contact() {
  const [params] = useSearchParams()
  const requested = params.get('topic')
  const [values, setValues] = useState({
    name: '',
    mobile: '',
    email: '',
    topic: topics.some((t) => t.value === requested) ? requested : 'healthos',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length === 0) setSubmitted(true)
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
                  <Field label="Mobile Number (optional)" error={errors.mobile}>
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
                <Field label="Message">
                  <textarea name="message" value={values.message} onChange={onChange} rows="4" className={`${inputClass} resize-none`} placeholder="Tell us a little about what you need" />
                </Field>
                <Button as="button" type="submit" variant="primary" className="mt-1 w-full sm:w-auto sm:justify-self-start">
                  Send Message
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
                <Button href={clinicosWebUrl} target="_blank" rel="noreferrer" variant="secondary" showArrow={false} className="w-full sm:w-auto">
                  Doctor Login
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
