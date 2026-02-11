import CheckIcon from '@/components/icons/status/CheckIcon'
import Trans from '@/components/translation/trans/TransServer'
import type { Locale } from '@/i18nConfig'

import Ademe from '@/components/images/partners/Ademe'
import Marianne from '@/components/images/partners/Marianne'
import SaveResultsForm from './SaveResultsForm'
interface Props {
  locale: Locale
}

export default function SaveResultsBlock({ locale }: Props) {
  return (
    <section
      className="bg-primary-700 rounded-2xl p-8"
      aria-labelledby="save-results-block-title">
      <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-center">
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
              <CheckIcon className="inline-block fill-white" />

              <span>
                <Trans i18nKey="results.saveResults.listItem1" locale={locale}>
                  Retrouvez <strong>votre historique</strong>
                </Trans>
              </span>
            </li>
            <li className="inline-flex gap-2 text-white">
              <CheckIcon className="inline-block fill-white" />

              <span>
                <Trans i18nKey="results.saveResults.listItem2" locale={locale}>
                  Suivez <strong>votre évolution</strong>
                </Trans>
              </span>
            </li>
            <li className="inline-flex gap-2 text-white">
              <CheckIcon className="inline-block fill-white" />

              <span>
                <Trans i18nKey="results.saveResults.listItem3" locale={locale}>
                  Découvrez <strong>vos actions personnalisées</strong>
                </Trans>
              </span>
            </li>
          </ul>

          <SaveResultsForm />
        </div>
        <div>
          <div className="flex justify-center gap-8 rounded-2xl bg-white p-6 md:p-10">
            <Marianne className="w-16 lg:h-auto" />

            <Ademe className="h-16 lg:h-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
