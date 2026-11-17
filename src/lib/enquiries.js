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
  const { addDoc, collection, serverTimestamp } = await import('firebase/firestore')
  await addDoc(collection(db, 'enquiries'), {
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

/** Live list of enquiries, newest first. Returns an unsubscribe function. */
export async function watchEnquiries(onData, onError) {
  const { db } = await firebase()
  const { collection, onSnapshot, orderBy, query } = await import('firebase/firestore')
  return onSnapshot(
    query(collection(db, 'enquiries'), orderBy('createdAt', 'desc')),
    (snap) =>
      onData(
        snap.docs.map((d) => {
          const data = d.data()
          return { id: d.id, ...data, createdAt: data.createdAt?.toDate?.() ?? null }
        }),
      ),
    onError,
  )
}

export async function setEnquiryStatus(id, status) {
  const { db } = await firebase()
  const { doc, updateDoc } = await import('firebase/firestore')
  await updateDoc(doc(db, 'enquiries', id), { status })
}

export async function deleteEnquiry(id) {
  const { db } = await firebase()
  const { deleteDoc, doc } = await import('firebase/firestore')
  await deleteDoc(doc(db, 'enquiries', id))
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

/** Calls back with { user, isAdmin } whenever the sign-in state changes. */
export async function watchAdmin(callback) {
  const { auth, db } = await firebase()
  const { onAuthStateChanged } = await import('firebase/auth')
  const { doc, getDoc } = await import('firebase/firestore')
  return onAuthStateChanged(auth, async (user) => {
    if (!user) return callback({ user: null, isAdmin: false })
    try {
      const snap = await getDoc(doc(db, 'admins', user.uid))
      callback({ user, isAdmin: snap.exists() })
    } catch {
      callback({ user, isAdmin: false })
    }
  })
}
