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
}

const TabLink = ({
  item,
  children,
  ...props
}: {
  item: TabItem
  children: ReactNode
} & React.HTMLAttributes<HTMLElement>) => {
  const baseClasses =
    'inline-block px-4 py-3 text-lg border-b-3 border-transparent'
  const activeClasses =
    'font-bold px-4 py-3 border-primary-600! border-current text-primary-600'

  const { id, label, href, isActive, className, ...otherProps } = item

  if (isActive) {
    return (
      <span
        aria-current="page"
        className={twMerge(baseClasses, activeClasses, className)}
        {...otherProps}
        {...props}>
        {children}
      </span>
    )
  }

  return (
    <Link
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
}: TabsProps) {
  const borderClasses = hideBorder ? '' : 'border-b-2 border-slate-200'

  return (
    <div className={twMerge(borderClasses, className)} id={containerId}>
      <nav aria-label={ariaLabel}>
        <ul className="flex items-end">
          {items.map(({ containerClassName, ...item }) => (
            <li
              key={item.id}
              className={twMerge('translate-y-0.5', containerClassName)}>
              <TabLink
                item={item}
                data-track-event={item.trackingData?.event}
                data-track-posthog={item.trackingData?.posthog}>
                {item.label}
              </TabLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
