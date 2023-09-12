import { useClientTranslation } from '@/hooks/useClientTranslation'
import emoji from 'react-easy-emoji'
import { humanWeight } from '../../../sites/publicodes/HumanWeight'

export default function TotalChart(props) {
  const { t, i18n } = useClientTranslation()

  const maxScore = Math.max(...props.flatScoreArray)
  const minValue = 2000 // 2 tonnes, the ultimate objective
  const max = humanWeight({ t, i18n }, maxScore, true).join(' ')
  const min = humanWeight({ t, i18n }, minValue, true).join(' ')

  return (
    <div>
      <ul
        title="Empreinte totale"
        className="relative mx-auto h-8 w-full list-none border-2 border-black">
        {props.flatScoreArray.map((elt, index) => (
          <li
            key={index}
            className="absolute -ml-2 h-full w-3 bg-primary opacity-5"
            style={{
              left: `${((elt - minValue) / (maxScore - minValue)) * 100} %`,
            }}
            title={humanWeight({ t, i18n }, elt, true).join(' ')}
            aria-label={humanWeight({ t, i18n }, elt, true).join(' ')}></li>
        ))}
      </ul>

      <div className="flex w-full justify-between">
        <small key="legendLeft">
          {emoji('🎯 ')}
          {min}
        </small>
        <small key="legendRight">{max}</small>
      </div>
    </div>
  )
}
