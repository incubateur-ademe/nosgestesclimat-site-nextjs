import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import Trans from '@/components/translation/Trans'
import Loader from '@/design-system/layout/Loader'
import { useLocale } from '@/hooks/useLocale'
import VerificationInput from 'react-verification-input'

type Props = {
  inputError: string | undefined
  isSuccessValidate: boolean
  isPendingValidate: boolean
  handleValidateVerificationCode: (verificationCode: string) => void
}

export default function VerificationCodeInput({
  inputError,
  isSuccessValidate,
  isPendingValidate,
  handleValidateVerificationCode,
}: Props) {
  const locale = useLocale()
  return (
    <>
      <VerificationInput
        length={6}
        classNames={{
          container: 'container w-[16rem] md:w-[20rem]',
          character: `border-2 border-gray-300 rounded-xl w-[2rem] text-transparent font-medium font-sans ${inputError ? 'border-red-700! border-2' : ''} ${
            isSuccessValidate ? 'border-green-700! border-2' : ''
          }`,
          characterInactive: 'text-transparent',
          characterSelected: 'character--selected',
          characterFilled: 'text-primary-700!',
        }}
        onChange={handleValidateVerificationCode}
      />

      {inputError && (
        <div>
          <p className="mt-2 text-sm text-red-700">
            <Trans locale={locale}>Le code est invalide</Trans>
          </p>
        </div>
      )}

      {isPendingValidate && (
        <div className="mt-2 flex items-baseline gap-2 pl-2 text-xs">
          <Loader color="dark" size="sm" />

          <span>
            <Trans locale={locale}>Nous vérifions votre code...</Trans>
          </span>
        </div>
      )}

      {isSuccessValidate && (
        <div className="mt-4 flex items-baseline gap-2 pl-2 text-sm">
          <CheckCircleIcon className="h-4 w-4 fill-green-700" />

          <span className="text-green-700">
            <Trans locale={locale}>Votre code est valide !</Trans>
          </span>
        </div>
      )}
    </>
  )
}
