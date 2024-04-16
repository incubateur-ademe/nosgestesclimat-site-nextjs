import Accordion from '@/design-system/layout/Accordion'
import Title from '@/design-system/layout/Title'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'

export default function QuestionsFrequentes() {
  return (
    <section className="mt-12">
      <Title tag="h2" title={<NGCTrans>Questions fréquentes</NGCTrans>} />

      <Accordion className="mt-8">
        <AccordionItem
          title={
            <NGCTrans>
              Puis-je utiliser le logo Nos Gestes Climat dans mes communications
              ?
            </NGCTrans>
          }
          content="blablabla"
        />
        <AccordionItem
          title={
            <NGCTrans>
              Comment regrouper les résultats par région, ville,
              établissement... ?
            </NGCTrans>
          }
          content="blablabla"
        />

        <AccordionItem
          title={
            <NGCTrans>
              Est-il possible de personnaliser l’affichage du test ?
            </NGCTrans>
          }
          content="blablabla"
        />

        <AccordionItem
          title={
            <NGCTrans>
              Qui peut consulter les résultats de mon organisation ?
            </NGCTrans>
          }
          content="blablabla"
        />

        <AccordionItem
          title={<NGCTrans>Les résultats du test sont-ils anonymes ?</NGCTrans>}
          content="blablabla"
        />
      </Accordion>
    </section>
  )
}
