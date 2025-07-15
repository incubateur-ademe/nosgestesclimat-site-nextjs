'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import React, {
  type CSSProperties,
  type ImgHTMLAttributes,
  useId,
  useState,
} from 'react'
import ReactModal from 'react-modal'

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
  width,
  height,
  src,
  ...imgProps
}) => {
  // Remove width and height from imgProps to avoid conflicts with Next.js Image
  const { t } = useClientTranslation()
  const [showModal, setShowModal] = useState(false)
  const linkId = useId()
  return (
    <>
      <div
        className="md:hidden"
        style={{ position: 'relative', ...wrapperStyle }}>
        <Image
          {...imgProps}
          src={src as string}
          width={typeof width === 'number' ? width : 900}
          height={typeof height === 'number' ? height : 500}
          alt={imgProps.alt || ''}
        />
      </div>

      <div
        className="hidden md:block"
        style={{ position: 'relative', ...wrapperStyle }}>
        <button
          style={{ cursor: 'zoom-in', width: '100%' }}
          onClick={() => setShowModal(true)}
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
        </button>

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
    </>
  )
}

export default ZoomOnClick
