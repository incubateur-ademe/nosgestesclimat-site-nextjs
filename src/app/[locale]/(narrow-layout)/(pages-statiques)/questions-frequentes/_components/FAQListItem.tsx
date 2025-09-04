import FAQTrackingWrapper from '@/components/questions-frequentes/FAQTrackingWrapper'
import Card from '@/design-system/layout/Card'

export default function FAQListItem({
  id,
  question,
  answer,
}: {
  id: string
  question: string
  answer: string
}) {
  return (
    <li key={id} className="whitespace-wrap mb-2 list-none font-bold">
      <FAQTrackingWrapper questionId={id}>
        <summary
          role="button"
          tabIndex={0}
          aria-expanded="false"
          className="cursor-pointer border-none bg-transparent text-left text-base"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              const details = e.currentTarget
                .parentElement as HTMLDetailsElement
              details.open = !details.open
            }
          }}>
          <h3 className="inline text-black">{question}</h3>
          <span className="sr-only">Cliquez pour afficher la réponse</span>
        </summary>

        <Card className="bg-primary-50 markdown m-4 rounded-sm border-none p-4 font-normal">
          <div dangerouslySetInnerHTML={{ __html: answer }} />
        </Card>
      </FAQTrackingWrapper>
    </li>
  )
}
