import PasserTestBanner from '@/components/layout/PasserTestBanner'
import Trans from '@/components/translation/trans/TransServer'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Markdown from '@/design-system/utils/Markdown'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { capitalizeString } from '@/utils/capitalizeString'
import { decodeRuleNameFromPath } from '@/utils/decodeRuleNameFromPath'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { redirect } from 'next/navigation'
import ButtonLaunch from './documentationServer/ButtonLaunch'
import CalculDetail from './documentationServer/CalculDetail'
import PagesProches from './documentationServer/PagesProches'
import QuestionSection from './documentationServer/QuestionSection'

type Props = {
  slugs: string[]
  rules: NGCRules
  locale: string
}
export default function DocumentationServer({ slugs, rules, locale }: Props) {
  const ruleName = decodeRuleNameFromPath(slugs.join('/')) as DottedName

  if (!ruleName) {
    redirect('/404')
  }

  const rule = rules?.[ruleName]

  if (!rule) {
    redirect('/404')
  }

  return (
    <div className="mt-12 w-full max-w-4xl p-4 md:mx-auto md:py-8">
      <PasserTestBanner />

      <Title
        title={`${rule.icônes ?? ''} ${capitalizeString(
          getRuleTitle({ ...rule, dottedName: ruleName })
        )}`}
        data-cypress-id="documentation-title"
      />

      {rule.question && <QuestionSection rule={rule} locale={locale} />}

      {!rule.question && rule.description && (
        <section className="mt-4">
          <Markdown>{rule.description}</Markdown>
        </section>
      )}

      {rule.note && (
        <section className="mt-4">
          <h2>
            <Trans locale={locale}>Notes</Trans>
          </h2>
          <Markdown>{rule.note}</Markdown>
        </section>
      )}

      <CalculDetail
        rule={rule}
        ruleName={ruleName}
        rules={rules}
        locale={locale}
      />

      <Card className="bg-primary-100 mt-4 mb-4 border-none">
        <p className="mb-0">
          <Trans locale={locale}>
            Pour en savoir plus sur cette règle de notre modèle, lancer le
            calcul en cliquant sur le bouton ci-dessous.
          </Trans>
        </p>
      </Card>

      <ButtonLaunch locale={locale} />

      <PagesProches rules={rules} ruleName={ruleName} />
    </div>
  )
}
