'use client'

import CopyIcon from '@/components/icons/share/CopyIcon'
import ShareIcon from '@/components/icons/ShareIcon'
import CheckIcon from '@/components/icons/status/CheckIcon'
import Trans from '@/components/translation/trans/TransClient'
import { getShareTrackEvent } from '@/helpers/tracking/share'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/analytics/trackEvent'
import getIsMobile from 'is-mobile'
import { type ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../buttons/Button'
import ButtonLink from '../buttons/ButtonLink'
import CopyButton from '../buttons/CopyButton'
import Modal from '../modals/Modal'

type ShareItem = {
  label: ReactNode
  icon: ReactNode
  link: string
  mobileOnly?: boolean
  eventTracked: string[]
}

export default function Share({
  className,
  buttonLabel,
  shareItems,
  modalTitle,
  modalDescription,
  linkShared,
  shouldHideTextOnMobile = true,
  ...props
}: {
  className?: string
  buttonLabel: string
  shareItems: ShareItem[]
  modalTitle: ReactNode
  modalDescription: ReactNode
  linkShared: string
  shouldHideTextOnMobile?: boolean
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { t } = useClientTranslation()

  const isMobile = getIsMobile()

  return (
    <>
      <Button
        color="text"
        size="sm"
        className={twMerge(
          'h-10 w-10 p-0! font-medium lg:w-auto lg:min-w-32 lg:gap-1 lg:px-4! lg:py-2!',
          className
        )}
        data-testid="share-button"
        onClick={() => setIsModalOpen(true)}
        aria-label={buttonLabel}>
        <ShareIcon
          className={twMerge('fill-primary-700 mr-[1px] h-[28px] w-[28px]')}
        />

        <span
          className={twMerge(
            'sr-only lg:not-sr-only!',
            shouldHideTextOnMobile && 'not-sr-only! hidden md:block'
          )}>
          {buttonLabel}
        </span>
      </Button>

      {isModalOpen && (
        <Modal
          isOpen
          ariaLabel={t('Fenêtre modale de partage')}
          hasAbortButton={false}
          closeModal={() => setIsModalOpen(false)}
          className="w-96 max-w-screen"
          {...props}>
          <h2
            data-testid="modal-element"
            className="text-center text-sm font-bold">
            {modalTitle}
          </h2>

          <p className="mb-6 text-center text-sm">{modalDescription}</p>

          <ul className="flex flex-col gap-4">
            <li>
              <CopyButton
                className="max-h-10"
                color="secondary"
                onCopied={() =>
                  trackEvent(
                    getShareTrackEvent({
                      page: 'Fin',
                      target: 'Copier-coller',
                    })
                  )
                }
                copiedStateText={
                  <span className="flex items-center gap-4 text-sm text-green-700">
                    <CheckIcon className="fill-green-700" />
                    <Trans>Lien copié !</Trans>
                  </span>
                }
                textToCopy={linkShared}>
                <span className="flex items-center gap-2 text-sm">
                  <Trans>Copier le lien</Trans>{' '}
                  <CopyIcon className="stroke-primary-700" />
                </span>
              </CopyButton>
            </li>

            {shareItems.map(
              ({ label, icon, link, mobileOnly, eventTracked }, index) =>
                mobileOnly && !isMobile ? null : (
                  <li key={link} className="w-full">
                    <ButtonLink
                      data-testid={`share-button-link-${index}`}
                      className="max-h-10 w-full text-sm!"
                      color="secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={link}
                      onClick={() => trackEvent(eventTracked)}>
                      <span className="flex items-center gap-2">
                        {label}
                        {icon}
                      </span>
                    </ButtonLink>
                  </li>
                )
            )}
          </ul>
        </Modal>
      )}
    </>
  )
}
