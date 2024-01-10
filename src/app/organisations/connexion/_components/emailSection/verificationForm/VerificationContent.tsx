import Trans from '@/components/translation/Trans'
import VerificationCodeInput from './VerificationCodeInput'

type Props = {
  ownerEmail: string
  inputError: string | undefined
  isSuccessValidate: boolean
  isPendingValidate: boolean
  handleValidateVerificationCode: (verificationCode: string) => Promise<void>
}

export default function VerificationContent({
  ownerEmail,
  inputError,
  isSuccessValidate,
  isPendingValidate,
  handleValidateVerificationCode,
}: Props) {
  return (
    <>
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
    </>
  )
}
