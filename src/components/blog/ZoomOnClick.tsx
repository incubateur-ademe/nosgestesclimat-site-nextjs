'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import React, {
  type CSSProperties,
  type ImgHTMLAttributes,
  useId,
  useState,
} from 'react'
import ReactModal from 'react-modal'
import Link from '../Link'
import Trans from '../translation/trans/TransClient'

const ModalComponent = ReactModal as any

interface ZoomOnClickProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperStyle?: CSSProperties
}

// Set the app element once when the module is loaded
if (typeof document !== 'undefined') {
  ReactModal.setAppElement(document.body)
}

const ZoomOnClick: React.FC<ZoomOnClickProps> = ({
  wrapperStyle,
  ...imgProps
}) => {
  const { t } = useClientTranslation()
  const [showModal, setShowModal] = useState(false)
  const linkId = useId()
  return (
    <div style={{ position: 'relative', ...wrapperStyle }}>
      <div
        style={{ cursor: 'zoom-in', width: '100%' }}
        onClick={() => setShowModal(true)}
        role="button"
        aria-label={t("Agrandir l'image")}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setShowModal(true)
          }
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...imgProps}
          style={{ width: '100%', height: 'auto', ...imgProps.style }}
          alt={imgProps.alt || ''}
          aria-describedby={linkId}
        />
      </div>
      <div className="mt-2 mb-8 text-center">
        <Link
          className="text-sm"
          id={linkId}
          href={(imgProps.src as string) || ''}
          target="_blank"
          rel="noopener noreferrer">
          <Trans>Voir l'image en grand dans un nouvel onglet</Trans>
        </Link>
      </div>

      <ModalComponent
        isOpen={showModal}
        onClick={() => setShowModal(false)}
        closeModal={() => setShowModal(false)}
        onRequestClose={() => setShowModal(false)}
        contentLabel={t("Vue agrandie de l'image")}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            cursor: 'zoom-out',
            overflow: 'auto',
          },
          content: {
            position: 'static',
            inset: 'auto',
            border: 'none',
            background: 'transparent',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0',
            outline: 'none',
            padding: '0',
            margin: '0',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        <div
          style={{ cursor: 'zoom-out', width: '100%' }}
          onClick={() => setShowModal(false)}
          role="button"
          aria-label={t("Fermer l'agrandissement de l'image")}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setShowModal(false)
            }
          }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...imgProps}
            className="shadow-lg"
            style={{
              width: 'auto',
              height: 'auto',
              background: '#fff',
              borderRadius: '8px',
              display: 'inline-block',
              margin: '40px auto',
              maxWidth: '90dvw',
              maxHeight: '90dvh',
              ...imgProps.style,
            }}
            alt={imgProps.alt || ''}
          />
        </div>
      </ModalComponent>
    </div>
  )
}

export default ZoomOnClick
