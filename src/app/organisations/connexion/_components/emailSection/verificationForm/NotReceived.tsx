'use client'

import Trans from '@/components/translation/Trans'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import React from 'react'

type Props = {
  isRetryButtonDisabled: boolean
  isPendingValidate: boolean
  isSuccessResend: boolean
  sendVerificationCode: () => Promise<void>
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>
  timeLeft: number
}

export default function NotReceived({
  isRetryButtonDisabled,
  isPendingValidate,
  isSuccessResend,
  sendVerificationCode,
  setTimeLeft,
  timeLeft,
}: Props) {
  const { t } = useClientTranslation()

  async function handleResendVerificationCode() {
    if (isRetryButtonDisabled) {
      return
    }

    await sendVerificationCode()

    setTimeLeft(30)
  }
  return (
    <>
      <p className="mt-12">
        <Trans>Vous n'avez pas reçu d'e-mail ?</Trans>
      </p>

      <button
        aria-disabled={isRetryButtonDisabled}
        aria-label={
          isRetryButtonDisabled
            ? t('Renvoyer le code, désactivé pendant 30 secondes')
            : ''
        }
        onClick={handleResendVerificationCode}
        className="text-primary-700 underline">
        {isRetryButtonDisabled && <Emoji>🔒</Emoji>}
        {isPendingValidate && <Emoji>⏳</Emoji>}
        {isSuccessResend && <Emoji>✅</Emoji>}&nbsp;
        <Trans>Renvoyer le code</Trans>
      </button>

      {timeLeft > 0 && (
        <p className="mt-2 text-sm text-gray-600">
          <Trans>Veuillez attendre</Trans> {timeLeft}{' '}
          <Trans>secondes avant de pouvoir recevoir un nouveau code</Trans>
        </p>
      )}
    </>
  )
}
