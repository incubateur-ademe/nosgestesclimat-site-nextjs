'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '../buttons/Button'

interface Props {
  children: React.ReactNode
  buttonLabel?: React.ReactNode
  error?: string
  onSubmit?: () => void
  className?: string
  additionnalButton?: React.ReactNode
}

export default function Form({
  children,
  buttonLabel,
  error,
  className,
  additionnalButton,
  ...props
}: Props) {
  const errorId = 'form-error'

  return (
    <form className={className} {...props}>
      {children}

      {error && (
        <p
          id={errorId}
          className="my-4 text-sm text-red-500"
          role="alert"
          aria-live="assertive">
          {error}
        </p>
      )}

      <div className="mt-8 flex gap-4 pb-8">
        <Button type="submit" data-testid="button-submit">
          {buttonLabel ?? <Trans>Enregistrer</Trans>}
        </Button>
        {additionnalButton}
      </div>
    </form>
  )
}
