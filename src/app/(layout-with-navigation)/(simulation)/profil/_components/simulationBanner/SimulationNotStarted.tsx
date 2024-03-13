import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import TutorialLink from './_components/TutorialLink'

export default function SimulationNotStarted() {
  return (
    <Card className="my-4 flex !w-[35rem] max-w-full items-start gap-2 !shadow-none md:p-8">
      <p>
        <span
          role="img"
          aria-label="hole emoji"
          className="mb-2 mr-4 block text-center text-3xl md:mb-0 md:inline-block">
          🕳️
        </span>
        <Trans>Vous n'avez pas encore fait le test.</Trans>
      </p>

      <div className="md: flex w-full flex-wrap items-center justify-start gap-4">
        <ButtonLink href="/simulateur/bilan">
          <ProgressCircle className="mr-2" white />
          <Trans>Faire le test</Trans>
        </ButtonLink>
        <TutorialLink />
      </div>
    </Card>
  )
}
