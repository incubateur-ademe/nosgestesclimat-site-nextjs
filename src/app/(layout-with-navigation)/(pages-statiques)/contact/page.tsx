import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Script from 'next/script'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Contact - Nos Gestes Climat',
    description: "Contactez l'équipe de Nos Gestes Climat.",
    alternates: {
      canonical: '/contact',
    },
  })
}

export default function Contact() {
  return (
    <div className="pb-4">
      <Title
        title={
          <>
            <Trans>Contact</Trans>
            <Emoji className="ml-2 inline-block">📨</Emoji>
          </>
        }
      />

      <p>
        <Trans>
          N'hésitez pas à consulter notre{' '}
          <Link href="/questions-frequentes">FAQ</Link> avant de nous écrire,
          vous y trouverez sans doute la réponse à votre question !
        </Trans>
      </p>

      <p>
        <Trans>
          Pour toute autre remarque ou question, vous pouvez nous envoyer un
          message via le formulaire de contact ci-dessous.
        </Trans>
      </p>
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
