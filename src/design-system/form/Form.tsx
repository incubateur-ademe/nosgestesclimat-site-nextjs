'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Button from '../inputs/Button'

type Props = {
  children: React.ReactNode
  buttonLabel?: string
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
  return (
    <form className={className} {...props}>
      {children}

      {error && <p className="my-4 text-sm text-red-500">{error}</p>}

      <Button className="mt-8" type="submit">
        {buttonLabel ?? <TransClient>Enregistrer</TransClient>}
      </Button>
    </form>
  )
}
