import Trans from '@/components/translation/Trans'
import Accordion from '@/design-system/layout/Accordion'
import Title from '@/design-system/layout/Title'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'

export default function QuestionsFrequentes() {
  return (
    <section className="mt-12">
      <Title tag="h2" title={<Trans>Questions fréquentes</Trans>} />

      <Accordion className="mt-8">
        <AccordionItem
          title={
            <Trans>
              Puis-je utiliser le logo Nos Gestes Climat dans mes communications
              ?
            </Trans>
          }
          content="blablabla"
        />
        <AccordionItem
          title={
            <Trans>
              Comment regrouper les résultats par région, ville,
              établissement... ?
            </Trans>
          }
          content="blablabla"
        />

        <AccordionItem
          title={
            <Trans>
              Est-il possible de personnaliser l’affichage du test ?
            </Trans>
          }
          content="blablabla"
        />

        <AccordionItem
          title={
            <Trans>
              Qui peut consulter les résultats de mon organisation ?
            </Trans>
          }
          content="blablabla"
        />

        <AccordionItem
          title={<Trans>Les résultats du test sont-ils anonymes ?</Trans>}
          content="blablabla"
        />
      </Accordion>
    </section>
  )
}
