import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { useUser } from '@/publicodes-state'

export default function DurationFigures(props) {
  const { user } = useUser()

  return (
    <div className="flex w-full lg:flex-col">
      <div className="w-full">
        <Card>
          <p className="mb-0 inline-flex items-end text-3xl font-bold">
            {' '}
            {!isNaN(props.avgduration)
              ? Math.round(props.avgduration).toLocaleString(user?.region?.code)
              : '-'}
            <small className="text-lg">&nbsp;min</small>
          </p>
          <p className="mb-0 text-sm">
            <Trans>en moyenne sur le site</Trans>
          </p>
        </Card>
      </div>
      {/* Firsly, we used to display average time spent on the /simulation/bilan test but figures seemed to be uncorrect.
			We decided to delete it until we find a better way to estimate the average time of simulation */}
    </div>
  )
}
