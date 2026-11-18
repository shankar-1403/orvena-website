// Blog posts, stored in the Realtime Database at blogs/{id} (same shape as the PCRED CMS).
// Images go to Firebase Storage at blogs/{id}/... Firebase loads only when one of these runs.

async function firebase() {
  const mod = await import('./firebase')
  if (!mod.firebaseReady) throw new Error('Firebase is not configured. Add the keys to .env.local.')
  return mod
}

const toList = (value) =>
  value
    ? Object.entries(value)
        .map(([id, data]) => ({ id, ...data }))
        .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    : []

/** Live list of every post, newest first. Returns an unsubscribe function. */
export async function watchBlogs(onData, onError) {
  const { db } = await firebase()
  const { onValue, ref } = await import('firebase/database')
  return onValue(ref(db, 'blogs'), (snap) => onData(toList(snap.val())), onError)
}

/** Live single post (null when it doesn't exist). */
export async function watchBlog(id, onData, onError) {
  const { db } = await firebase()
  const { onValue, ref } = await import('firebase/database')
  return onValue(ref(db, `blogs/${id}`), (snap) => onData(snap.exists() ? { id, ...snap.val() } : null), onError)
}

async function uploadImage(blogId, field, file) {
  const { app } = await firebase()
  const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage')
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
  const r = ref(getStorage(app), `blogs/${blogId}/${field}-${Date.now()}.${ext}`)
  await uploadBytes(r, file, { contentType: file.type })
  return getDownloadURL(r)
}

/** Creates or updates a post. `files` holds new cover/inner images (or null to keep the current ones). */
export async function saveBlog({ id, data, files, existing, user }) {
  const { db } = await firebase()
  const { push, ref, set } = await import('firebase/database')
  const blogId = id ?? push(ref(db, 'blogs')).key
  const [cover_image, inner_image] = await Promise.all([
    files.cover_image ? uploadImage(blogId, 'cover', files.cover_image) : existing?.cover_image ?? '',
    files.inner_image ? uploadImage(blogId, 'inner', files.inner_image) : existing?.inner_image ?? '',
  ])
  const now = Date.now()
  await set(ref(db, `blogs/${blogId}`), {
    title: data.title.trim(),
    excerpt: data.excerpt.trim(),
    category: data.category.trim(),
    author: data.author.trim(),
    date: data.date.trim(),
    readTime: data.readTime.trim(),
    featured: Boolean(data.featured),
    content: data.content ?? '',
    cover_image,
    inner_image,
    createdAt: existing?.createdAt ?? now,
    createdBy: existing?.createdBy ?? user?.uid ?? null,
    updatedAt: now,
    updatedBy: user?.uid ?? null,
  })
  return blogId
}

export async function deleteBlog(id) {
  const { db } = await firebase()
  const { ref, remove } = await import('firebase/database')
  await remove(ref(db, `blogs/${id}`))
}
