import useTimeLeft from '@/app/(layout-with-navigation)/(simulation)/organisations/_hooks/useTimeleft'
import useValidateVerificationCode from '@/app/(layout-with-navigation)/(simulation)/organisations/_hooks/useValidateVerificationCode'
import Trans from '@/components/translation/Trans'
import { SERVER_URL } from '@/constants/urls'
import Button from '@/design-system/inputs/Button'
import { useUser } from '@/publicodes-state'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import NotReceived from './verificationForm/NotReceived'
import VerificationContent from './verificationForm/VerificationContent'

export default function VerificationForm() {
  const [inputError, setInputError] = useState<string | undefined>()

  const { timeLeft, setTimeLeft } = useTimeLeft()

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
    isPending: isPendingResend,
    isError: isErrorResend,
  } = useMutation({
    mutationFn: () =>
      axios
        .post(`${SERVER_URL}/organisations/send-verification-code`, {
          email: user?.organisation?.administratorEmail ?? '',
        })
        .then((response) => response.data),
  })

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
        // Reset the login expiration date
        updateLoginExpirationDate(undefined)

        if (!organisation.name) {
          router.push('/organisations/creation')
          return
        }

        updateUserOrganisation({
          name: organisation.name,
          slug: organisation.slug,
        })

        router.push(`/organisations/${organisation?.slug}`)
      }, 1000)
    } catch (err) {
      setInputError('Le code est invalide')
      return
    }
  }

  function handleGoBackToForm() {
    // Reset the login expiration date
    updateLoginExpirationDate(undefined)

    router.push('/organisations/connexion')
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
    <div className="flex gap-8 rounded-lg bg-grey-100 p-4 md:p-8">
      <div className="hidden w-12 md:block md:w-24">
        <Image
          src="/images/organisations/envelop.svg"
          width="47"
          height="100"
          alt=""
        />
      </div>

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

        {!isSuccessValidate && (
          <Button
            onClick={handleGoBackToForm}
            color="secondary"
            size="sm"
            className="mt-12 block">
            <Trans>Revenir au formulaire de connexion</Trans>
          </Button>
        )}
      </div>
    </div>
  )
}
