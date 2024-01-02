'use client'

import { useUser } from '@/publicodes-state'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import EmailForm from './emailSection/EmailForm'
import VerificationForm from './emailSection/VerificationForm'

export default function EmailSection() {
  const { user } = useUser()

  const hasSavedValidLoginExpirationDate = user?.loginExpirationDate
    ? dayjs(user?.loginExpirationDate).isAfter(dayjs())
    : false

  const [hasEmailBeenSent, setHasEmailBeenSent] = useState(
    hasSavedValidLoginExpirationDate
  )

  useEffect(() => {
    if (hasSavedValidLoginExpirationDate && !hasEmailBeenSent) {
      setHasEmailBeenSent(true)
    }
  }, [hasSavedValidLoginExpirationDate, hasEmailBeenSent])

  if (!user) return null

  if (hasEmailBeenSent) {
    return <VerificationForm ownerEmail={user?.email} />
  }

  return <EmailForm onComplete={() => setHasEmailBeenSent(true)} />
}
