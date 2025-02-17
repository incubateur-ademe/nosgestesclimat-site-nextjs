import TransServer from '@/components/translation/trans/TransServer'
import { organisationsAccueilClickAmbassadeurs } from '@/constants/tracking/pages/organisationsAccueil'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Image from 'next/image'

export default function PartnersSection({ locale }: { locale: string }) {
  return (
    <>
      <section className="mt-28 mb-8 flex w-full flex-col items-center gap-16 rounded-xl bg-gray-100 px-8 py-16">
        <h3 className="text-center">
          <TransServer locale={locale}>Rejoignez nos partenaires</TransServer>
        </h3>

        <div className="mx-auto flex flex-wrap items-center justify-center gap-12">
          <Image
            width="100"
            height="140"
            src="/images/misc/logo-sncf.png"
            alt="La SNCF"
          />

          <Image
            width="110"
            height="140"
            src="/images/misc/logo-ABC-web.png"
            alt="L'association ABC"
          />

          <Image
            width="140"
            height="140"
            src="/images/misc/logo-bonpote.png"
            alt="Le blog BonPote"
          />

          <Image
            width="180"
            height="140"
            src="/images/misc/logo-franceinfo.png"
            alt="France Info"
          />
        </div>
        <ButtonLink
          color="secondary"
          href="/ambassadeurs"
          trackingEvent={organisationsAccueilClickAmbassadeurs}>
          <TransServer locale={locale}>Ils ont testé</TransServer>
        </ButtonLink>
      </section>
    </>
  )
}
