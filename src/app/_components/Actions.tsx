import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Kicker from '@/design-system/layout/Kicker'
import Image from 'next/image'

export default function Actions() {
  return (
    <div className="flex-1">
      <Image
        src="/images/misc/actions-screenshot.svg"
        alt="actions"
        width="444"
        height="275"
        className="mb-6 block h-auto max-w-full "
      />
      <Kicker>
        <Trans>Agir pour le climat</Trans>
      </Kicker>
      <h2 className="font-medium md:text-3xl">
        <Trans>Comment agir&#8239;?</Trans>
      </h2>
      <p className="max-w-xs md:mb-8 md:max-w-sm md:text-lg">
        <Trans>
          Découvrez nos <span>pistes personnalisées</span> pour agir dès
          aujourd’hui pour le climat.
        </Trans>
      </p>
      <ButtonLink color="secondary" href="/actions">
        <Trans>Toutes les actions</Trans>
      </ButtonLink>
    </div>
  )
}
