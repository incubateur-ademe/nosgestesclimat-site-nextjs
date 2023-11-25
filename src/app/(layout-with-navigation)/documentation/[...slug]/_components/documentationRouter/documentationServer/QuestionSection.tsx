import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import Markdown from '@/design-system/utils/Markdown'
import { Rule } from 'publicodes'

export default function QuestionSection({ rule }: { rule: Rule }) {
  if (!rule.question) return null
  return (
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
  )
}
