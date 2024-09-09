import { useSendVerificationCode } from '@/hooks/organisations/useSendVerificationCode'
import useTimeLeft from '@/hooks/organisations/useTimeleft'
import useValidateVerificationCode from '@/hooks/organisations/useValidateVerificationCode'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import NotReceived from './verificationForm/NotReceived'
import VerificationContent from './verificationForm/VerificationContent'

export default function VerificationForm() {
  const [inputError, setInputError] = useState<string | undefined>()

  const { timeLeft, setTimeLeft } = useTimeLeft()

  const { t } = useClientTranslation()

  const router = useRouter()

  const timeoutRef = useRef<NodeJS.Timeout>()

  const { updateLoginExpirationDate, user, updateUserOrganisation } = useUser()

  // Reset the login expiration date if the user is logged in
  // and the login expiration date is in the past
  useEffect(() => {
    if (user?.loginExpirationDate) {
      return
    }
    if (dayjs(user.loginExpirationDate).isBefore(dayjs())) {
      updateLoginExpirationDate(undefined)
    }
  }, [user?.loginExpirationDate, updateLoginExpirationDate])

  const {
    mutateAsync: validateVerificationCode,
    isPending: isPendingValidate,
    isSuccess: isSuccessValidate,
  } = useValidateVerificationCode({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const {
    mutateAsync: sendVerificationCode,
    isError: isErrorResend,
    isPending: isPendingResend,
  } = useSendVerificationCode(user?.organisation?.administratorEmail ?? '')

  async function handleValidateVerificationCode(verificationCode: string) {
    setInputError(undefined)

    if (
      isPendingValidate ||
      isSuccessValidate ||
      verificationCode.length !== 6
    ) {
      return
    }

    try {
      const organisation = await validateVerificationCode({
        verificationCode,
      })

      timeoutRef.current = setTimeout(() => {
        if (!organisation.name) {
          // Reset the login expiration date
          updateLoginExpirationDate(undefined)
          router.push('/organisations/creer')
          return
        }

        updateUserOrganisation({
          name: organisation.name,
          slug: organisation.slug,
        })

        router.push(`/organisations/${organisation?.slug}`)

        // Reset the login expiration date
        updateLoginExpirationDate(undefined)
      }, 1000)
    } catch (err) {
      setInputError(t('Le code est invalide'))
      return
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const isRetryButtonDisabled =
    isPendingValidate || isSuccessValidate || isPendingResend || timeLeft > 0

  return (
    <div className="rounded-xl bg-gray-100 p-4 md:p-8">
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
