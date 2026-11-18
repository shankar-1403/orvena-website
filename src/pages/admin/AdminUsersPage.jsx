import { Check, Eye, EyeOff, Loader2, Pencil, Trash2, UserPlus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  MAIN_ADMIN_EMAIL,
  SECTIONS,
  createCmsUser,
  removeCmsUser,
  setCmsUserSections,
  watchCmsUsers,
} from '../../lib/enquiries'
import AdminHeader from './AdminHeader'
import { accessRedirect, useAdmin, useNoIndex } from './useAdmin'

/** Main admin only: create CMS users and choose which sections each one can open. */

const input =
  'w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[14px] text-navy outline-none placeholder:text-navy/35 focus:border-teal/60'

const toMap = (keys) => Object.fromEntries(keys.map((k) => [k, true]))
const toKeys = (map) => SECTIONS.map((s) => s.key).filter((k) => map?.[k] === true)

/** Tick boxes for the sections. Any number can be picked. */
function SectionPicker({ value, onChange }) {
  const all = value.length === SECTIONS.length
  const toggle = (k) => onChange(value.includes(k) ? value.filter((v) => v !== k) : [...value, k])
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Can open</span>
        <button
          type="button"
          onClick={() => onChange(all ? [] : SECTIONS.map((s) => s.key))}
          className="text-[12.5px] font-semibold text-teal hover:underline"
        >
          {all ? 'Clear all' : 'Select all'}
        </button>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {SECTIONS.map((s) => {
          const on = value.includes(s.key)
          return (
            <button
              key={s.key}
              type="button"
              role="checkbox"
              aria-checked={on}
              onClick={() => toggle(s.key)}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-semibold ring-1 transition-colors ${
                on ? 'bg-navy/[0.06] text-navy ring-navy/40' : 'bg-white text-navy/75 ring-line hover:bg-pale'
              }`}
            >
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md ring-1 ${on ? 'bg-navy text-white ring-navy' : 'bg-white ring-line'}`}>
                {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
              </span>
              {s.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function friendly(err) {
  const code = err?.code || ''
  if (code.includes('email-already-in-use')) return 'That email already has a login. Use a different email.'
  if (code.includes('weak-password')) return 'Password must be at least 6 characters.'
  if (code.includes('invalid-email')) return 'Enter a valid email.'
  if (code.includes('operation-not-allowed') || code.includes('admin-restricted-operation'))
    return 'Firebase is blocking new accounts. In Firebase Authentication › Settings, turn on “Enable create (sign-up)”.'
  return err?.message || 'Something went wrong. Try again.'
}

function CreateUser({ onDone }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [sections, setSections] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (busy) return
    if (!name.trim() || !email.trim() || password.length < 6) return setError('Fill in name, email and a password of at least 6 characters.')
    if (email.trim().toLowerCase() === MAIN_ADMIN_EMAIL) return setError('That is the main admin’s email.')
    if (!sections.length) return setError('Pick at least one section this user can open.')
    setBusy(true)
    setError('')
    try {
      await createCmsUser({ name, email, password, sections: toMap(sections) })
      onDone(email.trim())
    } catch (err) {
      setError(friendly(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl bg-white p-5 ring-1 ring-line sm:p-6">
      <p className="flex items-center gap-2 text-[16px] font-bold"><UserPlus className="h-4 w-4 text-teal" /> Create a user</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <input className={input} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
        <input className={input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
        <span className="relative">
          <input
            className={`${input} pr-11`}
            type={show ? 'text' : 'password'}
            placeholder="Password (6+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:text-navy"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </span>
      </div>
      <div className="mt-4">
        <SectionPicker value={sections} onChange={setSections} />
      </div>
      {error ? <p role="alert" className="mt-3 text-[13px] text-[#B4232C]">{error}</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#e0610a] to-[#f08a3c] px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-70"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />} Create user
      </button>
    </form>
  )
}

function UserRow({ u, onError }) {
  const [editing, setEditing] = useState(false)
  const [sections, setSections] = useState(toKeys(u.sections))
  const [busy, setBusy] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const keys = toKeys(u.sections)

  const save = async () => {
    setBusy(true)
    try {
      await setCmsUserSections(u.uid, toMap(sections))
      setEditing(false)
    } catch (e) {
      onError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <li className="px-5 py-4">
      <div className="flex flex-wrap items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-[13px] font-bold uppercase text-white">
          {(u.name || u.email).slice(0, 2)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold">{u.name || u.email}</p>
          <p className="truncate text-[13px] text-muted">{u.email}</p>
          {!editing ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {keys.length ? (
                keys.map((k) => (
                  <span key={k} className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[12px] font-semibold text-teal">
                    {SECTIONS.find((s) => s.key === k)?.label}
                  </span>
                ))
              ) : (
                <span className="rounded-full bg-[#FDECEE] px-2.5 py-0.5 text-[12px] font-semibold text-[#B4232C]">No access</span>
              )}
            </div>
          ) : null}
        </div>
        {!editing ? (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => {
                setSections(keys)
                setEditing(true)
              }}
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold ring-1 ring-line hover:bg-pale"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit access
            </button>
            {confirming ? (
              <>
                <button type="button" onClick={() => removeCmsUser(u.uid).catch((e) => onError(e.message))} className="rounded-xl bg-[#B4232C] px-3 py-2 text-[13px] font-semibold text-white">
                  Remove
                </button>
                <button type="button" onClick={() => setConfirming(false)} className="rounded-xl px-3 py-2 text-[13px] font-semibold ring-1 ring-line">
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                aria-label={`Remove ${u.email}`}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold text-[#B4232C] ring-1 ring-line hover:bg-[#FDF3F4]"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            )}
          </div>
        ) : null}
      </div>
      {editing ? (
        <div className="mt-4 rounded-xl bg-pale p-4">
          <SectionPicker value={sections} onChange={setSections} />
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={save} disabled={busy} className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-70">
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />} Save
            </button>
            <button type="button" onClick={() => setEditing(false)} className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-semibold ring-1 ring-line">
              <X className="h-3.5 w-3.5" /> Cancel
            </button>
          </div>
        </div>
      ) : null}
    </li>
  )
}

export default function AdminUsersPage() {
  useNoIndex('Users & Roles | Orvena Admin')
  const admin = useAdmin()
  const { status, user } = admin
  const allowed = !accessRedirect(admin, 'users')
  const [users, setUsers] = useState(null)
  const [error, setError] = useState('')
  const [created, setCreated] = useState('')
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    if (status !== 'admin' || !allowed) return undefined
    let unsub = () => {}
    let alive = true
    watchCmsUsers(
      (rows) => alive && setUsers(rows),
      (e) => alive && setError(e.message),
    ).then((u) => {
      unsub = u
    })
    return () => {
      alive = false
      unsub()
    }
  }, [status, allowed])

  const redirect = accessRedirect(admin, 'users')
  if (redirect) return <Navigate to={redirect} replace />

  return (
    <div className="min-h-svh bg-[#F3F6F8] text-navy">
      <AdminHeader user={user} admin={admin} />
      <main className="mx-auto max-w-[1200px] space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[30px]">Users & Roles</h1>
          <p className="text-[14px] text-muted">
            Create logins for your team and choose which sections each person can open. You can pick as many as you like.
          </p>
        </div>

        {created ? (
          <p role="status" className="flex items-center justify-between gap-3 rounded-xl bg-[#E4F2EF] px-4 py-3 text-[13.5px] font-medium text-[#1D5E4F]">
            {created} can now sign in at /login with the password you set.
            <button type="button" onClick={() => setCreated('')} aria-label="Dismiss"><X className="h-4 w-4" /></button>
          </p>
        ) : null}

        <CreateUser
          key={formKey}
          onDone={(email) => {
            setCreated(email)
            setFormKey((k) => k + 1)
          }}
        />

        {error ? <p role="alert" className="rounded-xl bg-[#FDECEE] px-4 py-3 text-[13px] text-[#B4232C]">{error}</p> : null}

        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
          <div className="border-b border-line bg-pale px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Team</div>
          <ul className="divide-y divide-line">
            <li className="flex items-center gap-3 px-5 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-bold text-white">MA</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold">{MAIN_ADMIN_EMAIL}</p>
                <p className="text-[13px] text-muted">Main admin · sees every section and manages users</p>
              </div>
            </li>
            {users === null ? (
              <li className="px-5 py-8 text-center text-[14px] text-muted">Loading users…</li>
            ) : users.length === 0 ? (
              <li className="px-5 py-8 text-center text-[14px] text-muted">No other users yet. Create one above.</li>
            ) : (
              users.map((u) => <UserRow key={u.uid} u={u} onError={setError} />)
            )}
          </ul>
        </div>
      </main>
    </div>
  )
}
