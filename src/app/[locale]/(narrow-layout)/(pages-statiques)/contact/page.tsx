import Link from '@/components/Link'
import MailIcon from '@/components/icons/MailIcon'
import Trans from '@/components/translation/trans/TransServer'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import Image from 'next/image'
import Script from 'next/script'

export const generateMetadata = getCommonMetadata({
  title: t('Contact - Nos Gestes Climat'),
  description: t("Contactez l'équipe de Nos Gestes Climat."),
  alternates: {
    canonical: '/contact',
  },
})

export default async function Contact({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return (
    <div className="pb-4">
      <div className="flex flex-wrap gap-8 pb-8 md:flex-nowrap">
        <div>
          <Title
            title={
              <span className="flex items-center">
                <Trans locale={locale}>Contact</Trans>

                <MailIcon className="fill-primary-500 ml-3" />
              </span>
            }
          />

          <p>
            <Trans locale={locale}>
              N'hésitez pas à consulter notre{' '}
              <Link href="/questions-frequentes">FAQ</Link> avant de nous
              écrire, vous y trouverez sans doute la réponse à votre question !
            </Trans>
          </p>

          <p>
            <Trans locale={locale}>
              Pour toute autre remarque ou question, vous pouvez nous envoyer un
              message via le formulaire de contact ci-dessous.
            </Trans>
          </p>
        </div>

        <Image
          className="max-w-[50vw] self-start"
          src="/images/illustrations/delivering-mail.png"
          width="300"
          height="400"
          alt={t(
            'Personne sur un vélo récupérant du courrier dans une boîte aux lettres'
          )}
        />
      </div>
      <Card>
        <iframe
          data-tally-src="https://tally.so/embed/w59G1Z?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="1306"
          title="Vous avez un retour sur Nos Gestes Climat ?"></iframe>
      </Card>

      <Script id="tally">{`var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}`}</Script>
    </div>
  )
}
