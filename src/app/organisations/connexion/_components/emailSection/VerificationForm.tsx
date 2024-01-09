import useTimeLeft from '@/app/organisations/_hooks/useTimeleft'
import useValidateVerificationCode from '@/app/organisations/_hooks/useValidateVerificationCode'
import Trans from '@/components/translation/Trans'
import { SERVER_URL } from '@/constants/urls'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import VerificationCodeInput from './verificationForm/VerificationCodeInput'

export default function VerificationForm({
  ownerEmail,
}: {
  ownerEmail: string
}) {
  const [inputError, setInputError] = useState<string | undefined>()

  const { t } = useClientTranslation()

  const { timeLeft, setTimeLeft } = useTimeLeft()

  const router = useRouter()

  const timeoutRef = useRef<NodeJS.Timeout>()

  const { updateLoginExpirationDate } = useUser()

  const {
    mutateAsync: validateVerificationCode,
    isPending: isPendingValidate,
    isSuccess: isSuccessValidate,
  } = useValidateVerificationCode({
    ownerEmail,
  })

  const {
    mutateAsync: sendVerificationCode,
    isPending: isPendingResend,
    isSuccess: isSuccessResend,
  } = useMutation({
    mutationFn: () =>
      axios
        .post(`${SERVER_URL}/organizations/send-verification-code`, {
          ownerEmail,
        })
        .then((response) => response.data),
  })

  async function handleValidateVerificationCode(verificationCode: string) {
    setInputError(undefined)

    if (
      isPendingValidate ||
      isSuccessValidate ||
      verificationCode.length !== 6
    ) {
      return
    }

    try {
      const organization = await validateVerificationCode({
        verificationCode,
      })

      timeoutRef.current = setTimeout(() => {
        // Reset the login expiration date
        updateLoginExpirationDate(undefined)

        if (!organization.name) {
          router.push('/organisations/creation')
          return
        }

        router.push(`/organisations/mon-espace/${organization?.slug}`)
      }, 1000)
    } catch (err) {
      setInputError('Le code est invalide')
      return
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  async function handleResendVerificationCode() {
    if (
      isPendingValidate ||
      isSuccessValidate ||
      isPendingResend ||
      isSuccessResend ||
      timeLeft > 0
    ) {
      return
    }

    await sendVerificationCode()

    setTimeLeft(30)
  }

  const isRetryButtonDisabled =
    isPendingValidate || isSuccessValidate || isPendingResend || timeLeft > 0

  return (
    <div className="flex gap-8 rounded-lg bg-grey-100 p-8">
      <div className="w-24">
        <Image
          src="/images/organisations/envelop.svg"
          width="47"
          height="100"
          alt=""
        />
      </div>

      <div>
        <h2>
          <Trans>Vérifiez votre boîte e-mail !</Trans>
        </h2>

        <p>
          <Trans>Nous avons envoyé un</Trans>{' '}
          <strong className="text-primary-700">
            <Trans>code de vérification</Trans>
          </strong>{' '}
          <Trans>à </Trans>
          {ownerEmail} .{' '}
        </p>

        <form>
          <label htmlFor="code" className="mb-4 block font-bold">
            <Trans>Entrez votre code de vérification pour continuer</Trans>
          </label>

          <VerificationCodeInput
            inputError={inputError}
            isSuccessValidate={isSuccessValidate}
            isPendingValidate={isPendingValidate}
            handleValidateVerificationCode={handleValidateVerificationCode}
          />
        </form>

        {!isSuccessValidate && (
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
              {isRetryButtonDisabled && <Emoji>🔒</Emoji>}{' '}
              <Trans>Renvoyer le code</Trans>
            </button>

            {timeLeft > 0 && !isPendingValidate && !isSuccessValidate && (
              <p className="mt-2 text-sm text-gray-600">
                <Trans>Veuillez attendre</Trans> {timeLeft}{' '}
                <Trans>
                  secondes avant de pouvoir recevoir un nouveau code
                </Trans>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
