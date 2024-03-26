import PasserTestBanner from '@/components/layout/PasserTestBanner'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Markdown from '@/design-system/utils/Markdown'
import { getRules } from '@/helpers/modelFetching/getRules'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
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
export default async function DocumentationServer({ slugs }: Props) {
  const ruleName = decodeRuleNameFromPath(slugs.join('/'))

  if (!ruleName) {
    redirect('/404')
  }

  // We load the default rules to render the server side documentation
  const rules: Rules = await getRules({
    isOptim: false,
  })

  const rule = rules[ruleName]

  if (!rule) {
    redirect('/404')
  }

  return (
    <div className="mt-4 w-full max-w-4xl p-4 md:mx-auto md:py-8">
      <PasserTestBanner />

      <Title
        title={`${rule.icônes ?? ''} ${capitalizeString(
          getRuleTitle({ ...rule, dottedName: ruleName })
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
