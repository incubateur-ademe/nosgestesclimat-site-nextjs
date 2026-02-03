'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '../buttons/Button'

interface Props {
  children: React.ReactNode
  buttonLabel?: React.ReactNode
  error?: string
  onSubmit?: () => void
  className?: string
}

export default function Form({
  children,
  buttonLabel,
  error,
  className,
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

      <Button className="mt-8" type="submit" data-testid="button-submit">
        {buttonLabel ?? <Trans>Enregistrer</Trans>}
      </Button>
    </form>
  )
}
