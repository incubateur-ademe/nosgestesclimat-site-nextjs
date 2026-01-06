import { useCreateVerificationCode } from '@/hooks/authentication/useCreateVerificationCode'
import { type PendingVerification } from '@/hooks/authentication/usePendingVerification'
import useTimeLeft from '@/hooks/organisations/useTimeleft'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { UseMutationResult } from '@tanstack/react-query'
import { useCallback } from 'react'
import NotReceived from './NotReceived'
import VerificationContent from './VerificationContent'

interface Props<T extends object> {
  email: string
  onRegisterNewVerification: (newVerification: PendingVerification) => void
  onVerificationCompleted: () => void
  mutationPayload?: T
  verificationMutation: UseMutationResult<
    unknown,
    Error,
    Partial<{ email: string; code: string }> & T
  >
}

const NUM_SECONDS = 30

export default function VerificationForm<T extends object>({
  email,
  onVerificationCompleted,
  onRegisterNewVerification,
  mutationPayload: mutateProps,
  verificationMutation,
}: Props<T>) {
  const { timeLeft, setTimeLeft } = useTimeLeft(NUM_SECONDS)

  const { t } = useClientTranslation()

  const {
    createVerificationCode,
    // @TODO : handle error when asking for a new verification code
    createVerificationCodePending,
  } = useCreateVerificationCode({
    onComplete: (pendingVerification) => {
      onRegisterNewVerification(pendingVerification)
      setTimeLeft(NUM_SECONDS)
    },
  })
  const { isSuccess, isPending, error, mutateAsync } = verificationMutation

  const isValidationDisabled =
    isPending || isSuccess || createVerificationCodePending
  const isRetryButtonDisabled = isValidationDisabled || timeLeft > 0

  const handleValidateVerificationCode = useCallback(
    async (code: string) => {
      if (isValidationDisabled) {
        return
      }
      const payload = {
        email,
        code,
        ...mutateProps,
      } as { email: string; code: string } & T

      await mutateAsync(payload)

      onVerificationCompleted?.()
    },
    [
      isValidationDisabled,
      mutateAsync,
      email,
      mutateProps,
      onVerificationCompleted,
    ]
  )

  return (
    <div>
      <VerificationContent
        email={email}
        inputError={(error && t('Le code est invalide')) ?? undefined}
        isSuccessValidate={isSuccess}
        isPendingValidate={isPending}
        handleValidateVerificationCode={handleValidateVerificationCode}
      />

      {!isSuccess && (
        <NotReceived
          isRetryButtonDisabled={isRetryButtonDisabled}
          isErrorResend={!!error}
          onResendVerificationCode={() => createVerificationCode(email)}
          timeLeft={timeLeft}
        />
      )}
    </div>
  )
}
