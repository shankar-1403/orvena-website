// Everything the site does with form enquiries. Firebase is loaded only when one of
// these runs, so the public pages stay light.

export const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'handled', label: 'Handled' },
]

export const TOPICS = {
  healthos: 'HealthOS',
  clinicos: 'ClinicOS demo',
  reversal: 'Disease Reversal',
  other: 'Others',
}

async function firebase() {
  const mod = await import('./firebase')
  if (!mod.firebaseReady) throw new Error('Firebase is not configured. Add the keys to .env.local.')
  return mod
}

/** Saves a contact-form enquiry. Anyone can do this; only admins can read them back. */
export async function submitEnquiry({ name, email, mobile, topic, condition, message }) {
  const { db } = await firebase()
  const { push, ref, serverTimestamp } = await import('firebase/database')
  await push(ref(db, 'enquiries'), {
    name: name.trim().slice(0, 120),
    email: email.trim().slice(0, 200),
    mobile: mobile.trim().slice(0, 20),
    topic,
    condition: topic === 'reversal' ? String(condition || '').slice(0, 100) : '',
    message: message.trim().slice(0, 4000),
    status: 'new',
    source: window.location.pathname.slice(0, 200),
    createdAt: serverTimestamp(),
  })
}

/**
 * Live list of one topic's enquiries ('healthos' | 'clinicos' | 'reversal'), newest first.
 * The rules only allow reads filtered by topic, so each CMS user sees only their sections.
 */
export async function watchEnquiries(topic, onData, onError) {
  const { db } = await firebase()
  const { equalTo, onValue, orderByChild, query, ref } = await import('firebase/database')
  return onValue(
    query(ref(db, 'enquiries'), orderByChild('topic'), equalTo(topic)),
    (snap) => {
      const rows = []
      snap.forEach((child) => {
        const data = child.val()
        rows.push({ id: child.key, ...data, createdAt: data.createdAt ? new Date(data.createdAt) : null })
      })
      rows.sort((x, y) => (y.createdAt?.getTime() ?? Infinity) - (x.createdAt?.getTime() ?? Infinity))
      onData(rows)
    },
    onError,
  )
}

export async function setEnquiryStatus(id, status) {
  const { db } = await firebase()
  const { ref, update } = await import('firebase/database')
  await update(ref(db, `enquiries/${id}`), { status })
}

export async function deleteEnquiry(id) {
  const { db } = await firebase()
  const { ref, remove } = await import('firebase/database')
  await remove(ref(db, `enquiries/${id}`))
}

/* ---------- doctor onboarding (Book a Demo form on ClinicOS) ---------- */

/** Saves a Book a Demo request. Anyone can do this; only admins can read them back. */
export async function submitDemoRequest({ name, specialization, email, mobile, city }) {
  const { db } = await firebase()
  const { push, ref, serverTimestamp } = await import('firebase/database')
  await push(ref(db, 'doctorOnboarding'), {
    name: name.trim().slice(0, 120),
    specialization: specialization.trim().slice(0, 120),
    email: email.trim().slice(0, 200),
    mobile: mobile.trim().slice(0, 20),
    city: city.trim().slice(0, 120),
    status: 'new',
    source: window.location.pathname.slice(0, 200),
    createdAt: serverTimestamp(),
  })
}

/** Live list of demo requests, newest first. Returns an unsubscribe function. */
export async function watchDemoRequests(onData, onError) {
  const { db } = await firebase()
  const { onValue, orderByChild, query, ref } = await import('firebase/database')
  return onValue(
    query(ref(db, 'doctorOnboarding'), orderByChild('createdAt')),
    (snap) => {
      const rows = []
      snap.forEach((child) => {
        const data = child.val()
        rows.push({ id: child.key, ...data, createdAt: data.createdAt ? new Date(data.createdAt) : null })
      })
      onData(rows.reverse())
    },
    onError,
  )
}

export async function setDemoStatus(id, status) {
  const { db } = await firebase()
  const { ref, update } = await import('firebase/database')
  await update(ref(db, `doctorOnboarding/${id}`), { status })
}

export async function deleteDemoRequest(id) {
  const { db } = await firebase()
  const { ref, remove } = await import('firebase/database')
  await remove(ref(db, `doctorOnboarding/${id}`))
}

/* ---------- admin sign-in ---------- */

export async function signIn(email, password) {
  const { auth } = await firebase()
  const { signInWithEmailAndPassword } = await import('firebase/auth')
  await signInWithEmailAndPassword(auth, email, password)
}

