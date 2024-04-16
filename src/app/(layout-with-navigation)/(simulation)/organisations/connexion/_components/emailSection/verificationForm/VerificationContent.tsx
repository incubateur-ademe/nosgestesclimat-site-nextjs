import Image from 'next/image'
import VerificationCodeInput from './VerificationCodeInput'

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
      <h2>
        <NGCTrans>Vérifiez votre boîte e-mail !</NGCTrans>
        <Image
          src="/images/organisations/envelop.svg"
          width="24"
          height="100"
          alt=""
          className="ml-2 inline-block align-baseline md:hidden"
        />
      </h2>

      <p>
        <NGCTrans>Nous avons envoyé un</NGCTrans>{' '}
        <strong className="text-primary-700">
          <NGCTrans>code de vérification</NGCTrans>
        </strong>{' '}
        <NGCTrans>à </NGCTrans>
        {email} .{' '}
      </p>

      <form>
        <label htmlFor="code" className="mb-4 block font-bold">
          <NGCTrans>Entrez votre code de vérification pour continuer</NGCTrans>
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
