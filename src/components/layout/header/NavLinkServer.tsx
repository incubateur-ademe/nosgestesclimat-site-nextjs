import DefaultLink from 'next/link'
import type { HTMLAttributes, JSX, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  href: string
  shouldUseDefaultLink?: boolean
  activeMatches?: string[]
  icon?: ({ className }: { className?: string }) => JSX.Element
  className?: string
  activeClassName?: string
}

export default function NavLinkServer({
  children,
  href,
  icon,
  activeMatches,
  className,
  activeClassName,
  ...props
}: PropsWithChildren<Props> & HTMLAttributes<HTMLAnchorElement>) {
  const Tag = DefaultLink

  const Icon = icon || (() => null)

  return (
    <Tag
      href={href}
      className={twMerge(
        'group text-default hover:text-primary-900 relative -mb-[1px] flex h-full items-center gap-2 px-3 text-sm no-underline transition-colors md:text-base',
        className
      )}
      {...props}>
      {icon && (
        <Icon
          className={twMerge(
            'group-hover:fill-primary-800 group-hover:stroke-primary-800! h-5 w-5'
          )}
        />
      )}

      {children}
    </Tag>
  )
}
