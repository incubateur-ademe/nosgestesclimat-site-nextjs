import Trans from '@/components/translation/Trans'
import { SERVER_URL } from '@/constants/urls'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

export default function VerificationForm({
  ownerEmail,
}: {
  ownerEmail: string
}) {
  const [inputError, setInputError] = useState<string | undefined>()

  const {
    mutateAsync: validateVerificationCode,
    isPending: isPendingValidate,
    isSuccess: isSuccessValidate,
  } = useMutation({
    mutationFn: ({ verificationCode }: { verificationCode: string }) =>
      axios
        .post(`${SERVER_URL}/organizations/validate-verification-code`, {
          ownerEmail,
          verificationCode,
        })
        .then((response) => response.data),
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

  async function handleValidateVerificationCode(
    event: React.FormEvent<HTMLInputElement>
  ) {
    const verificationCode = event.currentTarget.value

    if (isPendingValidate || isSuccessValidate) {
      return
    }

    if (verificationCode.length !== 6) {
      setInputError('Le code doit contenir 6 chiffres')
      return
    }

    await validateVerificationCode({
      verificationCode,
    })
  }

  async function handleResendVerificationCode() {
    if (
      isPendingValidate ||
      isSuccessValidate ||
      isPendingResend ||
      isSuccessResend
    ) {
      return
    }

    await sendVerificationCode()
  }

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
          <TextInputGroup
            name="code"
            label={
              <Trans>Entrez votre code de vérification pour continuer</Trans>
            }
            aria-disabled={isPendingValidate || isSuccessValidate}
            className="bg-white text-2xl font-bold"
            maxLength={6}
            onChange={handleValidateVerificationCode}
            error={inputError}
          />

          {isPendingValidate && (
            <div className="mt-2 flex items-baseline gap-2 pl-2 text-xs">
              <Loader color="dark" size="sm" />

              <span>
                <Trans>Nous vérifions votre code...</Trans>
              </span>
            </div>
          )}

          {isSuccessValidate && (
            <div className="mt-2 flex items-baseline gap-2 pl-2 text-xs">
              <Emoji>✅</Emoji>

              <span className="text-green-700">
                <Trans>Votre code est valide !</Trans>
              </span>
            </div>
          )}
        </form>

        <p className="mt-12">
          <Trans>Vous n'avez pas reçu d'e-mail ?</Trans>
        </p>

        <button
          aria-disabled={
            isPendingValidate ||
            isSuccessValidate ||
            isPendingResend ||
            isSuccessResend
          }
          onClick={handleResendVerificationCode}
          className="text-primary-700 underline">
          <Trans>Renvoyer le code</Trans>
        </button>
      </div>
    </div>
  )
}
