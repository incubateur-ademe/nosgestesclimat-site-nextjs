import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'

export default function ClimateAndWater() {
  return (
    <div>
      <Title tag="h2">
        <Trans>
          <strong className="text-secondary-700">Eau, climat,</strong> même
          combat ?
        </Trans>
      </Title>
      <p>
        <Trans>
          Le réchauffement climatique a un fort impact sur le cycle de l’eau.{' '}
          <Link href="/actions">
            Tous les gestes proposés pour limiter votre empreinte carbone
          </Link>{' '}
          auront donc aussi un impact pour lutter contre les dérèglements de
          l’eau.
        </Trans>
      </p>
    </div>
  )
}
