import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Kicker from '@/design-system/layout/Kicker'
import Screenshot from './amis/Screenshot'

export default function Amis() {
  return (
    <div className="flex-1">
      <div className="mb-6 w-full justify-center overflow-hidden rounded-lg bg-grey-100 px-8 pt-8 md:px-12 md:pt-12">
        <Screenshot />
      </div>
      <Kicker>
        <Trans>Entre amis</Trans>
      </Kicker>
      <h2 className="font-medium md:text-3xl">
        <Trans>Comparez vos résultats</Trans>
      </h2>
      <p className="max-w-sm md:mb-8 md:text-lg">
        <Trans>
          Faites le test en{' '}
          <strong className="text-primary-500">famille</strong>, entre{' '}
          <strong className="text-primary-500">amis</strong> ou{' '}
          <strong className="text-primary-500">collègues</strong> et comparez
          vos résultats.
        </Trans>
      </p>
      <ButtonLink href="/amis">
        <Trans>Commencer</Trans>
      </ButtonLink>
    </div>
  )
}
