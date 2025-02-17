import Link from '@/components/Link'
import MailIcon from '@/components/icons/MailIcon'
import TransServer from '@/components/translation/trans/TransServer'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Image from 'next/image'
import Script from 'next/script'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)
  return getMetadataObject({
    locale,
    title: t('Contact - Nos Gestes Climat'),
    description: t("Contactez l'équipe de Nos Gestes Climat."),
    alternates: {
      canonical: '/contact',
    },
  })
}

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)

  return (
    <div className="pb-4">
      <div className="flex flex-wrap gap-8 pb-8 md:flex-nowrap">
        <div>
          <Title
            title={
              <span className="flex items-center">
                <TransServer locale={locale}>Contact</TransServer>

                <MailIcon className="fill-primary-500 ml-3" />
              </span>
            }
          />

          <p>
            <TransServer locale={locale}>
              N'hésitez pas à consulter notre{' '}
              <Link href="/questions-frequentes">FAQ</Link> avant de nous
              écrire, vous y trouverez sans doute la réponse à votre question !
            </TransServer>
          </p>

          <p>
            <TransServer locale={locale}>
              Pour toute autre remarque ou question, vous pouvez nous envoyer un
              message via le formulaire de contact ci-dessous.
            </TransServer>
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
