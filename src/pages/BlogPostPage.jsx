import DOMPurify from 'dompurify'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import SectionCard from '../components/ui/SectionCard'
import { usePageMeta } from '../hooks/usePageMeta'
import { watchBlog } from '../lib/blogs'

export default function BlogPostPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState(undefined) // undefined = loading, null = not found

  useEffect(() => {
    let unsub = () => {}
    let alive = true
    watchBlog(
      id,
      (b) => alive && setBlog(b),
      () => alive && setBlog(null),
    )
      .then((u) => {
        unsub = u
      })
      .catch(() => alive && setBlog(null))
    return () => {
      alive = false
      unsub()
    }
  }, [id])

  usePageMeta(blog ? `${blog.title} | Orvena Blog` : 'Blog | Orvena', blog?.excerpt || 'Articles from Orvena.')

  const html = useMemo(() => DOMPurify.sanitize(blog?.content || ''), [blog?.content])

  if (blog === null) {
    return (
      <SectionCard className="bg-white py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="text-[28px] font-extrabold tracking-tight text-navy sm:text-[36px]">Article not found</h1>
          <p className="mt-3 text-muted">It may have been moved or removed.</p>
          <div className="mt-6 flex justify-center">
            <Button href="/blog">All articles</Button>
          </div>
        </Container>
      </SectionCard>
    )
  }

  return (
    <SectionCard className="bg-white py-10 sm:py-14 lg:py-16">
      <Container className="max-w-[820px]">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy/70 hover:text-navy">
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        {blog === undefined ? (
          <div className="mt-8 space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded-xl bg-pale" />
            <div className="aspect-video animate-pulse rounded-[24px] bg-pale" />
          </div>
        ) : (
          <article className="mt-6">
            {blog.category ? <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">{blog.category}</p> : null}
            <h1 className="mt-3 text-[30px] font-extrabold leading-[1.1] tracking-[-0.04em] text-navy sm:text-[42px]">{blog.title}</h1>
            <p className="mt-4 text-[14px] text-muted">{[blog.author, blog.date, blog.readTime].filter(Boolean).join(' · ')}</p>
            {blog.cover_image ? (
              <img src={blog.cover_image} alt="" className="mt-8 aspect-video w-full rounded-[24px] object-cover" />
            ) : null}
            {blog.excerpt ? <p className="mt-8 text-[18px] leading-8 text-navy/80">{blog.excerpt}</p> : null}
            {blog.inner_image ? <img src={blog.inner_image} alt="" className="mt-8 w-full rounded-[20px]" /> : null}
            <div className="o-prose mt-8" dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        )}
      </Container>
    </SectionCard>
  )
}
