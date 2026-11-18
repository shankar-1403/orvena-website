import { ArrowRight, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'
import SectionCard from '../components/ui/SectionCard'
import { usePageMeta } from '../hooks/usePageMeta'
import { watchBlogs } from '../lib/blogs'

function Meta({ blog, className = '' }) {
  const bits = [blog.date, blog.readTime].filter(Boolean)
  return bits.length ? <p className={`text-[13px] text-muted ${className}`}>{bits.join(' · ')}</p> : null
}

function Card({ blog }) {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="o-plate group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="aspect-video overflow-hidden bg-pale">
        {blog.cover_image ? (
          <img src={blog.cover_image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : null}
      </span>
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        {blog.category ? <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">{blog.category}</span> : null}
        <span className="mt-2 text-[19px] font-bold leading-snug tracking-tight text-navy">{blog.title}</span>
        <span className="mt-2 line-clamp-3 text-[14.5px] leading-6 text-muted">{blog.excerpt}</span>
        <span className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Meta blog={blog} />
          <ArrowRight className="h-4 w-4 shrink-0 text-navy transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  )
}

function Featured({ blog }) {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="o-plate group grid overflow-hidden rounded-[28px] border border-white/80 bg-white transition-transform duration-300 hover:-translate-y-1 md:grid-cols-[1.15fr_1fr]"
    >
      <span className="aspect-video overflow-hidden bg-pale md:aspect-auto md:min-h-[320px]">
        {blog.cover_image ? (
          <img src={blog.cover_image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : null}
      </span>
      <span className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
          Featured{blog.category ? ` · ${blog.category}` : ''}
        </span>
        <span className="mt-3 text-[24px] font-extrabold leading-tight tracking-[-0.03em] text-navy sm:text-[30px]">{blog.title}</span>
        <span className="mt-3 text-[15px] leading-7 text-muted">{blog.excerpt}</span>
        <span className="mt-6 flex items-center justify-between gap-3">
          <Meta blog={blog} />
          <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy">
            Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </span>
      </span>
    </Link>
  )
}

function ComingSoon() {
  return (
    <Container className="relative text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal to-navy text-white shadow-[0_14px_28px_-14px_rgba(11,65,86,0.7)]">
        <BookOpen className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <div className="mt-6 flex justify-center">
        <Eyebrow>Blog</Eyebrow>
      </div>
      <h1 className="mt-4 text-[30px] font-extrabold tracking-[-0.04em] text-navy sm:text-[42px] lg:text-[50px]">Articles Coming Soon</h1>
      <p className="mx-auto mt-4 max-w-[46ch] text-[16px] leading-8 text-muted">
        We’re writing guides on reading your health reports, managing lifestyle conditions and running a modern clinic. Check
        back soon.
      </p>
      <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
        <Button href="/" className="w-full sm:w-auto">Back home</Button>
        <Button href="/healthos" variant="secondary" className="w-full sm:w-auto">
          Explore HealthOS
        </Button>
      </div>
    </Container>
  )
}

export default function BlogPage() {
  usePageMeta(
    'Blog | Orvena',
    'Articles from Orvena on understanding your health reports, lifestyle conditions and modern clinic care.',
  )
  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    let unsub = () => {}
    let alive = true
    watchBlogs(
      (rows) => alive && setBlogs(rows),
      () => alive && setBlogs([]),
    )
      .then((u) => {
        unsub = u
      })
      .catch(() => alive && setBlogs([]))
    return () => {
      alive = false
      unsub()
    }
  }, [])

  if (blogs !== null && blogs.length === 0) {
    return (
      <SectionCard className="bg-white py-14 sm:py-20 lg:py-28">
        <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50" />
        <ComingSoon />
      </SectionCard>
    )
  }

  const featured = blogs?.find((b) => b.featured) ?? null
  const rest = (blogs ?? []).filter((b) => b !== featured)

  return (
    <SectionCard className="bg-white py-12 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50" />
      <Container className="relative">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="mt-4 text-[30px] font-extrabold tracking-[-0.04em] text-navy sm:text-[42px] lg:text-[50px]">Insights from Orvena</h1>
        <p className="mt-3 max-w-[56ch] text-[16px] leading-8 text-muted">
          Guides on reading your health reports, managing lifestyle conditions and running a modern clinic.
        </p>

        {blogs === null ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[340px] animate-pulse rounded-[24px] bg-pale" />
            ))}
          </div>
        ) : (
          <>
            {featured ? (
              <div className="mt-10">
                <Featured blog={featured} />
              </div>
            ) : null}
            {rest.length ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((b) => (
                  <Card key={b.id} blog={b} />
                ))}
              </div>
            ) : null}
          </>
        )}
      </Container>
    </SectionCard>
  )
}
