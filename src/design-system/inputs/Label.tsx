import TransClient from '@/components/translation/trans/TransClient'
import type { PropsWithChildren } from 'react'

export default function Label({
  children,
  isOptional,
}: PropsWithChildren<{ isOptional?: boolean }>) {
  return (
    <div className="flex justify-between">
      <span>{children}</span>{' '}
      {isOptional && (
        <span className="italic text-secondary-700">
          <TransClient>facultatif</TransClient>
        </span>
      )}
    </div>
  )
}
