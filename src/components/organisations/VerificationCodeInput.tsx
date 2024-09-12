import { marianne } from '@/app/layout'
import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import Trans from '@/components/translation/Trans'
import Loader from '@/design-system/layout/Loader'
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
  return (
    <>
      <VerificationInput
        length={6}
        classNames={{
          container: 'container w-[16rem] md:w-[20rem]',
          character: `border-2 border-gray-300 rounded-xl w-[2rem] text-transparent font-medium ${
            marianne.className
          } ${inputError ? '!border-red-700 border-2' : ''} ${
            isSuccessValidate ? '!border-green-700 border-2' : ''
          }`,
          characterInactive: 'text-transparent',
          characterSelected: 'character--selected',
          characterFilled: '!text-primary-700',
        }}
        onChange={handleValidateVerificationCode}
      />

      {inputError && (
        <div>
          <p className="mt-2 text-sm text-red-700">
            <Trans>Le code est invalide</Trans>
          </p>
        </div>
      )}

      {isPendingValidate && (
        <div className="mt-2 flex items-baseline gap-2 pl-2 text-xs">
          <Loader color="dark" size="sm" />

          <span>
            <Trans>Nous vérifions votre code...</Trans>
          </span>
        </div>
      )}

      {isSuccessValidate && (
        <div className="mt-4 flex items-baseline gap-2 pl-2 text-sm">
          <CheckCircleIcon className="h-4 w-4 fill-green-700" />

          <span className="text-green-700">
            <Trans>Votre code est valide !</Trans>
          </span>
        </div>
      )}
    </>
  )
}