export async function signOutAdmin() {
  const { auth } = await firebase()
  const { signOut } = await import('firebase/auth')
  await signOut(auth)
}

/* ---------- CMS access: one main admin, other users get chosen sections ---------- */

/** The main admin. Must match MAIN_ADMIN in database.rules.json. */
export const MAIN_ADMIN_EMAIL = 'orvena.developer@gmail.com'

/** Every CMS section, in tab order. `key` is what is saved under users/{uid}/sections. */
export const SECTIONS = [
  { key: 'hos', label: 'HealthOS Enquiries', short: 'HOS Enquiries', path: '/admin/hos' },
  { key: 'cos', label: 'ClinicOS Enquiries', short: 'COS Enquiries', path: '/admin/cos' },
  { key: 'dt', label: 'Disease Reversal Enquiries', short: 'Disease Reversal Enquiries', path: '/admin/dt' },
  { key: 'doctors', label: 'Doctor Onboarding', short: 'Doctor Onboarding', path: '/admin/doctors' },
  { key: 'blogs', label: 'Blogs', short: 'Blogs', path: '/admin/blogs' },
]

export const isMainAdmin = (user) => (user?.email || '').toLowerCase() === MAIN_ADMIN_EMAIL

/** Calls back with { user, isAdmin, isSuper, sections } whenever the sign-in state changes. */
export async function watchAdmin(callback) {
  const { auth, db } = await firebase()
  const { onAuthStateChanged } = await import('firebase/auth')
  const { get, ref } = await import('firebase/database')
  return onAuthStateChanged(auth, async (user) => {
    if (!user) return callback({ user: null, isAdmin: false, isSuper: false, sections: [] })
    if (isMainAdmin(user)) {
      return callback({ user, isAdmin: true, isSuper: true, sections: SECTIONS.map((s) => s.key) })
    }
    try {
      const snap = await get(ref(db, `users/${user.uid}/sections`))
      const given = snap.val() || {}
      const sections = SECTIONS.map((s) => s.key).filter((k) => given[k] === true)
      callback({ user, isAdmin: sections.length > 0, isSuper: false, sections, reason: sections.length ? '' : 'no sections assigned' })
    } catch (err) {
      console.warn('[admin check]', user.email, err?.code || err?.message)
      callback({ user, isAdmin: false, isSuper: false, sections: [], reason: err?.message || '' })
    }
  })
}

/** Main admin only: live list of CMS users from users/{uid}. */
export async function watchCmsUsers(onData, onError) {
  const { db } = await firebase()
  const { onValue, ref } = await import('firebase/database')
  return onValue(
    ref(db, 'users'),
    (snap) => {
      const rows = []
      snap.forEach((child) => {
        const d = child.val() || {}
        rows.push({ uid: child.key, email: d.email || '', name: d.name || '', sections: d.sections || {}, createdAt: d.createdAt || 0 })
      })
      onData(rows.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)))
    },
    onError,
  )
}

/**
 * Main admin only: creates a login (email + password) and saves the sections it may open.
 * Uses a second Firebase app so the main admin stays signed in.
 */
export async function createCmsUser({ name, email, password, sections }) {
  const { config, db } = await firebase()
  const { initializeApp, getApps, deleteApp } = await import('firebase/app')
  const { createUserWithEmailAndPassword, getAuth, signOut } = await import('firebase/auth')
  const { ref, serverTimestamp, set } = await import('firebase/database')
  const second = getApps().find((a) => a.name === 'cms-user-creator') ?? initializeApp(config, 'cms-user-creator')
  const secondAuth = getAuth(second)
  try {
    const cred = await createUserWithEmailAndPassword(secondAuth, email.trim(), password)
    await set(ref(db, `users/${cred.user.uid}`), {
      name: name.trim().slice(0, 120),
      email: email.trim().toLowerCase(),
      sections,
      createdAt: serverTimestamp(),
    })
    await signOut(secondAuth)
  } finally {
    await deleteApp(second).catch(() => {})
  }
}

/** Main admin only: replaces a user's sections (an empty object removes all access). */
export async function setCmsUserSections(uid, sections) {
  const { db } = await firebase()
  const { ref, set } = await import('firebase/database')
  await set(ref(db, `users/${uid}/sections`), Object.keys(sections).length ? sections : null)
}

/** Main admin only: removes a user from the CMS. Their login stays, but it opens nothing. */
export async function removeCmsUser(uid) {
  const { db } = await firebase()
  const { ref, remove } = await import('firebase/database')
  await remove(ref(db, `users/${uid}`))
}
