import TransClient from '@/components/translation/TransClient'
import Card from '@/design-system/layout/Card'
import { useEffect, useState } from 'react'
export default function Evolution(props) {
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    const lastPeriod = props.reference - props.period
    const difference = props.period - lastPeriod
    setPercent((difference / lastPeriod) * 100)
  }, [props.period, props.reference])

  // We didn't track this stat at the beginning so we're guessing based on todays average completion
  const baseSimulations = 32015
  const simulations = props.simulations

  return (
    <div>
      <Card>
        <span className="text-3xl font-bold">
          {props.allTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
        </span>{' '}
        &nbsp;<TransClient>visites depuis le lancement</TransClient>
      </Card>
      <Card>
        <span className="text-3xl font-bold">
          {percent > 0 && '+'}
          {Math.round(percent * 10) / 10}%
        </span>
        <TransClient>
          de visites ce mois ci
          <Small>&nbsp;(par rapport au mois d'avant)</Small>
        </TransClient>
        <div>
          <span className="text-3xl font-bold">
            {(simulations?.nb_visits + baseSimulations)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
          </span>{' '}
          <TransClient>simulations terminées depuis le lancement</TransClient>
        </div>
      </Card>
    </div>
  )
}
