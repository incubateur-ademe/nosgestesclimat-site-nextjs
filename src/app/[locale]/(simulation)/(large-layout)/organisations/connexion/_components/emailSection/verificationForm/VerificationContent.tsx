'use client'

import MailIcon from '@/components/icons/MailIcon'
import VerificationCodeInput from '@/components/organisations/VerificationCodeInput'
import TransClient from '@/components/translation/trans/TransClient'

type Props = {
  email: string
  inputError: string | undefined
  isSuccessValidate: boolean
  isPendingValidate: boolean
  handleValidateVerificationCode: (verificationCode: string) => Promise<void>
}

export default function VerificationContent({
  email,
  inputError,
  isSuccessValidate,
  isPendingValidate,
  handleValidateVerificationCode,
}: Props) {
  return (
    <>
      <h2 className="flex items-center gap-2">
        <TransClient>Vérifiez votre boîte e-mail !</TransClient>
        <MailIcon className="fill-primary-700 h-8 w-8" />
      </h2>

      <p>
        <TransClient>Nous avons envoyé un</TransClient>{' '}
        <strong className="text-primary-700">
          <TransClient>code de vérification</TransClient>
        </strong>{' '}
        <TransClient>à </TransClient>
        {email}.{' '}
      </p>

      <form>
        <label htmlFor="code" className="mb-4 block font-bold">
          <TransClient>
            Entrez votre code de vérification pour continuer
          </TransClient>
        </label>

        <VerificationCodeInput
          inputError={inputError}
          isSuccessValidate={isSuccessValidate}
          isPendingValidate={isPendingValidate}
          handleValidateVerificationCode={handleValidateVerificationCode}
        />
      </form>
    </>
  )
}
