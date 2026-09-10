import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

const initial = {
  name: '',
  email: '',
  phone: '',
  topic: '',
  message: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email.'
  if (!/^[0-9+\-\s]{8,}$/.test(values.phone)) errors.phone = 'Enter a valid phone number.'
  if (!values.topic) errors.topic = 'Select a topic.'
  if (values.message.trim().length < 8) errors.message = 'Please add a short message.'
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
  'w-full rounded-2xl border border-navy/10 bg-white px-4 py-3.5 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 hover:border-navy/20 focus:border-accent/50'

export default function Contact() {
  const [values, setValues] = useState(initial)
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
    <SectionCard id="contact" className="bg-white py-12 sm:py-16 lg:py-24">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-mint-soft/80 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Reveal>
            <SectionHeader
              eyebrow="Contact"
              title="Your Better Healthcare Journey Starts Here."
              description="Whether you need a second opinion, treatment in India, disease reversal, corporate wellness, a health check-up or healthcare technology, we’re here 24/7."
            />
            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Button href="tel:+917506543960" className="w-full sm:w-auto">Talk to an Expert</Button>
              <Button href="#contact-form" variant="secondary" showArrow={false} className="w-full sm:w-auto">
                Request a Consultation
              </Button>
            </div>
            <div className="mt-10 grid gap-3 sm:max-w-md">
              <a
                href="tel:+917506543960"
                className="group flex items-center gap-3 rounded-2xl border border-navy/8 bg-white px-4 py-3.5 text-sm text-navy transition-colors hover:border-accent/30 hover:shadow-card"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-mint-soft text-accent">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    24/7 Helpline
                  </span>
                  +91 7506543960
                </span>
              </a>
              <a
                href="mailto:support@emediworld.com"
                className="group flex items-center gap-3 rounded-2xl border border-navy/8 bg-white px-4 py-3.5 text-sm text-navy transition-colors hover:border-accent/30 hover:shadow-card"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-mint-soft text-accent">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="min-w-0 truncate">support@emediworld.com</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              id="contact-form"
              onSubmit={onSubmit}
              className="rounded-[24px] border border-navy/8 bg-pale p-4 text-navy shadow-card sm:rounded-[32px] sm:p-8"
              noValidate
            >
              {submitted ? (
                <div className="py-10 text-center">
                  <p className="text-2xl font-semibold text-navy">Request received.</p>
                  <p className="mt-3 text-muted">
                    Thank you. Our care team will be in touch shortly.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  <Field label="Full Name" error={errors.name}>
                    <input
                      name="name"
                      value={values.name}
                      onChange={onChange}
                      className={inputClass}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email" error={errors.email}>
                      <input
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={onChange}
                        className={inputClass}
                        placeholder="you@email.com"
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Phone" error={errors.phone}>
                      <input
                        name="phone"
                        value={values.phone}
                        onChange={onChange}
                        className={inputClass}
                        placeholder="+91"
                        autoComplete="tel"
                      />
                    </Field>
                  </div>
                  <Field label="What can we help you with?" error={errors.topic}>
                    <select
                      name="topic"
                      value={values.topic}
                      onChange={onChange}
                      className={inputClass}
                    >
                      <option value="">Select a service</option>
                      <option>Medical Second Opinion</option>
                      <option>Medical Tourism</option>
                      <option>Disease Reversal</option>
                      <option>Corporate Wellness</option>
                      <option>Health Check-up Packages</option>
                      <option>Healthcare Technology</option>
                      <option>Patient Operating System</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label="Message" error={errors.message}>
                    <textarea
                      name="message"
                      value={values.message}
                      onChange={onChange}
                      rows="4"
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us briefly what you need"
                    />
                  </Field>
                  <Button as="button" type="submit" variant="primary" className="mt-2 w-full">
                    Send Request
                  </Button>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </SectionCard>
  )
}
