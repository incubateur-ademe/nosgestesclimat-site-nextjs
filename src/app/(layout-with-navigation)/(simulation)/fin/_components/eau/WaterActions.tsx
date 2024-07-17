import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useActions } from '@/publicodes-state'
import Action from '../carbone/subcategories/subcategory/actions/Action'

export default function WaterActions() {
  const { orderedActions } = useActions({ metric: 'eau' })

  const firstThreeActions = orderedActions.slice(0, 3)

  return (
    <div>
      <Title tag="h2">
        <Trans>
          Comment <strong className="text-secondary-700">agir</strong> ?
        </Trans>
      </Title>
      <p className="mb-6 text-sm">
        <Trans>
          Voici quelques idées pour vous aider à réduire votre impact sur le
          cycle de l’eau :
        </Trans>
      </p>
      <div className="mb-4 flex flex-row-reverse justify-center gap-4">
        {firstThreeActions.map((action, index) => (
          <Action key={action} action={action} index={index} metric="eau" />
        ))}
      </div>
    </div>
  )
}
