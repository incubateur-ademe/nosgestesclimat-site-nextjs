import CheckIcon from '@/components/icons/status/CheckIcon'
import Trans from '@/components/translation/trans/TransServer'
import type { Locale } from '@/i18nConfig'

import SaveResultsForm from './SaveResultsForm'
interface Props {
  locale: Locale
}

export default function SaveResultsBlock({ locale }: Props) {
  return (
    <section
      className="bg-primary-700 rounded-2xl p-8"
      aria-labelledby="save-results-block-title">
      <div>
        <h3
          id="save-results-block-title"
          className="text-2xl font-bold text-white">
          <Trans i18nKey="results.saveResults.title" locale={locale}>
            Recevez-les par e-mail et accédez à votre espace personnel
          </Trans>
        </h3>

        <ul role="list" className="mb-6 flex flex-col gap-2">
          <li className="flex gap-2 text-white">
            <CheckIcon className="fill-white" />
            <Trans i18nKey="results.saveResults.listItem1" locale={locale}>
              Retrouvez <strong>votre historique</strong>
            </Trans>
          </li>
          <li className="flex gap-2 text-white">
            <CheckIcon className="fill-white" />
            <Trans i18nKey="results.saveResults.listItem2" locale={locale}>
              Suivez <strong>votre évolution</strong>
            </Trans>
          </li>
          <li className="flex gap-2 text-white">
            <CheckIcon className="fill-white" />
            <Trans i18nKey="results.saveResults.listItem3" locale={locale}>
              Découvrez <strong>vos actions personnalisées</strong>
            </Trans>
          </li>
        </ul>

        <SaveResultsForm />
      </div>
    </section>
  )
}
