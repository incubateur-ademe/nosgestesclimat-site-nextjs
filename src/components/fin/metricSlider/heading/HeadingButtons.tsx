'use client'

import SaveIcon from '@/components/icons/SaveIcon'
import FacebookIcon from '@/components/icons/share/FacebookIcon'
import LinkedinIcon from '@/components/icons/share/LinkedinIcon'
import MailIcon from '@/components/icons/share/MailIcon'
import MessengerIcon from '@/components/icons/share/MessengerIcon'
import WhatsappIcon from '@/components/icons/share/WhatsappIcon'
import Trans from '@/components/translation/trans/TransClient'
import { endClickSaveShortcut } from '@/constants/tracking/pages/end'
import { simulationClickSaveShortcut } from '@/constants/tracking/pages/simulateur'
import {
  FACEBOOK_SHARE_URL,
  LINKEDIN_SHARE_URL,
  MESSENGER_SHARE_MOBILE_URL,
  WHATSAPP_SHARE_URL,
} from '@/constants/urls/share'
import Button from '@/design-system/buttons/Button'
import Share from '@/design-system/sharing/Share'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEndPageSharedUrl } from '@/hooks/useEndPageSharedUrl'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { twMerge } from 'tailwind-merge'

const sizeClassNames = {
  sm: 'p-0! h-10 w-10',
  md: 'p-0! h-10 w-10',
}
const saveClassNames = {
  sm: 'h-6 w-6',
  md: 'h-6 w-6',
}
const shareClassNames = {
  sm: 'h-[22px] w-[22px]',
  md: 'h-[28px] w-[28px]',
}

type Props = { size?: 'sm' | 'md'; endPage?: boolean }

export default function HeadingButtons({ size = 'md', endPage }: Props) {
  const { sharedUrl } = useEndPageSharedUrl()

  const { t } = useClientTranslation()

  const handleScroll = (id: string, block: ScrollLogicalPosition) => {
    const emailBlock = document.getElementById(id)
    emailBlock?.scrollIntoView({ behavior: 'smooth', block })
  }

  return (
    <div className="mb-1 flex gap-0.5">
      <Button
        color="text"
        size="sm"
        aria-label={t('Sauvegarder')}
        className={twMerge(
          sizeClassNames[size],
          'font-medium lg:w-auto lg:gap-2 lg:px-4! lg:py-2!'
        )}
        onClick={() => {
          trackEvent(
            endPage ? endClickSaveShortcut : simulationClickSaveShortcut
          )
          handleScroll('email-block', 'start')
        }}>
        <SaveIcon
          className={twMerge('fill-primary-700', saveClassNames[size])}
        />
        <span className="sr-only lg:not-sr-only">
          <Trans>Sauvegarder</Trans>
        </span>
      </Button>

      <Share
        buttonLabel={t('Partager')}
        modalTitle={t('Partager le simulateur')}
        modalDescription={t(
          'Envoyez le simulateur à vos proches et faites votre 1ère bonne action !'
        )}
        shareItems={[
          {
            icon: <WhatsappIcon />,
            label: t('Whatsapp'),
            link: `${WHATSAPP_SHARE_URL}${sharedUrl}`,
          },
          {
            icon: <FacebookIcon />,
            label: t('Facebook'),
            link: `${FACEBOOK_SHARE_URL}${sharedUrl}`,
          },
          {
            icon: <MessengerIcon />,
            label: t('Messenger'),
            link: `${MESSENGER_SHARE_MOBILE_URL}${sharedUrl}`,
            mobileOnly: true,
          },
          {
            icon: <LinkedinIcon />,
            label: t('Linkedin'),
            link: `${LINKEDIN_SHARE_URL}${sharedUrl}`,
          },
          {
            icon: <MailIcon className="fill-primary-700 w-4" />,
            label: t('Envoyer par e-mail'),
            link: `mailto:?subject=${t('Voici mes empreintes carbone et eau ; tu connais les tiennes ?')}&body=${sharedUrl}`,
          },
        ]}
        link={sharedUrl}
      />
    </div>
  )
}
