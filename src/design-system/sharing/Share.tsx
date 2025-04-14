'use client'

import ShareIcon from '@/components/icons/ShareIcon'
import { endClickShareShortcut } from '@/constants/tracking/pages/end'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { type ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../inputs/Button'
import ButtonLink from '../inputs/ButtonLink'
import Modal from '../modals/Modal'

export default function Share({
  buttonLabel,
  shareItems,
  modalTitle,
  modalDescription,
  ariaHideApp,
  ...props
}: {
  buttonLabel: string
  shareItems: { label: ReactNode; link: string }[]
  modalTitle: ReactNode
  modalDescription: ReactNode
  ariaHideApp?: boolean
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

        <span className="sr-only lg:not-sr-only">{buttonLabel}</span>
      </Button>

      {isModalOpen && (
        <div data-testid="modal-element">
          <Modal
            isOpen
            ariaHideApp={ariaHideApp}
            closeModal={() => setIsModalOpen(false)}
            {...props}>
            <h2>{modalTitle}</h2>

            <p>{modalDescription}</p>

            <section className="flex flex-col gap-4">
              {shareItems.map(({ label, link }) => (
                <ButtonLink key={link} href={link}>
                  {label}
                </ButtonLink>
              ))}
            </section>
          </Modal>
        </div>
      )}
    </>
  )
}
