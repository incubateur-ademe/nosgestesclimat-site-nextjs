import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransServer'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getCurrentLangInfos } from '@/locales/translation'
import type { DefaultPageProps } from '@/types'
import Image from 'next/image'
import DoTheTest from './_components/DoTheTest'
import FAQListItem from './_components/FAQListItem'
import Scroller from './_components/Scroller'

type FAQType = {
  question: string
  réponse: string
  catégorie: string
  id: string
}

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t(
      "Questions fréquentes sur notre calcul d'empreinte climat - Nos Gestes Climat"
    ),
    description: t(
      'Retrouvez les réponses aux questions les plus fréquentes sur  Nos Gestes Climat.'
    ),
    alternates: {
      canonical: '/questions-frequentes',
    },
  })
}

export default async function FAQPage({ params }: DefaultPageProps) {
  const { locale } = await params
  const { i18n, t } = await getServerTranslation({ locale })

  const FAQContent = getCurrentLangInfos(i18n)
    .faqContent as unknown as FAQType[]

  const categories: string[] = FAQContent.reduce((memo, next) => {
    if (memo.includes(next.catégorie)) {
      return [...memo]
    }

    return [...memo, next.catégorie]
  }, [] as string[])

  return (
    <>
      <div className="flex flex-wrap gap-8 pb-8 md:flex-nowrap">
        <div className="mt-8">
          <Title title={t('Questions fréquentes')} />

          <Scroller />

          <p>
            <Trans locale={locale}>
              Levez la main, on répond à vos questions !
            </Trans>
          </p>
          <p>
            <Trans locale={locale}>
              Vous trouverez ici les réponses aux questions les plus fréquentes.
              S'il vous reste des interrogations ou si vous souhaitez nous
              proposer des améliorations, rendez-vous tout en bas. Bonne lecture
              !
            </Trans>
          </p>

          <DoTheTest />
        </div>

        <Image
          className="-mt-4 ml-auto w-48 self-start md:w-full"
          src="/images/illustrations/children-holding-hand.png"
          width="300"
          height="400"
          alt={t("Des enfants sortant de l'école en se tenant la main.")}
        />
      </div>

      <div className="pb-4">
        {categories.map((category) => {
          return (
            <li key={category} className="list-none">
              <h2 className="mt-8 capitalize">{category}</h2>
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

      <Card className="bg-gray-100">
        <h3 className="text-yellow-dark flex items-center">
          <Trans locale={locale}>Je ne trouve pas réponse à ma question </Trans>

          <Emoji className="ml-2 inline-block">🙋‍♀️</Emoji>
        </h3>
        <p className="mb-0">
          <Trans locale={locale}>
            Vous pouvez nous contacter via notre page de contact :{' '}
            <Link href="/contact">accéder à notre page de contact</Link>.
          </Trans>
        </p>
      </Card>
    </>
  )
}
