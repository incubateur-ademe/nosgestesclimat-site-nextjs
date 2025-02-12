import MessageIcon from '@/components/icons/MessageIcon'
import TransServer from '@/components/translation/trans/TransServer'
import Card from '@/design-system/layout/Card'
import Markdown from '@/design-system/utils/Markdown'
import type { NGCRule } from '@incubateur-ademe/nosgestesclimat'

export default function QuestionSection({
  rule,
  locale,
}: {
  rule: NGCRule
  locale: string
}) {
  if (!rule.question) return null
  return (
    <>
      <Card className="mb-6">
        <h2 className="flex items-center">
          <MessageIcon className="fill-primary-700 mr-2" />{' '}
          <TransServer locale={locale}>Question pour l'utilisateur</TransServer>
        </h2>

        <p className="mb-0">{rule.question}</p>
      </Card>

      {rule.description && (
        <section>
          <h2>
            <TransServer locale={locale}>Aide à la saisie</TransServer>
          </h2>
          <Markdown>{rule.description}</Markdown>
        </section>
      )}
    </>
  )
}
