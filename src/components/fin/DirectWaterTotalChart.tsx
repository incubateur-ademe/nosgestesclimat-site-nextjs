import DirectWaterTotalNumber from './directWaterTotalChart/DirectWaterTotalNumber'
import WaveContent from './directWaterTotalChart/WaveContent'

export default function DirectWaterTotalChart() {
  return (
    <div className="relative">
      <DirectWaterTotalNumber />
      <WaveContent />
    </div>
  )
}
