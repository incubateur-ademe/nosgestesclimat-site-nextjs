import Explanation from '@/components/simulation/topBar/Explanation'
import InteractiveResultBlock from './resultsBlocksDesktop/InteractiveResultBlock'

export default function ResultsBlocksDesktop() {
  return (
    <section className="relative hidden flex-col gap-4 md:flex">
      <InteractiveResultBlock metric="carbone" />
      <InteractiveResultBlock metric="eau" />

      <Explanation />
    </section>
  )
}
