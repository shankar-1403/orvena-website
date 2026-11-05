import HealthOSDetails from '../components/HealthOSDetails'
import HealthOSParallax from '../components/HealthOSParallax'
import { useEffect } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'

const DESCRIPTION =
  'Move from scattered medical paper files to one organised, private health record. HealthOS stores your reports, charts your key readings and trends, and lets you share a one-page summary with your doctor.'

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
