'use client'

import Trans from '@/components/translation/trans/TransClient'
import { type ReactNode, createElement } from 'react'

type AlertType = 'default' | 'success' | 'warning' | 'error'

const getTypeClassNames = (type: AlertType) => {
  switch (type) {
    case 'default':
      return ''
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
  return (
    <section className="relative rounded-xl border-2 p-6">
      {onClose && (
        <button onClick={onClose}>
          <span className="not-sr-only">x</span>
          <span className="sr-only">
            <Trans>Fermer</Trans>
          </span>
        </button>
      )}

      {createElement(titleTag ?? 'h2', { className: 'mb-4' }, title)}
      <p className="mb-0">{description}</p>
    </section>
  )
}
