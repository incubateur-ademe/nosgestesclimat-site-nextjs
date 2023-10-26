'use client'
import Link from '@/components/Link'
import useAbTesting from '@/hooks/useAbTesting'
import { ButtonSize } from '@/types/values'
import { HtmlHTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { baseClassNames, colorClassNames, sizeClassNames } from './Button'

type Props = {
  href: string
  className?: string
  color?: 'primary' | 'secondary' | 'text'
  size?: ButtonSize
  title?: string
  onClick?: () => void
}

export default function ButtonLink({
  href,
  children,
  className = '',
  color = 'primary',
  size = 'md',
  title,
  onClick,
  ...props
}: PropsWithChildren<Props & HtmlHTMLAttributes<HTMLAnchorElement>>) {
  const abTests = useAbTesting()
  return (
    <Link
      href={href}
      onClick={onClick}
      title={title}
      className={twMerge(
        `${baseClassNames} ${sizeClassNames[size]} ${colorClassNames[color]}`,
        `${className} ${
          abTests.includes('changement-couleur-palette') ? 'bg-primaryNew' : ''
        }`
      )}
      {...props}>
      {children}
    </Link>
  )
}
