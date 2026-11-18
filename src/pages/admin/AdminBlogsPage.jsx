import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Bold, ClassicEditor, Essentials, Heading, Italic, Link, List, Paragraph, Underline } from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, FileText, ImagePlus, Pencil, Plus, Star, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { deleteBlog, saveBlog, watchBlogs } from '../../lib/blogs'
import AdminHeader from './AdminHeader'
import { useAdmin, useNoIndex } from './useAdmin'

const emptyForm = { title: '', excerpt: '', category: '', author: '', date: '', readTime: '', featured: false, content: '' }
const noFiles = { cover_image: null, inner_image: null }

const field =
  'w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[14px] text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-teal/60 focus:ring-4 focus:ring-teal/10'
const label = 'mb-1.5 block text-[13px] font-semibold text-navy'

const editorConfig = {
  licenseKey: 'GPL',
  plugins: [Essentials, Paragraph, Bold, Italic, Underline, Link, List, Heading],
  toolbar: ['heading', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList'],
}

function ImageField({ name, title, hint, required, current, file, onChange }) {
  const preview = file ? URL.createObjectURL(file) : current
  return (
    <div>
      <span className={label}>
        {title} {required ? '*' : null}
      </span>
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-line bg-pale/50 p-3 transition-colors hover:border-teal/50">
        <span className="grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-line">
          {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : <ImagePlus className="h-5 w-5 text-muted" />}
        </span>
        <span className="min-w-0 text-[13px]">
          <span className="block truncate font-semibold text-navy">{file ? file.name : current ? 'Current image saved' : 'Choose an image'}</span>
          <span className="block text-muted">{hint}</span>
        </span>
        <input type="file" name={name} accept="image/*" onChange={onChange} className="sr-only" />
      </label>
    </div>
  )
}

function Editor({ editing, onClose, user }) {
  const [form, setForm] = useState(() => (editing ? { ...emptyForm, ...editing, featured: Boolean(editing.featured) } : emptyForm))
  const [files, setFiles] = useState(noFiles)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const set = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  const pick = (e) => {
    const { name, files: chosen } = e.target
    setFiles((f) => ({ ...f, [name]: chosen?.[0] ?? null }))
  }

  const onSave = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title.trim() || !form.excerpt.trim()) return setError('Add a title and an excerpt.')
    if (!files.cover_image && !editing?.cover_image) return setError('Add a cover image.')
    setBusy(true)
    try {
      await saveBlog({ id: editing?.id, data: form, files, existing: editing, user })
      onClose()
    } catch (err) {
      setError(err?.message || 'Could not save the blog.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-navy/40 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        className="relative z-10 flex max-h-[92vh] w-full max-w-[880px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <h2 className="text-[18px] font-extrabold tracking-tight text-navy">{editing ? 'Edit blog' : 'Add blog'}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-line hover:bg-pale">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSave} className="flex min-h-0 flex-1 flex-col" noValidate>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
            {error ? <p className="rounded-xl bg-[#FDECEE] px-4 py-3 text-[13px] text-[#B4232C]">{error}</p> : null}

            <div>
              <label htmlFor="b-title" className={label}>Title *</label>
              <input id="b-title" name="title" value={form.title} onChange={set} className={field} />
            </div>
            <div>
              <label htmlFor="b-excerpt" className={label}>Excerpt *</label>
              <textarea id="b-excerpt" name="excerpt" rows={3} value={form.excerpt} onChange={set} className={`${field} resize-none`} />
              <p className="mt-1 text-[12px] text-muted">The short summary shown on the blog cards.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="b-category" className={label}>Category</label>
                <input id="b-category" name="category" value={form.category} onChange={set} placeholder="e.g. Health reports" className={field} />
              </div>
              <div>
                <label htmlFor="b-author" className={label}>Author</label>
                <input id="b-author" name="author" value={form.author} onChange={set} className={field} />
              </div>
              <div>
                <label htmlFor="b-date" className={label}>Date</label>
                <input id="b-date" name="date" value={form.date} onChange={set} placeholder="e.g. Nov 18, 2026" className={field} />
              </div>
              <div>
                <label htmlFor="b-read" className={label}>Read time</label>
                <input id="b-read" name="readTime" value={form.readTime} onChange={set} placeholder="e.g. 5 min read" className={field} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ImageField
                name="cover_image"
                title="Cover image"
                required={!editing}
                hint="16:9, e.g. 1280×720px. Shown on cards."
                current={editing?.cover_image}
                file={files.cover_image}
                onChange={pick}
              />
              <ImageField
                name="inner_image"
                title="Blog image (inside the article)"
                hint="Optional. Any size."
                current={editing?.inner_image}
                file={files.inner_image}
                onChange={pick}
              />
            </div>

            <label className="flex w-fit cursor-pointer items-center gap-2.5 text-[14px] font-semibold text-navy">
              <input type="checkbox" name="featured" checked={form.featured} onChange={set} className="h-4 w-4 accent-[#d95f14]" />
              Mark as featured article
            </label>

            <div>
              <span className={label}>Content (full article)</span>
              <div className="o-blog-editor">
                <CKEditor editor={ClassicEditor} config={editorConfig} data={form.content} onChange={(_, ed) => setForm((f) => ({ ...f, content: ed.getData() }))} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-line px-5 py-4 sm:px-6">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-[14px] font-semibold text-navy ring-1 ring-line hover:bg-pale">
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-gradient-to-r from-[#e0610a] to-[#f08a3c] px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(224,97,10,0.8)] disabled:opacity-50"
            >
              {busy ? 'Saving…' : editing ? 'Save changes' : 'Publish blog'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function AdminBlogsPage() {
  useNoIndex('Blogs | Orvena Admin')
  const { status, user } = useAdmin()
  const [blogs, setBlogs] = useState(null)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(undefined) // undefined = closed, null = new, object = edit

  useEffect(() => {
    if (status !== 'admin') return undefined
    let unsub = () => {}
    let alive = true
    watchBlogs(
      (rows) => alive && setBlogs(rows),
      (e) => alive && setError(e.message),
    ).then((u) => {
      unsub = u
    })
    return () => {
      alive = false
      unsub()
    }
  }, [status])

  if (status === 'signed-out' || status === 'not-admin' || status === 'error') return <Navigate to="/login" replace />

  const onDelete = (b) => {
    if (!window.confirm(`Delete “${b.title || 'this blog'}”? This can’t be undone.`)) return
    deleteBlog(b.id).catch((e) => setError(e.message))
  }

  return (
    <div className="min-h-svh bg-[#F3F6F8] text-navy">
      <AdminHeader user={user} />

      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[30px]">Blogs</h1>
            <p className="text-[14px] text-muted">Posts shown on the website’s Blog page.</p>
          </div>
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-teal"
          >
            <Plus className="h-4 w-4" /> Add blog
          </button>
        </div>

        {error ? <p className="mt-4 rounded-xl bg-[#FDECEE] px-4 py-3 text-[13px] text-[#B4232C]">{error}</p> : null}

        <div className="mt-5 overflow-hidden rounded-2xl bg-white ring-1 ring-line">
          {blogs === null ? (
            <p className="px-5 py-10 text-center text-[14px] text-muted">Loading blogs…</p>
          ) : blogs.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <FileText className="mx-auto h-8 w-8 text-muted" strokeWidth={1.5} />
              <p className="mt-3 font-semibold">No blogs yet</p>
              <p className="text-[14px] text-muted">Add your first post and it appears on the website’s Blog page.</p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {blogs.map((b) => (
                <li key={b.id} className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
                  <span className="h-12 w-[72px] shrink-0 overflow-hidden rounded-lg bg-pale ring-1 ring-line sm:h-14 sm:w-24">
                    {b.cover_image ? <img src={b.cover_image} alt="" className="h-full w-full object-cover" /> : null}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 truncate font-semibold">
                      <span className="truncate">{b.title || 'Untitled'}</span>
                      {b.featured ? (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#FDF1E1] px-2 py-0.5 text-[11px] font-semibold text-[#B4530F]">
                          <Star className="h-3 w-3" /> Featured
                        </span>
                      ) : null}
                    </p>
                    <p className="truncate text-[13px] text-muted">{[b.category, b.author, b.date].filter(Boolean).join(' · ') || 'No details'}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <a href={`/blog/${b.id}`} target="_blank" rel="noreferrer" aria-label="View on site" className="grid h-9 w-9 place-items-center rounded-lg text-navy/70 hover:bg-pale">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button type="button" onClick={() => setEditing(b)} aria-label="Edit" className="grid h-9 w-9 place-items-center rounded-lg text-navy/70 hover:bg-pale">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => onDelete(b)} aria-label="Delete" className="grid h-9 w-9 place-items-center rounded-lg text-[#B4232C] hover:bg-[#FDECEE]">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <AnimatePresence>{editing !== undefined ? <Editor key="editor" editing={editing} user={user} onClose={() => setEditing(undefined)} /> : null}</AnimatePresence>
    </div>
  )
}
