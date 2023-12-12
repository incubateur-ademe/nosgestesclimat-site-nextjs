import Trans from '@/components/translation/Trans'
import { DEFAULT_MODEL_VERSION } from '@/constants/modelAPI'
import { NGC_MODEL_API_URL } from '@/constants/urls'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Markdown from '@/design-system/utils/Markdown'
import { fetchModel } from '@/helpers/data/fetchModel'
import { Rules } from '@/publicodes-state/types'
import { SuppportedRegions } from '@/types/international'
import { capitalizeString } from '@/utils/capitalizeString'
import { decodeRuleNameFromPath } from '@/utils/decodeRuleNameFromPath'
import { redirect } from 'next/navigation'
import ButtonLaunch from './documentationServer/ButtonLaunch'
import CalculDetail from './documentationServer/CalculDetail'
import PagesProches from './documentationServer/PagesProches'
import QuestionSection from './documentationServer/QuestionSection'

type Props = {
  supportedRegions: SuppportedRegions
  slugs: string[]
  locale?: string
}
export default async function DocumentationServer({
  slugs,
  // This is a hack, we should be able to use currentLocale() from the i18n package
  // but it breaks the app when used in the server side
  locale,
}: Props) {
  const ruleName = decodeRuleNameFromPath(slugs.join('/'))

  if (!ruleName) {
    redirect('/404')
  }

  // We load the default rules to render the server side documentation
  const rules: Rules = await fetchModel({
    dataServer: `${NGC_MODEL_API_URL}/${DEFAULT_MODEL_VERSION}`,
    regionCode: 'FR',
    locale: locale ?? 'fr',
    isOptim: false,
  })

  const rule = rules[ruleName]

  if (!rule) {
    redirect('/404')
  }

  return (
    <div className="mt-4 w-full max-w-4xl p-4 md:mx-auto md:py-8">
      <Title
        title={`${rule.icônes ?? ''} ${capitalizeString(
          rule?.titre ??
            ruleName?.split(' . ')[ruleName?.split(' . ').length - 1]
        )}`}
        data-cypress-id="documentation-title"
      />

      {rule.question && <QuestionSection rule={rule} />}

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

      <CalculDetail rule={rule} ruleName={ruleName} rules={rules} />

      <Card className="mb-4 mt-4 bg-primary-200">
        <p className="mb-0">
          <Trans>
            Pour en savoir plus sur cette règle de notre modèle, lancer le
            calcul en cliquant sur le bouton ci-dessous.
          </Trans>
        </p>
      </Card>

      <ButtonLaunch />

      <PagesProches rules={rules} ruleName={ruleName} />
    </div>
  )
}
