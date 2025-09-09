'use client'

import FacebookIcon from '@/components/icons/share/FacebookIcon'
import LinkedinIcon from '@/components/icons/share/LinkedinIcon'
import MailIcon from '@/components/icons/share/MailIcon'
import MessengerIcon from '@/components/icons/share/MessengerIcon'
import WhatsappIcon from '@/components/icons/share/WhatsappIcon'
import Link from '@/components/Link'
import QRCode from '@/components/sharing/QRCode'
import Trans from '@/components/translation/trans/TransClient'
import {
  MATOMO_CAMPAIGN_KEY,
  MATOMO_KEYWORD_KEY,
} from '@/constants/urls/matomo'
import {
  FACEBOOK_SHARE_URL,
  LINKEDIN_SHARE_URL,
  MESSENGER_SHARE_MOBILE_URL,
  WHATSAPP_SHARE_URL,
} from '@/constants/urls/share'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import CopyButton from '@/design-system/buttons/CopyButton'
import Card from '@/design-system/layout/Card'
import { getShareTrackEvent } from '@/helpers/tracking/share'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { PublicOrganisationPoll } from '@/types/organisations'
import { trackEvent } from '@/utils/analytics/trackEvent'
import Image from 'next/image'

type Props = {
  poll: PublicOrganisationPoll
}

const buildLink = ({
  orgaSlug,
  pollSlug,
  orgaName,
  pollName,
}: {
  orgaSlug: string
  pollSlug: string
  orgaName: string
  pollName: string
}) => {
  return `${window.location.origin}/o/${orgaSlug}/${pollSlug}?${MATOMO_CAMPAIGN_KEY}=Organisation_${encodeURIComponent(orgaName)}&${MATOMO_KEYWORD_KEY}=${encodeURIComponent(pollName)}`
}

export default function AdminSection({ poll }: Props) {
  const {
    slug: pollSlug,
    name: pollName,
    organisation: { slug: orgaSlug, name: orgaName },
  } = poll

  const { t } = useClientTranslation()

  const url = buildLink({
    orgaSlug,
    pollSlug,
    orgaName,
    pollName,
  })

  return (
    <section className="mt-10">
      <div className="flex flex-col items-start">
        <h2 className="mb-4">
          <Trans i18nKey="pollResults.adminSection.title">
            Invitez de nouvelles personnes
          </Trans>
        </h2>

        <Card className="bg-primary-100 flex w-full flex-col items-center justify-center border-0 p-8 shadow-none">
          <Image
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/bb1a673c20064abdd0ccd02c73467f2f30c128f5_adc1e8558e.png"
            width="48"
            height="48"
            className="mb-6"
            alt=""
          />

          <Link
            href={buildLink({
              orgaSlug,
              pollSlug,
              orgaName,
              pollName,
            })}>
            {`${window.location.origin}/o/${orgaSlug}/${pollSlug}`
              .replace('https://', '')
              .replace('http://', '')}
          </Link>

          <CopyButton
            textToCopy={buildLink({
              orgaSlug,
              pollSlug,
              orgaName,
              pollName,
            })}
            color="primary"
            className="mx-auto mt-4 w-auto"
          />
        </Card>
      </div>

      <div className="mt-12 mb-16 flex flex-col items-start">
        <h3>
          <Trans i18nKey="pollResults.adminSection.shareDirectly">
            Ou partagez directement
          </Trans>
        </h3>

        <QRCode
          value={buildLink({
            orgaSlug,
            pollSlug,
            orgaName,
            pollName,
          })}
          className="md:flex-1"
        />

        <ul className="mt-6 flex w-full flex-col flex-wrap gap-2 md:flex-row">
          {[
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
          ].map(({ link, label, icon, eventTracked }, index) => (
            <li key={link} className="flex flex-1">
              <ButtonLink
                data-testid={`share-button-link-${index}`}
                className="max-h-10 w-auto text-sm! lg:flex-1"
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
          ))}
        </ul>
      </div>
    </section>
  )
}
