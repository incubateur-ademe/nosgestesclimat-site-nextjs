'use client'

import Trans from '@/components/translation/trans/TransClient'
import { twMerge } from 'tailwind-merge'
import type { ButtonColor } from '../buttons/Button'
import Button from '../buttons/Button'

interface Props {
  children: React.ReactNode
  buttonLabel?: React.ReactNode
  buttonColor?: ButtonColor
  error?: string
  onSubmit?: () => void
  className?: string
  isVerticalLayout?: boolean
}

export default function Form({
  children,
  buttonLabel,
  buttonColor,
  error,
  className,
  isVerticalLayout = true,
  ...props
}: Props) {
  const errorId = 'form-error'

  return (
    <form className={className} {...props}>
      <div className="flex items-start gap-4">
        {children}

        {!isVerticalLayout && (
          <Button
            className="mt-8 hidden h-14 md:block"
            type="submit"
            data-testid="button-submit-horizontal"
            color={buttonColor}>
            {buttonLabel ?? <Trans>Enregistrer</Trans>}
          </Button>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          className="my-4 text-sm text-red-500"
          role="alert"
          aria-live="assertive">
          {error}
        </p>
      )}

      <Button
        className={twMerge(
          'mt-8',
          isVerticalLayout ? 'block' : 'block md:hidden'
        )}
        type="submit"
        data-testid="button-submit"
        color={buttonColor}>
        {buttonLabel ?? <Trans>Enregistrer</Trans>}
      </Button>
    </form>
  )
}
