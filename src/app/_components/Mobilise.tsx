import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Image from 'next/image'

export default function Mobilise() {
  return (
    <div className="flex flex-col items-center px-4 py-20 md:mx-auto md:max-w-5xl">
      <h2 className="mb-10 text-center text-2xl md:max-w-[430px] md:text-3xl">
        <Trans>Mobilisez votre entourage pour la planète !</Trans>
      </h2>

      <div className="mb-16 flex flex-col items-center justify-between gap-6 md:mb-20 md:flex-row md:gap-24">
        <div className="md:max-w-[500px]">
          <h3 className="mb-4 text-xl md:text-2xl">
            <Trans>Défiez votre entourage</Trans>
          </h3>

          <p className="mb-6 text-sm md:text-lg">
            <Trans>
              Créez un groupe avec vos proches et{' '}
              <strong className="text-primary-600">
                lancez-vous dans un défi collectif
              </strong>{' '}
              pour réduire votre empreinte. Comparez vos résultats, suivez vos
              progrès et voyez qui parvient à réduire le plus ses émissions de
              carbone ou sa consommation d’eau.
            </Trans>
          </p>

          <ButtonLink href="/amis">
            <Trans>Créer un groupe</Trans>
          </ButtonLink>
        </div>

        <div className="order-first py-8 md:order-last">
          <Image
            src="/images/illustrations/people-playing.svg"
            alt=""
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-24">
        <div className="py-14">
          <Image
            src="/images/illustrations/people-with-paperboard.svg"
            alt=""
            width={500}
            height={500}
          />
        </div>
        <div className="md:max-w-[500px]">
          <h3 className="mb-4 text-xl md:text-2xl">
            <Trans>Lancez une campagne dans votre organisation</Trans>
          </h3>

          <p className="mb-6 text-sm md:text-lg">
            <Trans>
              Entreprises, collectivités, associations, écoles ou festivals :{' '}
              <strong className="text-primary-600">
                engagez votre organisation dans une démarche durable
              </strong>{' '}
              avec une campagne Nos Gestes Climat. Sensibilisez vos parties
              prenantes à l’empreinte carbone et à l’empreinte eau{' '}
              <strong className="text-primary-600">
                grâce à nos outils clés en main
              </strong>
              .
            </Trans>
          </p>

          <ButtonLink color="secondary" href="/organisations">
            <Trans>Créer une campagne</Trans>
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
