import Trans from '@/components/translation/Trans'
import TotalCard from './TotalCard'

export default function Results() {
  return (
    <>
      <h2 className="text-lg">
        <Trans>Votre bilan</Trans>
      </h2>

      <TotalCard />
    </>
  )
}
