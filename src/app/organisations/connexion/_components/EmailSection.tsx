'use client'

import { useUser } from '@/publicodes-state'
import { useState } from 'react'
import EmailForm from './emailSection/EmailForm'
import VerificationForm from './emailSection/VerificationForm'

export default function EmailSection() {
  const [hasEmailBeenSent, setHasEmailBeenSent] = useState(false)

  const { user } = useUser()

  if (hasEmailBeenSent) {
    return <VerificationForm ownerEmail={user?.email} />
  }

  return <EmailForm onComplete={() => setHasEmailBeenSent(true)} />
}
