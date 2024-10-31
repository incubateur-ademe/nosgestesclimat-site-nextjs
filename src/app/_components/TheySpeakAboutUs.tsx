import Background from '@/components/landing-pages/Background'
import Trans from '@/components/translation/Trans'
import Image from 'next/image'

export default function TheySpeakAboutUs() {
  return (
    <div className="relative mb-10 px-4 py-16 md:py-28">
      <div className="absolute left-0 top-0 h-1/2 w-[200%] bg-heroLightBackground"></div>
      <Background className="bg-heroLightBackground" withColorLine />
      <div className="relative flex flex-col items-center gap-10  md:mx-auto md:max-w-5xl">
        <h2 className="text-center text-2xl md:text-3xl">
          <Trans>Ils parlent de nous</Trans>
        </h2>

        <ul className="flex w-full flex-row flex-wrap items-center justify-center gap-7 md:justify-between">
          <li>
            <Image
              src="/images/ambassadeurs/france_info.png"
              alt="France Info"
              width={150}
              height={150}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/france_inter.png"
              alt="France Inter"
              width={100}
              height={100}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/bonpote.png"
              alt="Bon Pote"
              width={100}
              height={100}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/bfntv.png"
              alt="BFM TV"
              width={100}
              height={100}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/vert.jpg"
              alt="Vert Media"
              width={100}
              height={100}
            />
          </li>

          <li>
            <Image
              src="/images/ambassadeurs/challenges.png"
              alt="Challenges"
              width={100}
              height={100}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
