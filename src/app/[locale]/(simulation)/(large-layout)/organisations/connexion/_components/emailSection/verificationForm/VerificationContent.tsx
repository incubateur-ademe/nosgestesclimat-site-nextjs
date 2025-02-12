import MailIcon from '@/components/icons/MailIcon'
import VerificationCodeInput from '@/components/organisations/VerificationCodeInput'
import Trans from '@/components/translation/Trans'

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
        <Trans locale={locale}>Vérifiez votre boîte e-mail !</Trans>
        <MailIcon className="fill-primary-700 h-8 w-8" />
      </h2>

      <p>
        <Trans locale={locale}>Nous avons envoyé un</Trans>{' '}
        <strong className="text-primary-700">
          <Trans locale={locale}>code de vérification</Trans>
        </strong>{' '}
        <Trans locale={locale}>à </Trans>
        {email}.{' '}
      </p>

      <form>
        <label htmlFor="code" className="mb-4 block font-bold">
          <Trans locale={locale}>
            Entrez votre code de vérification pour continuer
          </Trans>
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
