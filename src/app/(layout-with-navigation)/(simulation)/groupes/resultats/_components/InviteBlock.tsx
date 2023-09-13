'use client'

import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import { Group } from '@/types/groups'
import { useEffect, useRef, useState } from 'react'

type SubmitButtonProps = {
  isShareDefined: boolean
  handleShare: () => void
  handleCopy: () => void
  isCopied: boolean
}

const SubmitButton = ({
  isShareDefined,
  handleShare,
  handleCopy,
  isCopied,
}: SubmitButtonProps) => {
  return (
    <Button
      className="flex w-[8rem] justify-center whitespace-nowrap"
      onClick={isShareDefined ? handleShare : handleCopy}
      data-cypress-id="invite-button">
      {isShareDefined && <TransClient>Partager</TransClient>}
      {!isShareDefined &&
        (isCopied ? (
          <TransClient>Copié !</TransClient>
        ) : (
          <TransClient>Copier le lien</TransClient>
        ))}
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

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const isShareDefined =
    typeof navigator !== 'undefined' && navigator.share !== undefined

  const sharedURL = `${window.location.origin}/groupes/invitation?groupId=${group?._id}&mtm_campaign=challenge-amis`

  const handleShare = async () => {
    // TODO: replace with new tracking event
    // trackEvent(getMatomoEventShareMobile(score))
    if (navigator.share) {
      await navigator.share({
        text: sharedURL,
        url: sharedURL,
        title: 'Rejoindre mon groupe',
      })
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(sharedURL)
    setIsCopied(true)
    timeoutRef.current = setTimeout(() => setIsCopied(false), 3000)
  }

  const hasMoreThanOneMember = group?.members?.length > 1

  if (hasMoreThanOneMember) {
    return (
      <div className="mt-4 flex items-center justify-between gap-1 rounded-md bg-grey-100 p-4">
        <p className="mb-0">
          Invitez d'autres personnes à rejoindre votre groupe
        </p>
        <SubmitButton
          isShareDefined={isShareDefined}
          isCopied={isCopied}
          handleCopy={handleCopy}
          handleShare={handleShare}
        />
      </div>
    )
  }

  return (
    <div className="mt-4 rounded-md bg-grey-100 p-4">
      <h2 className="mt-0 text-lg">
        <TransClient>Vous êtes le premier 🥳</TransClient>
      </h2>
      <p className="mb-4">
        <TransClient>
          Partagez cette page à vos proches pour leur permettre de rejoindre
          votre groupe.
        </TransClient>
      </p>
      <SubmitButton
        isShareDefined={isShareDefined}
        isCopied={isCopied}
        handleCopy={handleCopy}
        handleShare={handleShare}
      />
    </div>
  )
}
