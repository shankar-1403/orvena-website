import { Download, Inbox, Mail, Phone, Search, Trash2, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  STATUSES,
  TOPICS,
  deleteEnquiry,
  setEnquiryStatus,
  watchEnquiries,
} from '../../lib/enquiries'
import AdminHeader from './AdminHeader'
import { useAdmin, useNoIndex } from './useAdmin'

const statusTone = {
  new: 'bg-[#FDF0E6] text-accent',
  read: 'bg-[#E6F2FB] text-[#2a7fb5]',
  handled: 'bg-[#E4F2EF] text-[#1D5E4F]',
}

const fmt = (d, withTime = true) =>
  d
    ? d.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
      })
    : 'Just now'

function StatusPill({ status }) {
  const label = STATUSES.find((s) => s.value === status)?.label ?? status
  return (
    <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${statusTone[status] ?? 'bg-soft text-navy'}`}>
      {label}
    </span>
  )
}

function toCsv(rows) {
  const head = ['Date', 'Name', 'Email', 'Mobile', 'Interested in', 'Condition', 'Status', 'Message', 'Page']
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const lines = rows.map((r) =>
    [r.createdAt?.toISOString() ?? '', r.name, r.email, r.mobile, TOPICS[r.topic] ?? r.topic, r.condition, r.status, r.message, r.source]
      .map(esc)
      .join(','),
  )
  return [head.map(esc).join(','), ...lines].join('\r\n')
}

function download(rows) {
  const blob = new Blob(['﻿' + toCsv(rows)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `orvena-enquiries-${new Date().toISOString().slice(0, 10)}.csv`
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
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={`Enquiry from ${item.name}`}>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]" />
      <aside className="relative flex h-full w-full max-w-[520px] flex-col overflow-y-auto bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-line px-6 py-5">
          <div className="min-w-0">
            <p className="text-[12px] text-muted">{fmt(item.createdAt)}</p>
            <h2 className="mt-0.5 truncate text-[20px] font-bold text-navy">{item.name}</h2>
            <p className="mt-1 text-[13px] text-muted">
              {TOPICS[item.topic] ?? item.topic}
              {item.condition ? ` · ${item.condition}` : ''}
            </p>
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
            {item.mobile ? (
              <a href={`tel:${item.mobile.replace(/\s/g, '')}`} className="flex items-center gap-3 rounded-xl bg-pale px-4 py-3 text-[14px] font-medium text-navy hover:bg-soft">
                <Phone className="h-4 w-4 shrink-0 text-teal" /> {item.mobile}
              </a>
            ) : null}
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Message</p>
            <p className="mt-2 whitespace-pre-wrap break-words text-[15px] leading-7 text-navy">
              {item.message || <span className="text-muted">No message.</span>}
            </p>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Status</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {STATUSES.map((s) => (
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

          {item.source ? <p className="text-[12px] text-muted">Sent from {item.source}</p> : null}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line px-6 py-4">
          <a
            href={`mailto:${item.email}?subject=${encodeURIComponent('Re: your enquiry to Orvena')}`}
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

export default function AdminEnquiriesPage() {
  useNoIndex('Enquiries | Orvena Admin')
  const { status, user } = useAdmin()
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [q, setQ] = useState('')
  const [topic, setTopic] = useState('all')
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  // the moment the page opened, for the "last 7 days" count
  const [openedAt] = useState(() => Date.now())

  useEffect(() => {
    if (status !== 'admin') return undefined
    let unsub = () => {}
    let alive = true
    watchEnquiries(
      (rows) => alive && setItems(rows),
      (e) => alive && setError(e.message),
    ).then((u) => {
      unsub = u
    })
    return () => {
      alive = false
      unsub()
    }
  }, [status])

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return (items ?? []).filter(
      (r) =>
        (topic === 'all' || r.topic === topic) &&
        (filter === 'all' || r.status === filter) &&
        (!needle || [r.name, r.email, r.mobile, r.message, r.condition].some((v) => String(v ?? '').toLowerCase().includes(needle))),
    )
  }, [items, q, topic, filter])

  const counts = useMemo(() => {
    const week = openedAt - 7 * 864e5
    const all = items ?? []
    return {
      total: all.length,
      new: all.filter((r) => r.status === 'new').length,
      week: all.filter((r) => r.createdAt && r.createdAt.getTime() >= week).length,
    }
  }, [items, openedAt])

  if (status === 'signed-out' || status === 'not-admin' || status === 'error') return <Navigate to="/login" replace />

  const open = items?.find((r) => r.id === openId) ?? null
  const onOpen = (r) => {
    setOpenId(r.id)
    if (r.status === 'new') setEnquiryStatus(r.id, 'read').catch(() => {})
  }
  const onStatus = (id, s) => setEnquiryStatus(id, s).catch((e) => setError(e.message))
  const onDelete = (id) =>
    deleteEnquiry(id)
      .then(() => setOpenId(null))
      .catch((e) => setError(e.message))

  return (
    <div className="min-h-svh bg-[#F3F6F8] text-navy">
      <AdminHeader user={user} />

      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[30px]">Enquiries</h1>
            <p className="text-[14px] text-muted">Every message sent from the website contact form.</p>
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
          {[
            ['Total', counts.total],
            ['New', counts.new],
            ['Last 7 days', counts.week],
          ].map(([l, v]) => (
            <div key={l} className="rounded-2xl bg-white p-4 ring-1 ring-line">
              <p className="text-[12px] text-muted sm:text-[13px]">{l}</p>
              <p className="mt-1 text-[24px] font-extrabold leading-none sm:text-[28px]">{items ? v : '…'}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_200px_160px]">
          <label className="relative">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, email, mobile or message"
              className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3 text-[14px] outline-none focus:border-teal/60"
            />
          </label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="Interested in" className="rounded-xl border border-line bg-white px-3 py-2.5 text-[14px] outline-none focus:border-teal/60">
            <option value="all">All topics</option>
            {Object.entries(TOPICS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Status" className="rounded-xl border border-line bg-white px-3 py-2.5 text-[14px] outline-none focus:border-teal/60">
            <option value="all">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {error ? <p role="alert" className="mt-4 rounded-xl bg-[#FDECEE] px-4 py-3 text-[13px] text-[#B4232C]">{error}</p> : null}

        <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-line">
          {status === 'loading' || items === null ? (
            <p className="px-5 py-12 text-center text-[14px] text-muted">Loading enquiries…</p>
          ) : shown.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <Inbox className="mx-auto h-8 w-8 text-muted" />
              <p className="mt-3 text-[15px] font-semibold">{items.length ? 'No enquiries match these filters.' : 'No enquiries yet.'}</p>
              <p className="mt-1 text-[13px] text-muted">
                {items.length ? 'Clear the search or change the filters.' : 'Messages from the contact form will appear here.'}
              </p>
            </div>
          ) : (
            <>
              <div className="hidden grid-cols-[150px_minmax(0,1fr)_minmax(0,1.1fr)_150px_100px] gap-4 border-b border-line bg-pale px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted md:grid">
                <span>Date</span>
                <span>Name</span>
                <span>Contact</span>
                <span>Interested in</span>
                <span>Status</span>
              </div>
              <ul className="divide-y divide-line">
                {shown.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => onOpen(r)}
                      className="grid w-full gap-1 px-5 py-4 text-left transition-colors hover:bg-pale md:grid-cols-[150px_minmax(0,1fr)_minmax(0,1.1fr)_150px_100px] md:items-center md:gap-4"
                    >
                      <span className="order-3 text-[12px] text-muted md:order-none md:text-[13px]">{fmt(r.createdAt)}</span>
                      <span className="flex items-center gap-2 md:block">
                        <span className={`truncate text-[15px] ${r.status === 'new' ? 'font-bold' : 'font-semibold'}`}>{r.name}</span>
                        <span className="ml-auto md:hidden"><StatusPill status={r.status} /></span>
                      </span>
                      <span className="min-w-0 truncate text-[13px] text-navy/80">
                        {r.email}
                        {r.mobile ? <span className="text-muted"> · {r.mobile}</span> : null}
                      </span>
                      <span className="hidden min-w-0 text-[13px] md:block">
                        <span className="block truncate">{TOPICS[r.topic] ?? r.topic}</span>
                        {r.condition ? <span className="block truncate text-[12px] text-muted">{r.condition}</span> : null}
                      </span>
                      <span className="hidden md:block"><StatusPill status={r.status} /></span>
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
