import Doctors from '../components/Doctors'
import { usePageTitle } from '../hooks/usePageTitle'

export default function DoctorsPage() {
  usePageTitle('Doctors - Orvena')

  return <Doctors />
}
