// Phone number verification by SMS code (Firebase Phone Auth), used by the Book a Demo form.
// It runs on its own Firebase app instance, so it never signs anyone in or out of the CMS.

let verifier = null

async function otpAuth() {
  const mod = await import('./firebase')
  if (!mod.firebaseReady) throw new Error('Firebase is not configured.')
  const { getApps, initializeApp } = await import('firebase/app')
  const { getAuth } = await import('firebase/auth')
  const app = getApps().find((a) => a.name === 'phone-otp') ?? initializeApp(mod.config, 'phone-otp')
  return getAuth(app)
}

/** Clears the invisible reCAPTCHA so a new one can be made (on resend or close). */
export function resetOtp() {
  try {
    verifier?.clear()
  } catch {
    // already cleared
  }
  verifier = null
}

/**
 * Sends a 6-digit code to `phone` (E.164, e.g. +919876543210). `containerId` is an empty
 * element the invisible reCAPTCHA attaches to. Returns a confirmation used by verifyOtp.
 */
export async function sendOtp(phone, containerId) {
  const auth = await otpAuth()
  const { RecaptchaVerifier, signInWithPhoneNumber } = await import('firebase/auth')
  resetOtp()
  verifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' })
  return signInWithPhoneNumber(auth, phone, verifier)
}

/** Checks the code. Resolves to the verified phone number, then signs that session out. */
export async function verifyOtp(confirmation, code) {
  const result = await confirmation.confirm(code)
  const phone = result.user.phoneNumber
  const { signOut } = await import('firebase/auth')
  await signOut(await otpAuth()).catch(() => {})
  return phone
}

/** Plain-language messages for the Firebase phone errors people actually hit. */
export function otpError(err) {
  const code = err?.code || ''
  if (code.includes('invalid-phone-number')) return 'That phone number doesn’t look right. Check it and try again.'
  if (code.includes('too-many-requests') || code.includes('quota-exceeded'))
    return 'Too many attempts. Please wait a few minutes and try again.'
  if (code.includes('invalid-verification-code')) return 'That code is incorrect. Check the SMS and try again.'
  if (code.includes('code-expired')) return 'That code has expired. Tap “Resend code” for a new one.'
  if (code.includes('operation-not-allowed') || code.includes('billing'))
    return 'Phone verification isn’t switched on yet. Please try again later.'
  return 'We couldn’t verify your number just now. Please try again.'
}
