import Trans from '@/components/translation/Trans'
import { homeClickClassements } from '@/constants/tracking/pages/home'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function Amis() {
  const { t } = await getServerTranslation()
  return (
    <div className="mx-auto flex max-w-5xl flex-row items-center justify-between gap-24">
      <Image
        src="/images/illustrations/people-playing.png"
        alt={t('Des amis jouant à un jeu de société')}
        width="444"
        height="275"
        className="mb-6 block h-auto max-w-full"
        loading="lazy"
      />
      <div className="flex-1">
        <h3 className="text-2xl">
          <Trans>Lancez une campagne dans votre organisation</Trans>
        </h3>
        <p className="text-lg">
          <Trans>
            Entreprises, collectivités, associations, écoles ou festivals :{' '}
            <strong className="text-primary-700">
              engagez votre organisation dans une démarche durable
            </strong>{' '}
            avec une campagne Nos Gestes Climat. Sensibilisez vos parties
            prenantes à l’empreinte carbone et à l’empreinte eau{' '}
            <strong className="text-primary-700">
              grâce à nos outils clés en main.
            </strong>
          </Trans>
        </p>
        <ButtonLink
          color="secondary"
          href="/classements"
          data-cypress-id="classements-link"
          trackingEvent={homeClickClassements}>
          <Trans>Créer une campagne</Trans>
        </ButtonLink>
      </div>
    </div>
  )
}
