import HealthOSDetails from '../components/HealthOSDetails'
import HealthOSParallax from '../components/HealthOSParallax'
import { useEffect } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'

const DESCRIPTION =
  'Move from scattered medical paper files to a continuous, intelligent health timeline. HealthOS organizes lab biomarkers, tracks trends, and protects your family with ABDM-compliant health intelligence.'

export default function HealthOSPage() {
  usePageTitle('HealthOS by Orvena | The Intelligent Patient Operating System')

  // Page-specific meta description; the site default comes back when leaving the page
  useEffect(() => {
    const tag = document.querySelector('meta[name="description"]')
    if (!tag) return undefined
    const previous = tag.getAttribute('content')
    tag.setAttribute('content', DESCRIPTION)
    return () => tag.setAttribute('content', previous)
  }, [])

  return (
    <>
      <HealthOSParallax />
      <HealthOSDetails />
    </>
  )
}
