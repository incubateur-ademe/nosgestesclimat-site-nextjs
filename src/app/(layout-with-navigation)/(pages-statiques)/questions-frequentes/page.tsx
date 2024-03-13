import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getCurrentLangInfos } from '@/locales/translation'
import FAQListItem from './_components/FAQListItem'
import Scroller from './_components/Scroller'

type FAQType = {
  question: string
  réponse: string
  catégorie: string
  id: string
}

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Questions fréquentes sur notre calcul d'empreinte climat - Nos Gestes Climat",
    description:
      'Retrouvez les réponses aux questions les plus fréquentes sur  Nos Gestes Climat.',
    alternates: {
      canonical: '/questions-frequentes',
    },
  })
}

export default async function FAQPage() {
  const { i18n, t } = await getServerTranslation()

  const FAQContent = getCurrentLangInfos(i18n)
    .faqContent as unknown as FAQType[]

  const { hasData } = { hasData: false }

  const categories: string[] = FAQContent.reduce((memo, next) => {
    if (memo.includes(next.catégorie)) {
      return [...memo]
    }

    return [...memo, next.catégorie]
  }, [] as string[])

  return (
    <>
      <Title title={t('Questions fréquentes')} />

      <Scroller />

      <p>
        <Trans i18nKey={'publicodes.FAQ.description'}>
          Bienvenue sur la FAQ Nos Gestes Climat ! Vous trouverez ici les
          réponses aux questions les plus fréquentes. S’il vous reste des
          interrogations ou si vous souhaitez nous proposer des améliorations,
          rendez-vous tout en bas. Bonne lecture !
        </Trans>
      </p>

      {!hasData && (
        <p>
          <Trans i18nKey={'publicodes.FAQ.faireletest'}>
            Vous n'avez pas encore débuté votre test,{' '}
            <strong>
              <a href="./simulateur/bilan">lancez-vous !</a>
            </strong>
          </Trans>
        </p>
      )}

      <div className="pb-4">
        {categories.map((category) => {
          return (
            <li key={category} className="list-none">
              <h2 className="capitalize">{category}</h2>
              <ul className="pl-2">
                {FAQContent.filter((el) => el.catégorie === category).map(
                  ({
                    question,
                    réponse,
                    id,
                  }: {
                    question: string
                    réponse: string
                    id: string
                  }) => {
                    return (
                      <FAQListItem
                        id={id}
                        key={id}
                        question={question}
                        réponse={réponse}
                      />
                    )
                  }
                )}
              </ul>
            </li>
          )
        })}
      </div>

      <Card className="bg-primary-100">
        <h3>
          <Trans>
            Je ne trouve pas réponse à ma question{' '}
            <Emoji className="mr-2 inline-block">🙋‍♀️</Emoji>
          </Trans>
        </h3>
        <p className="mb-0">
          <Trans>
            Vous pouvez nous contacter via notre page de contact :{' '}
            <Link href="/contact">accéder à notre page de contact</Link>.
          </Trans>
        </p>
      </Card>
    </>
  )
}
