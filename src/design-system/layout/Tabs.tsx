import Link from 'next/link'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface TabItem {
  id: string
  label: ReactNode
  href: string
  isActive?: boolean
  className?: string // Classes Tailwind pour l'onglet individuel
  [key: string]: any // Pour permettre d'autres props comme onClick, trackingData, etc.
}

interface TabsProps {
  items: TabItem[]
  className?: string
  ariaLabel?: string
  containerId?: string
  hideBorder?: boolean
  isLocked?: boolean
}

const TabLink = ({
  item,
  children,
  isLocked,
  ...props
}: {
  item: TabItem
  children: ReactNode
  isLocked?: boolean
} & React.HTMLAttributes<HTMLElement>) => {
  const baseClasses =
    'inline-block w-full md:w-auto px-1 md:px-4 py-3 text-lg border-b-3 border-transparent'
  const activeClasses =
    'font-bold px-1 md:px-4 py-3 border-primary-600! border-current text-primary-600'

  const { id, label, href, isActive, className, ...otherProps } = item

  if (isLocked) {
    return (
      <span
        className={twMerge(
          baseClasses,
          isActive ? activeClasses : '',
          className
        )}
        {...otherProps}
        {...props}>
        {children}
      </span>
    )
  }

  if (isActive) {
    return (
      <span
        role="tab"
        aria-current="page"
        aria-selected
        className={twMerge(baseClasses, activeClasses, className)}
        {...otherProps}
        {...props}>
        {children}
      </span>
    )
  }

  return (
    <Link
      role="tab"
      href={href}
      className={twMerge(baseClasses, className)}
      prefetch={false}
      {...otherProps}
      {...props}>
      {children}
    </Link>
  )
}

export default function Tabs({
  items,
  className,
  ariaLabel = 'Navigation par onglets',
  containerId,
  hideBorder = false,
  isLocked = false,
}: TabsProps) {
  const borderClasses = hideBorder ? '' : 'border-b-2 border-slate-200'

  return (
    <div className={twMerge(borderClasses, className)} id={containerId}>
      <nav aria-label={ariaLabel}>
        <ul
          role={isLocked ? undefined : 'tablist'}
          className="flex items-end justify-between md:justify-start">
          {items.map(({ containerClassName, ...item }) => (
            <li
              key={item.id}
              className={twMerge(
                'flex-1 translate-y-0.5 md:flex-none',
                containerClassName
              )}>
              <TabLink item={item} isLocked={isLocked}>
                {item.label}
              </TabLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
