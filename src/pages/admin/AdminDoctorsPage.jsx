import { Download, Mail, MapPin, Phone, Search, Stethoscope, Trash2, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { deleteDemoRequest, setDemoStatus, watchDemoRequests } from '../../lib/enquiries'
import AdminHeader from './AdminHeader'
import { accessRedirect, useAdmin, useNoIndex } from './useAdmin'

/** Doctor onboarding: everyone who filled the Book a Demo form on the ClinicOS page. */

const STAGES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'demo-done', label: 'Demo done' },
  { value: 'onboarded', label: 'Onboarded' },
]

const stageTone = {
  new: 'bg-[#FDF0E6] text-accent',
  contacted: 'bg-[#E6F2FB] text-[#2a7fb5]',
  'demo-done': 'bg-[#F1ECFB] text-[#6B46C1]',
  onboarded: 'bg-[#E4F2EF] text-[#1D5E4F]',
}

const fmt = (d) =>
  d
    ? d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'Just now'

function StagePill({ status }) {
  const label = STAGES.find((s) => s.value === status)?.label ?? status
  return (
    <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${stageTone[status] ?? 'bg-soft text-navy'}`}>
      {label}
    </span>
  )
}

function download(rows) {
  const head = ['Date', 'Name', 'Specialization', 'Email', 'Phone', 'City', 'Status']
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const lines = rows.map((r) =>
    [r.createdAt?.toISOString() ?? '', r.name, r.specialization, r.email, r.mobile, r.city, r.status].map(esc).join(','),
  )
  const blob = new Blob(['﻿' + [head.map(esc).join(','), ...lines].join('\r\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `orvena-doctor-onboarding-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function Detail({ item, onClose, onStatus, onDelete }) {
  const [confirming, setConfirming] = useState(false)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={`Demo request from ${item.name}`}>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]" />
      <aside className="relative flex h-full w-full max-w-[520px] flex-col overflow-y-auto bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-line px-6 py-5">
          <div className="min-w-0">
            <p className="text-[12px] text-muted">{fmt(item.createdAt)}</p>
            <h2 className="mt-0.5 truncate text-[20px] font-bold text-navy">{item.name}</h2>
            <p className="mt-1 text-[13px] text-muted">{item.specialization}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-navy hover:bg-soft">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="space-y-2">
            <a href={`mailto:${item.email}`} className="flex items-center gap-3 rounded-xl bg-pale px-4 py-3 text-[14px] font-medium text-navy hover:bg-soft">
              <Mail className="h-4 w-4 shrink-0 text-teal" /> <span className="truncate">{item.email}</span>
            </a>
            <a href={`tel:${String(item.mobile ?? '').replace(/\s/g, '')}`} className="flex items-center gap-3 rounded-xl bg-pale px-4 py-3 text-[14px] font-medium text-navy hover:bg-soft">
              <Phone className="h-4 w-4 shrink-0 text-teal" /> {item.mobile}
            </a>
            <p className="flex items-center gap-3 rounded-xl bg-pale px-4 py-3 text-[14px] font-medium text-navy">
              <MapPin className="h-4 w-4 shrink-0 text-teal" /> {item.city}
            </p>
            <p className="flex items-center gap-3 rounded-xl bg-pale px-4 py-3 text-[14px] font-medium text-navy">
              <Stethoscope className="h-4 w-4 shrink-0 text-teal" /> {item.specialization}
            </p>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Stage</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {STAGES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => onStatus(item.id, s.value)}
                  className={`rounded-xl py-2.5 text-[13px] font-semibold ring-1 transition-colors ${
                    item.status === s.value ? 'bg-navy text-white ring-navy' : 'bg-white text-navy ring-line hover:bg-pale'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line px-6 py-4">
          <a
            href={`mailto:${item.email}?subject=${encodeURIComponent('Your ClinicOS demo')}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e0610a] to-[#f08a3c] px-4 py-2.5 text-[14px] font-semibold text-white"
          >
            <Mail className="h-4 w-4" /> Reply by email
          </a>
          {confirming ? (
            <span className="flex flex-1 items-center gap-2">
              <button type="button" onClick={() => onDelete(item.id)} className="flex-1 rounded-xl bg-[#B4232C] px-3 py-2.5 text-[13px] font-semibold text-white">
                Delete for good
              </button>
              <button type="button" onClick={() => setConfirming(false)} className="rounded-xl px-3 py-2.5 text-[13px] font-semibold text-navy ring-1 ring-line">
                Cancel
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-semibold text-[#B4232C] ring-1 ring-line hover:bg-[#FDF3F4]"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}

export default function AdminDoctorsPage() {
  useNoIndex('Doctor Onboarding | Orvena Admin')
  const admin = useAdmin()
  const { status, user } = admin
  const allowed = !accessRedirect(admin, 'doctors')
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    if (status !== 'admin' || !allowed) return undefined
    let unsub = () => {}
    let alive = true
    watchDemoRequests(
      (rows) => alive && setItems(rows),
      (e) => alive && setError(e.message),
    ).then((u) => {
      unsub = u
    })
    return () => {
      alive = false
      unsub()
    }
  }, [status, allowed])

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return (items ?? []).filter(
      (r) =>
        (filter === 'all' || r.status === filter) &&
        (!needle ||
          [r.name, r.email, r.mobile, r.city, r.specialization].some((v) => String(v ?? '').toLowerCase().includes(needle))),
    )
  }, [items, q, filter])

  const redirect = accessRedirect(admin, 'doctors')
  if (redirect) return <Navigate to={redirect} replace />

  const all = items ?? []
  const counts = [
    ['Total', all.length],
    ['New', all.filter((r) => r.status === 'new').length],
    ['Onboarded', all.filter((r) => r.status === 'onboarded').length],
  ]
  const open = items?.find((r) => r.id === openId) ?? null
  const onStatus = (id, s) => setDemoStatus(id, s).catch((e) => setError(e.message))
  const onDelete = (id) =>
    deleteDemoRequest(id)
      .then(() => setOpenId(null))
      .catch((e) => setError(e.message))

  return (
    <div className="min-h-svh bg-[#F3F6F8] text-navy">
      <AdminHeader user={user} admin={admin} />

      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[30px]">Doctor Onboarding</h1>
            <p className="text-[14px] text-muted">Every doctor who booked a ClinicOS demo from the website.</p>
          </div>
          <button
            type="button"
            onClick={() => download(shown)}
            disabled={!shown.length}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[14px] font-semibold ring-1 ring-line hover:bg-pale disabled:opacity-50"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {counts.map(([l, v]) => (
            <div key={l} className="rounded-2xl bg-white p-4 ring-1 ring-line">
              <p className="text-[12px] text-muted sm:text-[13px]">{l}</p>
              <p className="mt-1 text-[24px] font-extrabold leading-none sm:text-[28px]">{items ? v : '…'}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_180px]">
          <label className="relative">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, specialization, email, phone or city"
              className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3 text-[14px] outline-none focus:border-teal/60"
            />
          </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Stage" className="rounded-xl border border-line bg-white px-3 py-2.5 text-[14px] outline-none focus:border-teal/60">
            <option value="all">All stages</option>
            {STAGES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {error ? <p role="alert" className="mt-4 rounded-xl bg-[#FDECEE] px-4 py-3 text-[13px] text-[#B4232C]">{error}</p> : null}

        <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-line">
          {status === 'loading' || items === null ? (
            <p className="px-5 py-12 text-center text-[14px] text-muted">Loading demo requests…</p>
          ) : shown.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <Stethoscope className="mx-auto h-8 w-8 text-muted" />
              <p className="mt-3 text-[15px] font-semibold">{items.length ? 'No requests match these filters.' : 'No demo requests yet.'}</p>
              <p className="mt-1 text-[13px] text-muted">
                {items.length ? 'Clear the search or change the stage.' : 'Doctors who fill the Book a Demo form will appear here.'}
              </p>
            </div>
          ) : (
            <>
              <div className="hidden grid-cols-[150px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_120px_110px] gap-4 border-b border-line bg-pale px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted md:grid">
                <span>Date</span>
                <span>Name</span>
                <span>Specialization</span>
                <span>Contact</span>
                <span>City</span>
                <span>Stage</span>
              </div>
              <ul className="divide-y divide-line">
                {shown.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(r.id)}
                      className="grid w-full gap-1 px-5 py-4 text-left transition-colors hover:bg-pale md:grid-cols-[150px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_120px_110px] md:items-center md:gap-4"
                    >
                      <span className="order-last text-[12px] text-muted md:order-none md:text-[13px]">{fmt(r.createdAt)}</span>
                      <span className="flex items-center gap-2 md:block">
                        <span className={`truncate text-[15px] ${r.status === 'new' ? 'font-bold' : 'font-semibold'}`}>{r.name}</span>
                        <span className="ml-auto md:hidden"><StagePill status={r.status} /></span>
                      </span>
                      <span className="truncate text-[13px]">{r.specialization}</span>
                      <span className="min-w-0 truncate text-[13px] text-navy/80">
                        {r.email}
                        <span className="text-muted"> · {r.mobile}</span>
                      </span>
                      <span className="truncate text-[13px]">{r.city}</span>
                      <span className="hidden md:block"><StagePill status={r.status} /></span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>

      {open ? <Detail item={open} onClose={() => setOpenId(null)} onStatus={onStatus} onDelete={onDelete} /> : null}
    </div>
  )
}
