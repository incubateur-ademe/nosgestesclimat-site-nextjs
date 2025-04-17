'use client'

import CloseIcon from '@/components/icons/Close'
import Trans from '@/components/translation/trans/TransClient'
import { type ReactNode, createElement } from 'react'
import { twMerge } from 'tailwind-merge'

type AlertType = 'default' | 'success' | 'warning' | 'error'

const getTypeClassNames = (type: AlertType) => {
  switch (type) {
    case 'default':
      return 'border-blue-200 bg-blue-100'
    case 'success':
      return 'border-green-200 bg-green-100'
    case 'warning':
      return 'border-orange-200 bg-orange-100'
    case 'error':
      return 'border-red-200 bg-red-100'
  }
}

export default function Alert({
  title,
  titleTag,
  description,
  onClose,
  type = 'default',
}: {
  title: ReactNode | string
  titleTag?: string
  description: ReactNode | string
  onClose?: () => void
  type?: AlertType
}) {
  const onCloseClassName = onClose ? 'pr-14' : ''

  return (
    <section
      className={twMerge(
        'relative rounded-xl border-2 p-6',
        getTypeClassNames(type),
        onCloseClassName
      )}>
      {onClose && (
        <button className="absolute top-3 right-4" onClick={onClose}>
          <span className="not-sr-only">
            <CloseIcon className="w-6" />
          </span>
          <span className="sr-only">
            <Trans>Fermer</Trans>
          </span>
        </button>
      )}

      {createElement(
        titleTag ?? 'h2',
        { className: 'mb-3 text-sm font-bold' },
        title
      )}
      <p className="mb-0 text-sm">{description}</p>
    </section>
  )
}
