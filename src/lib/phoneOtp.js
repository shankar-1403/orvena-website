// Phone number verification by SMS code for the Book a Demo form, using the ClinicOS
// GetVerificationOTP API. Locally it goes through the Vite proxy (/api/otp) to avoid CORS.
// NOTE: the API returns the code itself, so the check happens in the browser for now.
// When the backend adds a VerifyOTP(MobileNumber, OTP) method, move the check there.

const OTP_URL = import.meta.env.DEV
  ? '/api/otp'
  : 'https://demo.orvenahealth.com/AppService.asmx/GetVerificationOTP'

/** Kept for the form's existing calls; nothing to clear with this provider. */
export function resetOtp() {}

/** Sends a code to a 10-digit Indian mobile number. Resolves to a confirmation for verifyOtp. */
export async function sendOtp(phone) {
  let res
  try {
    res = await fetch(OTP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ MobileNumber: phone }),
    })
  } catch {
    throw Object.assign(new Error('unreachable'), { code: 'unreachable' })
  }
  if (!res.ok) throw Object.assign(new Error('unreachable'), { code: 'unreachable' })
  const text = new DOMParser().parseFromString(await res.text(), 'text/xml').documentElement?.textContent || ''
  const code = text.match(/\b\d{4,6}\b/)?.[0]
  if (!code) throw Object.assign(new Error(text || 'no code'), { code: 'unreachable' })
  return { phone, code }
}

/** Checks the typed code. Resolves to the verified number in +91 form. */
export async function verifyOtp(confirmation, code) {
  if (!confirmation || code !== confirmation.code)
    throw Object.assign(new Error('bad code'), { code: 'invalid-verification-code' })
  return `+91${confirmation.phone}`
}

/** Plain-language messages for the errors people actually hit. */
export function otpError(err) {
  const code = err?.code || ''
  if (code.includes('invalid-verification-code')) return 'That code is incorrect. Check the SMS and try again.'
  return 'We couldn’t verify your number just now. Please try again.'
}
