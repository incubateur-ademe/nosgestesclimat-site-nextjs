import Trans from '@/components/translation/trans/TransServer'
import Button from '@/design-system/buttons/Button'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import SavePlanLink from './SavePlanLink'

interface Props {
  hasCommittedToActions: boolean
}

export default async function DesktopSaveSelectionButtonSection({
  hasCommittedToActions,
}: Props) {
  const { t } = await getServerTranslation()
  return (
    <div className="-mx-4 flex justify-center border-t border-slate-300 pt-5">
      {hasCommittedToActions ? (
        <SavePlanLink>
          <Trans i18nKey="actions.basket.saveButton.label">
            Sauvegarder mon plan d'action
          </Trans>
        </SavePlanLink>
      ) : (
        <Button
          disabled
          aria-label={t(
            'actions.basket.saveButton.ariaLabel',
            "Sauvegarder mon plan d'actions et accéder à ma page plan d'actions"
          )}
          className="text-sm!">
          <Trans i18nKey="actions.basket.saveButton.label">
            Sauvegarder mon plan d'action
          </Trans>
        </Button>
      )}
    </div>
  )
}
