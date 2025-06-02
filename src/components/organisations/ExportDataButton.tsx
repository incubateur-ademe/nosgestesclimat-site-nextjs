'use client'

import type { ButtonProps } from '@/design-system/buttons/Button'
import Button from '@/design-system/buttons/Button'
import { fetchPollResults } from '@/services/organisations/fetchPollResults'
import type { PublicOrganisationPoll } from '@/types/organisations'
import { captureException } from '@sentry/nextjs'
import { useState } from 'react'
import DownloadIcon from '../icons/DownloadIcon'
import Trans from '../translation/trans/TransClient'

type Props = {
  poll: PublicOrganisationPoll
  color?: 'primary' | 'secondary'
  onClick?: () => void
}

export default function ExportDataButton({
  color = 'secondary',
  onClick,
  ...props
}: ButtonProps & Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    }

    setIsLoading(true)

    fetchPollResults(props)
      .then((data) => window.open(data.url, '_blank'))
      .catch((error) => {
        captureException(error)
        // TODO display an error toast
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Button color={color} disabled={isLoading} onClick={handleClick} {...props}>
      <DownloadIcon className="fill-primary-700 mr-2" />
      <Trans>Exporter les données</Trans>
    </Button>
  )
}
