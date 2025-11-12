import { SIGNUP_MODE } from '@/constants/authentication/modes'
import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import { reconcileOnAuth } from '@/helpers/user/reconcileOnAuth'
import useTimeLeft from '@/hooks/organisations/useTimeleft'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { usePostVerificationCode } from '@/hooks/verification-codes/useCreateVerificationCode'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import { captureException } from '@sentry/nextjs'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import NotReceived from './NotReceived'
import VerificationContent from './VerificationContent'

type Props = {
  email: string
  login: UseMutateAsyncFunction<
    any,
    Error,
    {
      email: string
      code: string
    },
    unknown
  >
  isPendingValidate: boolean
  isSuccessValidate: boolean
  redirectURL?: string
  mode?: AuthenticationMode
  onComplete?: (email: string) => void
}

export default function VerificationForm({
  email,
  login,
  isPendingValidate,
  isSuccessValidate,
  redirectURL,
  mode,
  onComplete,
}: Props) {
  const { updateVerificationCodeExpirationDate, user, updateEmail } = useUser()

  const [inputError, setInputError] = useState<string | undefined>()

  const { timeLeft, setTimeLeft } = useTimeLeft()

  const { t } = useClientTranslation()

  const router = useRouter()

  // Reset the verification code expiration date if the user is logged in
  // and the verification code expiration date is in the past
  useEffect(() => {
    if (!user.verificationCodeExpirationDate) {
      return
    }
    if (dayjs(user.verificationCodeExpirationDate).isBefore(dayjs())) {
      updateVerificationCodeExpirationDate(undefined)
    }
  }, [
    user.verificationCodeExpirationDate,
    updateVerificationCodeExpirationDate,
  ])

  const {
    mutateAsync: createVerificationCode,
    isError: isErrorResend,
    isPending: isPendingResend,
  } = usePostVerificationCode()

  function sendVerificationCode(email: string) {
    return createVerificationCode({
      email,
      userId: user.userId,
    })
  }

  async function handleValidateVerificationCode(code: string) {
    setInputError(undefined)

    if (isPendingValidate || isSuccessValidate || !email || code.length !== 6) {
      return
    }

    try {
      const loginResponse = await login({
        email,
        code,
      })

      updateEmail(email)
      updateVerificationCodeExpirationDate(undefined)

      onComplete?.(email)

      // We want to bypass the organisation creation process if a redirect URL is provided
      if (redirectURL) {
        try {
          const serverUserId =
            (loginResponse && (loginResponse as any).id) || user.userId
          await reconcileOnAuth({
            serverUserId,
          })
        } catch (e) {
          // Best-effort reconciliation; ignore errors here
        }
        router.push(
          `${redirectURL}${mode === SIGNUP_MODE ? `?${SHOW_WELCOME_BANNER_QUERY_PARAM}=true` : ''}`
        )
        return
      }
    } catch (err) {
      setInputError(t('Le code est invalide'))
      captureException(err)
      return
    } finally {
      updateVerificationCodeExpirationDate(undefined)
    }
  }

  const isRetryButtonDisabled =
    isPendingValidate || isSuccessValidate || isPendingResend || timeLeft > 0

  return (
    <div className="mb-8 rounded-xl bg-[#F0F8FF] p-4 md:p-8">
      <div>
        <VerificationContent
          email={user?.organisation?.administratorEmail ?? ''}
          inputError={inputError}
          isSuccessValidate={isSuccessValidate}
          isPendingValidate={isPendingValidate}
          handleValidateVerificationCode={handleValidateVerificationCode}
        />

        {!isSuccessValidate && (
          <NotReceived
            isRetryButtonDisabled={isRetryButtonDisabled}
            isErrorResend={isErrorResend}
            sendVerificationCode={sendVerificationCode}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
          />
        )}
      </div>
    </div>
  )
}
