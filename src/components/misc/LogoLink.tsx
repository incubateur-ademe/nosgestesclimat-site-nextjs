'use client'

import { twMerge } from 'tailwind-merge'
import Link from '../Link'
import Logo from './Logo'

interface Props {
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md'
}
export default function LogoLink({
  onClick = () => null,
  className,
  size = 'md',
}: Props) {
  return (
    <div className={twMerge('flex items-center', className)}>
      <Link
        href="/"
        onClick={onClick}
        data-testid="home-logo-link"
        className="flex items-center justify-center no-underline">
        <Logo size={size} />
      </Link>
    </div>
  )
}
