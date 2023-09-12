import { useClientTranslation } from '@/hooks/useClientTranslation'
import { getLangFromAbreviation, getLangInfos } from '@/locales/translation'

export default function KmFigures(props) {
  const userPercent = (props.kmhelp / props.simulationsfromhelp) * 100
  const ridesavg = props.ridesnumber / props.kmhelp
  const { t, i18n } = useClientTranslation()
  const currentLangInfos = getLangInfos(getLangFromAbreviation(i18n.language))

  return (
    <div>
      <div>
        <div>
          <span>
            {' '}
            {Math.round(userPercent).toLocaleString(
              currentLangInfos.abrvLocale
            )}
            %
          </span>
          <span>{t("ont utilisé l'aide à la saisie des km")}</span>
        </div>
      </div>
      <div>
        <div>
          <span>
            {Math.round(ridesavg).toLocaleString(currentLangInfos.abrvLocale)}
          </span>
          <span>{t('trajets saisis en moyenne')}</span>
        </div>
      </div>
    </div>
  )
}
