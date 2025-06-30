import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import type { Dispatch, SetStateAction } from 'react'
import ReactModal from 'react-modal'
import Link from '../Link'

export default function CookieConsentBanner({
  isVisible,
  setIsVisible,
  isBoardOpen,
  openSettings,
  refuseAll,
  acceptAll,
}: {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  isBoardOpen: boolean
  openSettings: () => void
  refuseAll: () => void
  acceptAll: () => void
}) {
  return (
    <ReactModal
      isOpen={isVisible && !isBoardOpen}
      onAfterClose={() => setIsVisible(false)}
      className="!mr-auto !mb-8 !ml-8 !w-[500px] !max-w-[calc(100vw-1rem)] !rounded-[2.5rem] !border-0 !p-0 !shadow-2xl"
      overlayClassName="!bg-black/0 !backdrop-blur-none !fixed !bottom-0 !left-0 !right-0 !top-auto !z-[10000]"
      contentLabel="Bannière de consentement aux cookies"
      style={{
        content: {
          margin: '0 auto',
          bottom: '2rem',
          left: '0',
          right: '0',
          top: 'auto',
          borderRadius: '2.5rem',
          padding: 0,
          border: 'none',
          maxWidth: '48rem',
          width: 'calc(100vw - 1rem)',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)',
        },
        overlay: {
          background: 'transparent',
          zIndex: 10000,
          pointerEvents: 'auto',
        },
      }}>
      <div className="flex w-full flex-col rounded-[2.5rem] bg-white px-6 py-8 shadow-2xl sm:px-8 sm:py-8">
        <h2 className="mb-6 text-center text-lg font-bold text-gray-900 sm:text-left sm:text-xl">
          <Trans i18nKey="cookies.banner.title">
            À propos des cookies sur Nos Gestes Climat
          </Trans>
        </h2>

        <p className="mb-2 text-sm text-gray-800">
          <Trans i18nKey="cookies.banner.description">
            Bienvenue ! Nous utilisons des cookies pour améliorer votre
            expérience et les services disponibles sur ce site. Pour en savoir
            plus, visitez la page{' '}
            <Link
              href="/politique-de-confidentialite#cookies"
              className="text-blue-800 underline hover:text-blue-900">
              <Trans i18nKey="cookies.banner.privacyLink">
                Données personnelles et cookies
              </Trans>
            </Link>
            .<span className="hidden sm:inline">&nbsp;</span>
            <span className="block sm:inline">
              Vous pouvez, à tout moment, avoir le contrôle sur les cookies que
              vous souhaitez activer.
            </span>
          </Trans>
        </p>
        <div className="mt-6 flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
          <Button size="sm" color="secondary" onClick={openSettings}>
            <Trans i18nKey="cookies.banner.customize">Personnaliser</Trans>
          </Button>
          <Button size="sm" color="secondary" onClick={refuseAll}>
            <Trans i18nKey="cookies.banner.refuseAll">Tout refuser</Trans>
          </Button>
          <Button size="sm" color="primary" onClick={acceptAll}>
            <Trans i18nKey="cookies.banner.acceptAll">Tout accepter</Trans>
          </Button>
        </div>
      </div>
    </ReactModal>
  )
}
