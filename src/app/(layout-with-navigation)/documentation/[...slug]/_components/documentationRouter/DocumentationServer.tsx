import LocalisationBanner from '@/components/translation/LocalisationBanner'
import Trans from '@/components/translation/Trans'
import { DATA_SERVER_URL } from '@/constants/urls'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import Markdown from '@/design-system/utils/Markdown'
import { fetchModel } from '@/helpers/data/fetchModel'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { Rules } from '@/publicodes-state/types'
import { SuppportedRegions } from '@/types/international'
import { decodeRuleNameFromPath } from '@/utils/decodeRuleNameFromPath'
import { currentLocale } from 'next-i18n-router'
import { redirect } from 'next/navigation'

type Props = {
  supportedRegions: SuppportedRegions
  slugs: string[]
}
export default async function DocumentationServer({
  supportedRegions,
  slugs,
}: Props) {
  const ruleName = decodeRuleNameFromPath(slugs.join('/'))

  const locale = currentLocale()

  if (!ruleName) {
    redirect('/404')
    return null
  }

  // We load the default rules to render the server side documentation
  const rules: Rules = await fetchModel({
    dataServer: DATA_SERVER_URL,
    regionCode: 'FR',
    locale: locale ?? 'fr',
    isOptim: false,
  })
  console.log(ruleName)
  const rule = rules[ruleName]

  const title = getRuleTitle(rule)

  if (!rule) {
    redirect('/404')
    return null
  }

  return (
    <div className="mt-4">
      <LocalisationBanner supportedRegions={supportedRegions} />

      <Title title={`${rule.icônes ?? ''} ${title}`} />

      {rule.question && (
        <>
          <Card>
            <h2>
              <Emoji>💬</Emoji> <Trans>Question pour l'utilisateur</Trans>
            </h2>
            <p>{rule.question}</p>
          </Card>

          {rule.description && (
            <section>
              <h2>
                <Emoji>ℹ️</Emoji> <Trans>Aide à la saisie</Trans>
              </h2>
              <Markdown>{rule.description}</Markdown>
            </section>
          )}
        </>
      )}

      {!rule.question && rule.description && (
        <section className="mt-4">
          <Markdown>{rule.description}</Markdown>
        </section>
      )}

      {rule.note && (
        <section className="mt-4">
          <h2>Notes</h2>
          <Markdown>{rule.note}</Markdown>
        </section>
      )}

      <Card className="mt-4 bg-primary-200">
        <p className="mb-0">
          <Trans>
            Pour en savoir plus sur cette règle de notre modèle, lancer le
            calcul en cliquant sur le bouton ci-dessous.
          </Trans>
        </p>
      </Card>
    </div>
  )
}
