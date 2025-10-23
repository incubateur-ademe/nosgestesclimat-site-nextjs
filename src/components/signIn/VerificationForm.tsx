import { SIGNUP_MODE } from '@/constants/authentication/modes'
import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import useFetchOrganisations from '@/hooks/organisations/useFetchOrganisations'
import useTimeLeft from '@/hooks/organisations/useTimeleft'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCreateVerificationCode } from '@/hooks/verification-codes/useCreateVerificationCode'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import { captureException } from '@sentry/nextjs'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import NotReceived from './verificationForm/NotReceived'
import VerificationContent from './verificationForm/VerificationContent'

type Props = {
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
}

export default function VerificationForm({
  login,
  isPendingValidate,
  isSuccessValidate,
  redirectURL,
  mode,
}: Props) {
  const { updateVerificationCodeExpirationDate, user, updateUserOrganisation } =
    useUser()

  const [email, setEmail] = useState<string | undefined>(
    user.organisation?.administratorEmail
  )

  const [inputError, setInputError] = useState<string | undefined>()

  const { timeLeft, setTimeLeft } = useTimeLeft()

  const { t } = useClientTranslation()

  const router = useRouter()

  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  // Reset the verification code expiration date if the user is logged in
  // and the verification code expiration date is in the past
  useEffect(() => {
    if (user.verificationCodeExpirationDate) {
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

      // We want to bypass the organisation creation process if a redirect URL is provided
      if (redirectURL) {
        router.push(
          `${redirectURL}${mode === SIGNUP_MODE ? `?${SHOW_WELCOME_BANNER_QUERY_PARAM}=true` : ''}`
        )
        return
      }

      // Otherwise, we fetch the organisations
      const { data: organisations } = await fetchOrganisations()

      // I don´t understand why refetch returns undefined
      const [organisation] = organisations!

      timeoutRef.current = setTimeout(() => {
        if (!organisation) {
          // Reset the verification code expiration date
          updateVerificationCodeExpirationDate(undefined)
          router.push('/organisations/creer')
          return
        }

        updateUserOrganisation({
          name: organisation.name,
          slug: organisation.slug,
        })

        router.push(`/organisations/${organisation.slug}`)

        // Reset the verification code expiration date
        updateVerificationCodeExpirationDate(undefined)
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
