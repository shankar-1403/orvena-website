import PatientOperatingSystem from '../components/PatientOperatingSystem'
import { usePageTitle } from '../hooks/usePageTitle'

export default function PatientOSPage() {
  usePageTitle('Patient OS — Orvena')

  return <PatientOperatingSystem />
}
