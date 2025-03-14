import useFetchOrganisations from '@/hooks/organisations/useFetchOrganisations'
import useTimeLeft from '@/hooks/organisations/useTimeleft'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCreateVerificationCode } from '@/hooks/verification-codes/useCreateVerificationCode'
import { useUser } from '@/publicodes-state'
import { captureException } from '@sentry/nextjs'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import NotReceived from './verificationForm/NotReceived'
import VerificationContent from './verificationForm/VerificationContent'

export default function VerificationForm({
  login,
  isPendingValidate,
  isSuccessValidate,
}: {
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
}) {
  const { updateLoginExpirationDate, user, updateUserOrganisation } = useUser()

  const [email, setEmail] = useState<string | undefined>(
    user.organisation?.administratorEmail
  )

  const [inputError, setInputError] = useState<string | undefined>()

  const { timeLeft, setTimeLeft } = useTimeLeft()

  const { t } = useClientTranslation()

  const router = useRouter()

  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  // Reset the login expiration date if the user is logged in
  // and the login expiration date is in the past
  useEffect(() => {
    if (user.loginExpirationDate) {
      return
    }
    if (dayjs(user.loginExpirationDate).isBefore(dayjs())) {
      updateLoginExpirationDate(undefined)
    }
  }, [user.loginExpirationDate, updateLoginExpirationDate])

  const {
    mutateAsync: createVerificationCode,
    isError: isErrorResend,
    isPending: isPendingResend,
  } = useCreateVerificationCode()

  const { refetch: fetchOrganisations } = useFetchOrganisations({
    enabled: false,
  })

  function sendVerificationCode(email: string) {
    setEmail(email)

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
      await login({
        email,
        code,
      })

      const { data: organisations } = await fetchOrganisations()

      // I don´t understand why refetch returns undefined
      const [organisation] = organisations!

      timeoutRef.current = setTimeout(() => {
        if (!organisation) {
          // Reset the login expiration date
          updateLoginExpirationDate(undefined)
          router.push('/organisations/creer')
          return
        }

        updateUserOrganisation({
          name: organisation.name,
          slug: organisation.slug,
        })

        router.push(`/organisations/${organisation.slug}`)

        // Reset the login expiration date
        updateLoginExpirationDate(undefined)
      }, 1000)
    } catch (err) {
      setInputError(t('Le code est invalide'))
      captureException(err)
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
