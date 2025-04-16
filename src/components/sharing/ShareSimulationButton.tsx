'use client'

import {
  FACEBOOK_SHARE_URL,
  LINKEDIN_SHARE_URL,
  MESSENGER_SHARE_MOBILE_URL,
  WHATSAPP_SHARE_URL,
} from '@/constants/urls/share'
import Share from '@/design-system/sharing/Share'
import { getShareTrackEvent } from '@/helpers/tracking/share'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import FacebookIcon from '../icons/share/FacebookIcon'
import LinkedinIcon from '../icons/share/LinkedinIcon'
import MailIcon from '../icons/share/MailIcon'
import MessengerIcon from '../icons/share/MessengerIcon'
import WhatsappIcon from '../icons/share/WhatsappIcon'

export default function ShareSimulationButton({ url }: { url: string }) {
  const { t } = useClientTranslation()

  return (
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
          link: `${WHATSAPP_SHARE_URL}${url}`,
          eventTracked: getShareTrackEvent({
            page: 'Fin',
            target: 'Whatsapp',
          }),
        },
        {
          icon: <FacebookIcon />,
          label: t('Facebook'),
          link: `${FACEBOOK_SHARE_URL}${url}`,
          eventTracked: getShareTrackEvent({
            page: 'Fin',
            target: 'Facebook',
          }),
        },
        {
          icon: <MessengerIcon />,
          label: t('Messenger'),
          link: `${MESSENGER_SHARE_MOBILE_URL}${url}`,
          mobileOnly: true,
          eventTracked: getShareTrackEvent({
            page: 'Fin',
            target: 'Messenger',
          }),
        },
        {
          icon: <LinkedinIcon />,
          label: t('Linkedin'),
          link: `${LINKEDIN_SHARE_URL}${url}`,
          eventTracked: getShareTrackEvent({
            page: 'Fin',
            target: 'Linkedin',
          }),
        },
        {
          icon: <MailIcon className="fill-primary-700 w-4" />,
          label: t('Envoyer par e-mail'),
          link: `mailto:?subject=${t('Voici mes empreintes carbone et eau ; tu connais les tiennes ?')}&body=${url}`,
          eventTracked: getShareTrackEvent({
            page: 'Fin',
            target: 'E-mail',
          }),
        },
      ]}
      link={url}
    />
  )
}
