import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import Image from 'next/image'

export default function CollectiveAction() {
  return (
    <div className="mx-auto max-w-[854px] py-20">
      <h2 className="relative mb-5 pb-5 text-center text-3xl">
        <Trans>S’engager collectivement autour des enjeux du climat</Trans>
        <Separator className="absolute bottom-0 left-1/2 m-0 -translate-x-1/2" />
      </h2>
      <p className="text-center text-lg">
        <Trans>
          Chez Nos Gestes Climat, nous croyons au pouvoir de{' '}
          <strong className="text-primary-700">
            l’action collective pour relever les défis environnementaux.
          </strong>{' '}
          Notre mission est de
          <strong className="text-primary-700">sensibiliser</strong> et
          d’accompagner chacun, citoyens, entreprises et collectivités, à mieux
          comprendre son empreinte écologique, carbone ou eau, à{' '}
          <strong className="text-primary-700">identifier les gestes</strong>{' '}
          pour la réduire et à{' '}
          <strong className="text-primary-700">entraîner leur entourage</strong>{' '}
          dans ce mouvement.
        </Trans>
      </p>
      <p className="mb-20 text-center text-lg">
        <strong className="text-secondary-700">
          <Trans>Accélérons l’impact collectif avec Nos Gestes Climat !</Trans>
        </strong>
      </p>
      <Image
        src="/images/misc/home-collective-action.svg"
        alt="Illustration d'une équipe de personnes engagées dans une action collective pour le climat"
        width="677"
        height="448"
        loading="lazy"
      />
    </div>
  )
}
