import PatientOperatingSystem from '../components/PatientOperatingSystem'
import { usePageTitle } from '../hooks/usePageTitle'

export default function HealthOSPage() {
  usePageTitle('HealthOS - Orvena')

  return <PatientOperatingSystem />
}
