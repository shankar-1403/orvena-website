import Services from '../components/Services'
import GlobalHealthcare from '../components/GlobalHealthcare'
import Packages from '../components/Packages'
import { usePageTitle } from '../hooks/usePageTitle'

export default function ServicesPage() {
  usePageTitle('Services — Orvena')

  return (
    <>
      <Services />
      <GlobalHealthcare />
      {/* <Packages /> */}
    </>
  )
}
