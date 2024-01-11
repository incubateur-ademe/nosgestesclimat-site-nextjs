import Trans from '@/components/translation/Trans'
import { PropsWithChildren } from 'react'

export default function Label({
  children,
  isOptional,
}: PropsWithChildren<{ isOptional?: boolean }>) {
  return (
    <div className="flex justify-between">
      <span>{children}</span>{' '}
      {isOptional && (
        <span className="italic text-secondary">
          <Trans>facultatif</Trans>
        </span>
      )}
    </div>
  )
}
