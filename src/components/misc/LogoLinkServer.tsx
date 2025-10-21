import { twMerge } from 'tailwind-merge'

import Link from 'next/link'
import Logo from './Logo'

type Props = {
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md'
}
export default function LogoLinkServer({ className, size = 'md' }: Props) {
  return (
    <div className={twMerge('flex items-center', className)}>
      <Link
        href="/"
        data-cypress-id="home-logo-link"
        className="flex items-center justify-center no-underline">
        <Logo size={size} />
      </Link>
    </div>
  )
}
