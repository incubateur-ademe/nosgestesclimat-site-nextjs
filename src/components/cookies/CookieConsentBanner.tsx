import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { Dispatch, SetStateAction } from 'react'
import ReactModal from 'react-modal'

// Type assertion to resolve React types version mismatch
const Modal = ReactModal as any

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
  const { t } = useClientTranslation()
  return (
    <Modal
      isOpen={isVisible && !isBoardOpen}
      onAfterClose={() => setIsVisible(false)}
      className="!mr-auto !w-[500px] !max-w-[calc(100vw-1rem)] !rounded-[2.5rem] !border-0 !p-0 !shadow-2xl md:!mb-8 md:!ml-8"
      overlayClassName="!bg-black/0 !backdrop-blur-none !fixed !bottom-0 !left-0 !right-0 !top-auto !z-[10000]"
      contentLabel={t(
        'Bannière de consentement aux cookies',
        'cookies.banner.contentLabel'
      )}
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
        <h2
          className="mb-6 text-center text-lg font-bold text-gray-900 sm:text-left sm:text-xl"
          data-testid="cookie-banner-title">
          <Trans i18nKey="cookies.banner.title">
            Chez Nos Gestes Climat, votre vie privée compte
          </Trans>
        </h2>

        <p className="mb-2 text-sm" data-testid="cookie-banner-description">
          <Trans i18nKey="cookies.banner.description">
            Nous utilisons des cookies, juste ce qu’il faut pour faire
            fonctionner le site, améliorer l’expérience et mesurer de manière
            anonyme l’audience. Avec votre accord, nous activons aussi un suivi
            simple de nos campagnes pour mieux comprendre ce qui fonctionne.
          </Trans>
        </p>
        <div className="mt-6 flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
          <Button
            size="sm"
            color="secondary"
            onClick={openSettings}
            data-testid="cookie-banner-customize-button">
            <Trans i18nKey="cookies.banner.customize">Personnaliser</Trans>
          </Button>
          <Button
            size="sm"
            color="secondary"
            onClick={refuseAll}
            data-testid="cookie-banner-refuse-button">
            <Trans i18nKey="cookies.banner.refuseAll">Tout refuser</Trans>
          </Button>
          <Button
            size="sm"
            color="primary"
            onClick={acceptAll}
            data-testid="cookie-banner-accept-button">
            <Trans i18nKey="cookies.banner.acceptAll">Tout accepter</Trans>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
