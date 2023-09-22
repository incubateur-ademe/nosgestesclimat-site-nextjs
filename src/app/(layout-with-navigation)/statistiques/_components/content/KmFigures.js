import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'

export default function KmFigures(props) {
  const userPercent = (props.kmhelp / props.simulationsfromhelp) * 100
  const ridesavg = props.ridesnumber / props.kmhelp
  const { t } = useClientTranslation()
  const { user } = useUser()

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="flex-1">
        <div>
          <p className="mb-0 text-3xl font-bold">
            {' '}
            {Math.round(userPercent).toLocaleString(user?.region?.code)}%
          </p>
          <p className="mb-0 text-sm">
            {t("ont utilisé l'aide à la saisie des km")}
          </p>
        </div>
      </Card>
      <Card className="flex-1">
        <div>
          <p className="mb-0 text-3xl font-bold">
            {Math.round(ridesavg).toLocaleString(user?.region?.code)}
          </p>
          <p className="mb-0 text-sm">{t('trajets saisis en moyenne')}</p>
        </div>
      </Card>
    </div>
  )
}
