'use client'

import Trans from '@/components/translation/Trans'
import { amisDashboardCopyLink } from '@/constants/tracking/pages/amisDashboard'
import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { Group } from '@/types/groups'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useRef, useState } from 'react'

const SubmitButton = ({
  isShareDefined,
  handleShare,
  isCopied,
}: {
  isShareDefined: boolean
  handleShare: () => void
  isCopied: boolean
}) => {
  return (
    <Button
      className="flex justify-center whitespace-nowrap"
      onClick={() => {
        trackEvent(amisDashboardCopyLink)

        handleShare()
      }}
      data-cypress-id="invite-button">
      {isShareDefined && <Trans>Partager</Trans>}
      {!isShareDefined &&
        (isCopied ? <Trans>Copié !</Trans> : <Trans>Copier le lien</Trans>)}
    </Button>
  )
}

export default function InviteBlock({ group }: { group: Group }) {
  const [isCopied, setIsCopied] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const shouldUseShareAPI =
    typeof navigator !== 'undefined' &&
    navigator.share !== undefined &&
    window.innerWidth <= 768

  const sharedURL = `${window.location.origin}/amis/invitation?groupId=${group?._id}&mtm_campaign=challenge-amis`

  const handleShare = async () => {
    if (shouldUseShareAPI) {
      await navigator
        .share({
          url: sharedURL,
          title: 'Rejoindre mon groupe',
        })
        .catch(handleCopy)
    } else {
      handleCopy()
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(sharedURL)
    setIsCopied(true)
    timeoutRef.current = setTimeout(() => setIsCopied(false), 3000)
  }

  const hasMoreThanOneMember = group?.participants?.length > 1

  if (hasMoreThanOneMember) {
    return (
      <div className="mt-4 flex flex-col justify-between gap-4 rounded-md bg-gray-100 p-4 md:flex-row md:items-center">
        <p className="mb-0 text-sm md:text-base">
          <Trans>Invitez d'autres personnes à rejoindre votre groupe</Trans>
        </p>
        <SubmitButton
          isShareDefined={shouldUseShareAPI}
          isCopied={isCopied}
          handleShare={handleShare}
        />
      </div>
    )
  }

  return (
    <div className="rainbow-border mt-4 rounded-xl p-4">
      <h2 className="mt-0 flex items-center text-base md:text-lg">
        <Trans>Vous êtes le premier</Trans> <Emoji>🥳</Emoji> 
        <Trans>mais vous êtes seul·e…</Trans> <Emoji>🥲</Emoji>
      </h2>
      <p className="mb-4 text-sm md:text-base">
        <Trans>
          Partagez cette page à vos proches pour leur permettre de rejoindre
          votre groupe.
        </Trans>
      </p>
      <SubmitButton
        isShareDefined={shouldUseShareAPI}
        isCopied={isCopied}
        handleShare={handleShare}
      />
    </div>
  )
}
