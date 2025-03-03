import Trans from '@/components/translation/trans/TransServer'
import Image from 'next/image'
import LinkAmbassadeurs from './partnersSection/LinkAmbassadeurs'

export default async function PartnersSection({ locale }: { locale: string }) {
  return (
    <>
      <section className="mb-8 mt-28 flex w-full flex-col items-center gap-16 rounded-xl bg-gray-100 px-8 py-16">
        <h3 className="text-center">
          <Trans locale={locale}>Rejoignez nos partenaires</Trans>
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
        <LinkAmbassadeurs />
      </section>
    </>
  )
}
