import CheckIcon from '@/components/icons/status/CheckIcon'
import Trans from '@/components/translation/trans/TransServer'
import type { Locale } from '@/i18nConfig'

import Ademe from '@/components/images/partners/Ademe'
import Marianne from '@/components/images/partners/Marianne'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { type UserServer } from '@/helpers/server/model/user'
import type { TFunction } from 'i18next'
import Image from 'next/image'
import SaveResultsForm from './SaveResultsForm'
interface Props {
  locale: Locale
  user?: UserServer | null
  t: TFunction
}

export default function SaveResultsBlock({ locale, user, t }: Props) {
  const isAuthentified = !!user

  return (
    <section
      className="bg-primary-700 rounded-2xl p-8"
      aria-labelledby="save-results-block-title">
      <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-center">
        <div className="flex-1">
          <h3
            id="save-results-block-title"
            className="text-2xl font-bold text-white">
            {isAuthentified ? (
              <Trans
                i18nKey="results.saveResults.title.authenticated"
                locale={locale}>
                Accédez à votre espace personnel
              </Trans>
            ) : (
              <Trans
                i18nKey="results.saveResults.title.unauthenticated"
                locale={locale}>
                Recevez-les par e-mail et accédez à votre espace personnel
              </Trans>
            )}
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

          {isAuthentified ? (
            <ButtonLink color="borderless" href={MON_ESPACE_PATH}>
              <Trans
                i18nKey="results.saveResults.buttonLabel.authenticated"
                locale={locale}>
                Voir l’évolution de mon résultat
              </Trans>
            </ButtonLink>
          ) : (
            <SaveResultsForm />
          )}
        </div>
        <div>
          {isAuthentified ? (
            <div className="flex w-full justify-center">
              <Image
                src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/visuel_login_cbf2f03684.svg"
                alt={t(
                  "Exemple de courbe de progression de mon empreinte, et de répartition de l'empreinte sur les catégories transport, logement, alimentation, divers et services.",
                  'results.saveResults.imageAlt'
                )}
                width="300"
                height="300"
              />
            </div>
          ) : (
            <div className="flex justify-center gap-8 rounded-2xl bg-white p-6 md:p-10">
              <Marianne className="w-16 lg:h-auto" />

              <Ademe className="h-16 lg:h-auto" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
