'use client'

import { useUser } from '@/publicodes-state'
import dayjs from 'dayjs'
import EmailForm from './emailSection/EmailForm'
import VerificationForm from './emailSection/VerificationForm'

export default function EmailSection() {
  const { user } = useUser()

  const hasSavedValidLoginExpirationDate = user?.loginExpirationDate
    ? dayjs(user?.loginExpirationDate).isAfter(dayjs())
    : false

  if (!user) return null

  if (hasSavedValidLoginExpirationDate) {
    return <VerificationForm />
  }

  return <EmailForm />
}
