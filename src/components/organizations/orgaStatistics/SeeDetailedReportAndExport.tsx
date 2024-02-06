import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { usePathname } from 'next/navigation'

export default function SeeDetailedReportAndExport() {
  const pathname = usePathname()

  return (
    <section className="mt-16 flex gap-4 pb-8">
      <ButtonLink size="lg" href={`${pathname}/resultats-detailles`}>
        <Trans>Voir le rapport détaillé</Trans>
      </ButtonLink>

      <Button size="lg" color="text">
        <Trans>Exporter les données</Trans>
      </Button>
    </section>
  )
}
