import Background from '@/components/landing-pages/Background'
import TransServer from '@/components/translation/trans/TransServer'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Image from 'next/image'

export default function TheySpeakAboutUs({ locale }: { locale: string }) {
  return (
    <div className="relative mb-10 px-4 py-16 md:mb-20 md:py-28 xl:mb-32">
      {/* Helps cover the triangles of white shown because of the perspective change in Background */}
      <div className="absolute left-0 top-0 h-1/2 w-[200%] bg-heroLightBackground" />

      {/* Add the background along with the tilted colorline */}
      <Background
        className="bg-heroLightBackground"
        withColorLine
        direction="left"
      />

      <div className="relative flex flex-col items-center gap-10 md:mx-auto md:max-w-5xl">
        <h2 className="text-center text-xl md:text-2xl">
          <TransServer locale={locale}>
            Plusieurs milliers d’organisations nous font confiance pour
            sensibiliser efficacement
          </TransServer>
        </h2>

        <ul className="flex w-full flex-row flex-wrap items-center justify-center gap-7 md:justify-between">
          <li>
            <Image
              src="/images/ambassadeurs/sncf-voyageurs.png"
              alt="SNCF Voyageurs"
              className="h-auto w-24 md:w-36"
              width={150}
              height={150}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/leboncoin.png"
              alt="Leboncoin"
              className="h-auto w-24 md:w-36"
              width={150}
              height={150}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/france_info.png"
              alt="France Info"
              className="h-auto w-24 md:w-36"
              width={150}
              height={150}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/france_inter.png"
              alt="France Inter"
              className="h-auto w-16 md:w-24"
              width={100}
              height={100}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/strasbourg.jpg"
              alt="Strasbourg Métropole"
              className="h-auto w-24 md:w-40"
              width={100}
              height={100}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/nantes metropole.jpg"
              alt="Nantes Métropole"
              className="h-auto w-16 md:w-24"
              width={100}
              height={100}
            />
          </li>
        </ul>

        <div className="flex justify-center">
          <ButtonLink color="secondary" size="xl" href="/nos-relais">
            <TransServer locale={locale}>Rejoignez-les</TransServer>
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
