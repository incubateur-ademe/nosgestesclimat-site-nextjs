import { useCreateVerificationCode } from '@/hooks/authentication/useCreateVerificationCode'
import useLogin from '@/hooks/authentication/useLogin'
import type { PendingVerification } from '@/hooks/authentication/usePendingVerification'
import useTimeLeft from '@/hooks/organisations/useTimeleft'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCallback } from 'react'
import NotReceived from './NotReceived'
import VerificationContent from './VerificationContent'

type Props = {
  pendingVerification: PendingVerification
  onRegisterNewVerification: (newVerification: PendingVerification) => void
  onVerificationCompleted: () => void
  onVerificationReset: () => void
}

const NUM_SECONDS = 30

export default function VerificationForm({
  pendingVerification,
  onRegisterNewVerification: onRegisterNew,
  onVerificationCompleted,
  onVerificationReset,
}: Props) {
  const { timeLeft, setTimeLeft } = useTimeLeft(NUM_SECONDS)

  const { t } = useClientTranslation()

  const {
    createVerificationCode,
    // @TODO : handle error when asking for a new verification code
    createVerificationCodeError,
    createVerificationCodePending,
  } = useCreateVerificationCode({
    onComplete: (verification) => {
      onRegisterNew(verification)
      setTimeLeft(NUM_SECONDS)
    },
  })
  const { isSuccess, isPending, error, mutateAsync: login } = useLogin()

  const isValidationDisabled =
    isPending || isSuccess || createVerificationCodePending
  const isRetryButtonDisabled = isValidationDisabled || timeLeft > 0

  const handleValidateVerificationCode = useCallback(
    async (code: string) => {
      if (isValidationDisabled) {
        return
      }
      await login({
        email: pendingVerification.email,
        code,
      })
      onVerificationCompleted?.()
    },
    [
      pendingVerification.email,
      isValidationDisabled,
      onVerificationCompleted,
      login,
    ]
  )

  return (
    <div className="mb-8 rounded-xl bg-[#F0F8FF] p-4 md:p-8">
      <div>
        <VerificationContent
          email={pendingVerification.email}
          inputError={(error && t('Le code est invalide')) ?? undefined}
          isSuccessValidate={isSuccess}
          isPendingValidate={isPending}
          handleValidateVerificationCode={handleValidateVerificationCode}
        />

        {!isSuccess && (
          <NotReceived
            isRetryButtonDisabled={isRetryButtonDisabled}
            isErrorResend={!!error}
            onResendVerificationCode={() =>
              createVerificationCode(pendingVerification.email)
            }
            onReset={onVerificationReset}
            timeLeft={timeLeft}
          />
        )}
      </div>
    </div>
  )
}
