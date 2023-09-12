import TransClient from '@/components/translation/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { getLangFromAbreviation, getLangInfos } from '@/locales/translation'

export default function DurationFigures(props) {
  const { i18n } = useClientTranslation()
  const currentLangInfos = getLangInfos(getLangFromAbreviation(i18n.language))

  return (
    <div className=" flex w-full justify-center pt-0 text-center lg:w-[40%] lg:flex-col lg:pt-4">
      <div className="w-full">
        <div>
          <span className="bold inline-flex items-end justify-center text-center text-2xl text-primary">
            {' '}
            {!isNaN(props.avgduration)
              ? Math.round(props.avgduration).toLocaleString(
                  currentLangInfos.abrvLocale
                )
              : '-'}
            <small className="text-lg">&nbsp;min</small>
          </span>
          <span className="bold text-center text-lg">
            <TransClient>en moyenne sur le site</TransClient>
          </span>
        </div>
      </div>
      {/* Firsly, we used to display average time spent on the /simulation/bilan test but figures seemed to be uncorrect.
			We decided to delete it until we find a better way to estimate the average time of simulation */}
    </div>
  )
}
