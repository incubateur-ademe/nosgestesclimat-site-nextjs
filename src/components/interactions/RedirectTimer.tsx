'use client'

import { useRouter } from 'next/navigation'
import SecondsTimer from './SecondsTimer'

export default function RedirectTimer({ href }: { href: string }) {
  const router = useRouter()

  const handleNavigation = () => {
    // Use internal routing if local route
    if (href.startsWith('/')) {
      router.push(href)
      return
    }

    if (typeof window === 'undefined') return

    window.location.href = href
  }

  return <SecondsTimer duration={20} onComplete={handleNavigation} />
}
