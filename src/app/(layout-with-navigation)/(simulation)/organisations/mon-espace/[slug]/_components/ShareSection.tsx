import MaxWidthContent from '@/components/layout/MaxWidthContent'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import CopyInput from '@/design-system/inputs/CopyInput'
import { Organisation } from '@/types/organisations'
import CTACard from './CTACard'

export default function ShareSection({
  organisation,
}: {
  organisation: Organisation
}) {
  return (
    <section className="rounded-lg bg-grey-100 px-4 py-10">
      <MaxWidthContent className="mt-0">
        <div className="flex flex-wrap items-start gap-8 md:flex-nowrap">
          <CTACard
            overLabel={<Trans>Via un lien de partage</Trans>}
            title={<Trans>Partager le test</Trans>}
            description={
              <Trans>
                Partagez simplement cette page à vos employés, utilisateurs,
                élèves, et suivez leurs résultats
              </Trans>
            }>
            <CopyInput
              textToCopy={`${window.location.origin}/o/${organisation?.slug}/${organisation?.polls[0].slug}`}
            />
          </CTACard>

          <CTACard
            overLabel={<Trans>Services web et mobiles</Trans>}
            title={<Trans>Intégration en iframe</Trans>}
            description={
              <Trans>
                Intégrez le test sur un article de blog, ou une page dédiée de
                votre site ou application mobile{' '}
              </Trans>
            }>
            <ButtonLink href="/diffuser" className="self-start">
              <Trans>Découvrez le guide</Trans>
            </ButtonLink>
          </CTACard>
        </div>
      </MaxWidthContent>
    </section>
  )
}
