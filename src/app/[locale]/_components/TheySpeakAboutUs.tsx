import Background from '@/components/landing-pages/Background'
import Trans from '@/components/translation/trans/TransServer'
import Image from 'next/image'

export default function TheySpeakAboutUs({ locale }: { locale: string }) {
  return (
    <div className="relative mb-10 px-4 py-16 md:mb-20 md:py-28 xl:mb-32">
      {/* Helps cover the triangles of white shown because of the perspective change in Background */}
      <div className="bg-heroLightBackground absolute top-0 left-0 h-1/2 w-[200%]" />

      {/* Add the background along with the tilted colorline */}
      <Background
        className="bg-heroLightBackground"
        withColorLine
        direction="left"
      />

      <div className="relative flex flex-col items-center gap-10 md:mx-auto md:max-w-5xl">
        <h2 className="text-center text-2xl md:text-3xl">
          <Trans locale={locale}>Ils parlent de nous</Trans>
        </h2>

        <ul className="flex w-full flex-row flex-wrap items-center justify-center gap-7 md:justify-between">
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
              src="/images/ambassadeurs/bon-pote-no-background.svg"
              alt="Bon Pote"
              className="h-auto w-24 md:w-36"
              width={140}
              height={100}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/bfntv.png"
              alt="BFM TV"
              className="h-auto w-12 md:w-20"
              width={80}
              height={100}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/vert_rectangulaire.png"
              alt="Vert Media"
              className="h-auto w-20 md:w-32"
              width={120}
              height={100}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/challenges.png"
              alt="Challenges"
              className="h-auto w-28 md:w-40"
              width={160}
              height={100}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
