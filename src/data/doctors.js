const API_HOST = 'https://demo.orvenahealth.com'
const DEFAULT_PHOTO = API_HOST + '/Images/docsign/doctor-no-image.jpg'

// Make "GOKUL KATKADE" look like "Gokul Katkade"
function cleanName(text) {
  if (!text) return ''

  return text
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

// Pull a number out of text like "15 Years of Experience"
function getYears(text) {
  const match = String(text || '').match(/(\d+)\s*(yr|year)/i)
  return match ? Number(match[1]) : 0
}

// API sends paths like "/Images/docsign/DrABG.jpeg"
function getPhoto(path) {
  if (!path) return DEFAULT_PHOTO
  if (path.startsWith('http')) return path
  return API_HOST + path
}

function toDoctor(item) {
  return {
    id: String(item.DoctorId),
    name: cleanName(item.DoctorName),
    specialty: cleanName(item.Specialization) || 'Specialist',
    qualifications: item.Degree || '',
    years: getYears(item.Experience),
    focus: item.BreifDescription || item.Experience || '',
    image: getPhoto(item.DocPhotoImagePath),
  }
}

export async function getDoctors() {
  const response = await fetch('/api/doctors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  })

  if (!response.ok) {
    throw new Error('Could not load doctors')
  }

  const data = await response.json()
  const list = typeof data.d === 'string' ? JSON.parse(data.d) : data.d

  if (!Array.isArray(list)) return []
  return list.map(toDoctor)
}
