import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'

export default function KmFigures(props) {
  const userPercent = (props.kmhelp / props.simulationsfromhelp) * 100
  const ridesavg = props.ridesnumber / props.kmhelp
  const { t } = useClientTranslation()
  const { user } = useUser()

  return (
    <div>
      <div>
        <div>
          <span>
            {' '}
            {Math.round(userPercent).toLocaleString(user?.region?.code)}%
          </span>
          <span>{t("ont utilisé l'aide à la saisie des km")}</span>
        </div>
      </div>
      <div>
        <div>
          <span>{Math.round(ridesavg).toLocaleString(user?.region?.code)}</span>
          <span>{t('trajets saisis en moyenne')}</span>
        </div>
      </div>
    </div>
  )
}
