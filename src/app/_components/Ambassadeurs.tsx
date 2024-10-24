import Trans from '@/components/translation/Trans'
import Image from 'next/image'
import Background from './ambassadeurs/Background'

export default function Ambassadeurs() {
  return (
    <div className="relative -mt-10 mb-16">
      <Background direction="left" withColorLine />
      <div className="relative py-20 ">
        <h2 className="mb-12 text-center text-3xl">
          <Trans>Ils parlent de nous</Trans>
        </h2>
        <div className="space-between mx-auto flex max-w-5xl">
          <Image
            width="180"
            height="140"
            src="/images/ambassadeurs/france_info.png"
            alt="France Info"
            className="h-20 w-40 object-contain"
            loading="lazy"
          />
          <Image
            width="110"
            height="140"
            src="/images/ambassadeurs/france_inter.png"
            alt="France Inter"
            className="h-20 w-40 object-contain"
            loading="lazy"
          />
          <Image
            width="140"
            height="140"
            src="/images/ambassadeurs/bonpote.png"
            alt="Le blog BonPote"
            className="h-20 w-40 object-contain"
            loading="lazy"
          />
          <Image
            width="180"
            height="140"
            src="/images/ambassadeurs/bfntv.png"
            alt="BFM TV"
            className="h-20 w-40 object-contain"
            loading="lazy"
          />
          <Image
            width="180"
            height="140"
            src="/images/ambassadeurs/vert.jpg"
            alt="Vert"
            className="h-20 w-40 object-contain"
            loading="lazy"
          />
          <Image
            width="180"
            height="140"
            src="/images/ambassadeurs/challenges.png"
            alt="Challenges"
            className="h-20 w-40 object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
