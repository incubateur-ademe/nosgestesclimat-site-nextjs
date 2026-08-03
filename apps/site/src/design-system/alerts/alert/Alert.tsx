'use client'

import {
  Alert as AlertPrimitive,
  AlertAction,
  AlertDescription,
} from '@/components/ui/alert'
import CloseIcon from '@/components/icons/Close'
import Trans from '@/components/translation/trans/TransClient'
import { type ReactNode, createElement } from 'react'
import { cn } from '@/lib/utils'

export type AlertType = 'default' | 'success' | 'warning' | 'error'

export default function Alert({
  id,
  title,
  titleTag,
  description,
  onClose,
  type = 'default',
  className,
  ...otherProps
}: {
  id?: string
  title?: ReactNode | string
  titleTag?: string
  description: ReactNode | string
  onClose?: () => void
  type?: AlertType
  className?: string
}) {
  const onCloseClassName = onClose ? 'pr-14' : ''

  return (
    <AlertPrimitive
      id={id}
      variant={type}
      className={cn(
        'relative rounded-xl border-2 p-4 md:p-6',
        onCloseClassName,
        className
      )}
      {...otherProps}>
      {title &&
        createElement(
          titleTag ?? 'h2',
          { className: 'mb-3 text-sm font-bold' },
          title
        )}

      <AlertDescription className="mb-0 text-sm text-inherit">
        {description}
      </AlertDescription>

      {onClose && (
        <AlertAction className="top-3 right-4">
          <button
            data-testid="alert-close"
            className="cursor-pointer"
            onClick={onClose}>
            <span className="not-sr-only">
              <CloseIcon className="w-6" />
            </span>
            <span className="sr-only">
              <Trans>Fermer</Trans>
            </span>
          </button>
        </AlertAction>
      )}
    </AlertPrimitive>
  )
}
