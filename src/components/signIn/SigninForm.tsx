'use client'

import Button from '@/design-system/buttons/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import Trans from '../translation/trans/TransClient'

type Props = {
  buttonLabel?: string
}

export default function SigninForm({ buttonLabel }: Props) {
  return (
    <form>
      <EmailInput
        label={<Trans i18nKey="login.emailInput.label">Adresse e-mail</Trans>}
      />

      <Button type="submit" className="mt-7">
        {buttonLabel ?? (
          <Trans i18nKey="login.emailInput.button.label">
            Accéder à mon espace
          </Trans>
        )}
      </Button>
    </form>
  )
}
