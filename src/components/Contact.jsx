import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
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
      <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
        {label}
      </span>
      {children}
      {error ? <span className="mt-1.5 block text-[12px] text-mint">{error}</span> : null}
    </label>
  )
}

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-mint/50'

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
    <section
      id="contact"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_38%_42%_at_92%_88%,rgba(217,95,20,0.22),transparent_72%),radial-gradient(ellipse_32%_28%_at_8%_12%,rgba(19,96,116,0.18),transparent_64%),linear-gradient(180deg,#0b4156_0%,#062a38_100%)] py-24 text-white lg:py-32"
    >
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeader
              light
              eyebrow="Contact"
              title="Your Better Healthcare Journey Starts Here."
              description="Whether you need a second opinion, treatment assistance, disease reversal, corporate wellness or healthcare technology, we’re here to help."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="tel:+917506543960" variant="light">
                Talk to an Expert
              </Button>
              <Button href="#contact-form" variant="outline" showArrow={false}>
                Request a Consultation
              </Button>
            </div>
            <div className="mt-10 space-y-3 text-sm">
              <a href="tel:+917506543960" className="flex items-center gap-3 text-white/85 hover:text-mint">
                <Phone className="h-4 w-4 text-mint" />
                +91 7506543960
              </a>
              <a
                href="mailto:support@emediworld.com"
                className="flex items-center gap-3 text-white/85 hover:text-mint"
              >
                <Mail className="h-4 w-4 text-mint" />
                support@emediworld.com
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              id="contact-form"
              onSubmit={onSubmit}
              className="rounded-[32px] border border-white/10 bg-white/6 p-6 backdrop-blur-md sm:p-8"
              noValidate
            >
              {submitted ? (
                <div className="py-10 text-center">
                  <p className="text-2xl font-semibold">Request received.</p>
                  <p className="mt-3 text-white/70">
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
                      className={`${inputClass} bg-navy/40`}
                    >
                      <option value="" className="bg-white text-navy">
                        Select a service
                      </option>
                      <option className="bg-white text-navy">Medical Second Opinion</option>
                      <option className="bg-white text-navy">Medical Tourism</option>
                      <option className="bg-white text-navy">Disease Reversal</option>
                      <option className="bg-white text-navy">Corporate Wellness</option>
                      <option className="bg-white text-navy">Healthcare Technology</option>
                      <option className="bg-white text-navy">Other</option>
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
                  <Button as="button" type="submit" variant="light" className="mt-2 w-full">
                    Send Request
                  </Button>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
