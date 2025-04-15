'use client'

import CopyIcon from '@/components/icons/share/CopyIcon'
import ShareIcon from '@/components/icons/ShareIcon'
import CheckIcon from '@/components/icons/status/CheckIcon'
import Trans from '@/components/translation/trans/TransClient'
import { endClickShareShortcut } from '@/constants/tracking/pages/end'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { type ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../buttons/Button'
import ButtonLink from '../buttons/ButtonLink'
import CopyButton from '../buttons/CopyButton'
import Modal from '../modals/Modal'

export default function Share({
  buttonLabel,
  shareItems,
  modalTitle,
  modalDescription,
  ariaHideApp,
  link,
  ...props
}: {
  buttonLabel: string
  shareItems: { label: ReactNode; icon: ReactNode; link: string }[]
  modalTitle: ReactNode
  modalDescription: ReactNode
  ariaHideApp?: boolean
  link: string
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div id="modal" />

      <Button
        color="text"
        size="sm"
        className={twMerge(
          'h-10 w-10 p-0! font-medium lg:w-auto lg:min-w-32 lg:gap-1 lg:px-4! lg:py-2!'
        )}
        data-testid="share-button"
        onClick={() => {
          trackEvent(endClickShareShortcut)

          setIsModalOpen(true)
        }}
        aria-label={buttonLabel}>
        <ShareIcon
          className={twMerge('fill-primary-700 mr-[1px] h-[28px] w-[28px]')}
        />

        <span className="sr-only lg:not-sr-only!">{buttonLabel}</span>
      </Button>

      {isModalOpen && (
        <div data-testid="modal-element">
          <Modal
            isOpen
            ariaHideApp={ariaHideApp}
            hasAbortButton={false}
            closeModal={() => setIsModalOpen(false)}
            className="w-96 max-w-screen"
            {...props}>
            <h2 className="text-center text-sm font-bold">{modalTitle}</h2>

            <p className="mb-6 text-center text-sm">{modalDescription}</p>

            <ul className="flex flex-col gap-4">
              <li>
                <CopyButton
                  className="max-h-10"
                  color="secondary"
                  copiedStateText={
                    <span className="flex items-center gap-4 text-sm text-green-700">
                      <CheckIcon className="fill-green-700" />
                      <Trans>Lien copié !</Trans>
                    </span>
                  }
                  textToCopy={link}>
                  <span className="flex items-center gap-2 text-sm">
                    <Trans>Copier le lien</Trans>{' '}
                    <CopyIcon className="stroke-primary-700" />
                  </span>
                </CopyButton>
              </li>

              {shareItems.map(({ label, icon, link }) => (
                <li key={link} className="w-full">
                  <ButtonLink
                    className="max-h-10 w-full text-sm!"
                    color="secondary"
                    href={link}>
                    <span className="flex items-center gap-2">
                      {label}
                      {icon}
                    </span>
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </Modal>
        </div>
      )}
    </>
  )
}
