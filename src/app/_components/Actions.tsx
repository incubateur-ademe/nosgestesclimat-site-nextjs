import Trans from '@/components/translation/Trans'
import { homeClickActions } from '@/constants/tracking/pages/home'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Kicker from '@/design-system/layout/Kicker'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function Actions() {
  const { t } = await getServerTranslation()

  return (
    <div className="flex-1">
      <Image
        src="/images/misc/actions-screenshot.svg"
        alt="Une capture d'écran de l'écran actions de Nos Gestes Climat."
        width="444"
        height="275"
        className="mb-6 block h-auto max-w-full "
      />
      <Kicker>
        <Trans>Agir pour le climat</Trans>
      </Kicker>
      <h2 className="font-medium md:text-3xl">{t('Comment agir\u202f?')}</h2>
      <p className="max-w-xs md:mb-8 md:max-w-sm md:text-lg">
        <Trans>Découvrez nos</Trans>{' '}
        <strong className="text-primary-700">
          <Trans>pistes personnalisées</Trans>
        </strong>{' '}
        <Trans>pour agir dès aujourd'hui pour le climat.</Trans>
      </p>
      <ButtonLink
        color="secondary"
        href="/actions"
        trackingEvent={homeClickActions}
        data-cypress-id="actions-link">
        <Trans>Toutes les actions</Trans>
      </ButtonLink>
    </div>
  )
}
