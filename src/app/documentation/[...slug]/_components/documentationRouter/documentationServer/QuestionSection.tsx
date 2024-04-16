import MessageIcon from '@/components/icons/MessageIcon'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Markdown from '@/design-system/utils/Markdown'
import { Rule } from 'publicodes'

export default function QuestionSection({ rule }: { rule: Rule }) {
  if (!rule.question) return null
  return (
    <>
      <Card className="mb-6">
        <h2 className="flex items-center">
          <MessageIcon className="mr-2 fill-primary-700" />{' '}
          <Trans>Question pour l'utilisateur</Trans>
        </h2>

        <p className="mb-0">{rule.question}</p>
      </Card>

      {rule.description && (
        <section>
          <h2>
            <Trans>Aide à la saisie</Trans>
          </h2>
          <Markdown>{rule.description}</Markdown>
        </section>
      )}
    </>
  )
}
