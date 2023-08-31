'use client'

import TransClient from '@/components/translation/TransClient'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Markdown from '@/design-system/utils/Markdown'
import { getCurrentLangInfos } from '@/locales/translation'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import GithubContributionCard from './_components/GithubContributionCard'
type FAQType = {
  question: string
  réponse: string
  catégorie: string
  id: string
}

export default function FAQ() {
  useEffect(() => {
    const handleAnchor = () => {
      if (window.location.hash) {
        const anchor = decodeURI(window.location.hash.substring(1)) // Extrait l'ancre de l'URL sans le '#'
        const questionElement = document.getElementById(anchor)
        if (questionElement) {
          // Faites défiler jusqu'à la question si nécessaire
          questionElement.scrollIntoView({ behavior: 'smooth' })
          questionElement.setAttribute('open', 'true')
        }
      }
    }

    handleAnchor()

    document.addEventListener('DOMContentLoaded', handleAnchor)

    return () => {
      document.removeEventListener('DOMContentLoaded', handleAnchor)
    }
  }, [])

  const handleDetailsToggle = (id: string, isOpen: boolean) => {
    let newURL = window.location.pathname
    if (!isOpen) {
      newURL = window.location.pathname + `#${id}`
    }
    window.history.pushState(null, '', newURL)
  }

  const { i18n } = useTranslation()
  const FAQContent = getCurrentLangInfos(i18n)
    .faqContent as unknown as FAQType[]
  const { hasData } = { hasData: false }

  /*
	const structuredFAQ = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: FAQContent.map((element) => ({
			'@type': 'Question',
			name: element.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: renderToString(<Markdown children={element.réponse} noRouter />),
			},
		})),
	}
  */
  const categories: string[] = FAQContent.reduce((memo, next) => {
    if (memo.includes(next.catégorie)) {
      return [...memo]
    }

    return [...memo, next.catégorie]
  }, [] as string[])

  const { t } = useTranslation()

  return (
    <>
      {/*
      <Meta
				title={t('meta.publicodes.FAQ.title')}
				description={t('meta.publicodes.FAQ.description')}
			>
				<script type="application/ld+json">
					{JSON.stringify(structuredFAQ)}
				</script>
			</Meta>
      */}

      <Title title={t('Questions fréquentes')} />
      <p>
        <TransClient i18nKey={'publicodes.FAQ.description'}>
          Bienvenue sur la FAQ Nos Gestes Climat ! Vous trouverez ici les
          réponses aux questions les plus fréquentes. S’il vous reste des
          interrogations ou si vous souhaitez nous proposer des améliorations,
          rendez-vous tout en bas. Bonne lecture !
        </TransClient>
      </p>
      {!hasData && (
        <p>
          <TransClient i18nKey={'publicodes.FAQ.faireletest'}>
            Vous n'avez pas encore débuté votre test,{' '}
            <strong>
              <a href="./simulateur/bilan">lancez-vous !</a>
            </strong>
          </TransClient>
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
                      <li
                        key={id}
                        className="whitespace-wrap mb-2 list-none font-bold">
                        <details id={id}>
                          <summary
                            role="button"
                            tabIndex={0}
                            className="cursor-pointer border-none bg-transparent text-left text-base"
                            onClick={(e) =>
                              handleDetailsToggle(
                                id,
                                (
                                  e?.currentTarget
                                    ?.parentElement as HTMLElement & {
                                    open: boolean
                                  }
                                )?.open ?? false
                              )
                            }
                            onKeyDown={(e) =>
                              handleDetailsToggle(
                                id,
                                (
                                  e?.currentTarget
                                    ?.parentElement as HTMLElement & {
                                    open: boolean
                                  }
                                )?.open ?? false
                              )
                            }>
                            <h3 className="inline text-black">{question}</h3>
                          </summary>
                          <Card className="m-4 p-2">
                            <Markdown>{réponse}</Markdown>
                          </Card>
                        </details>
                      </li>
                    )
                  }
                )}
              </ul>
            </li>
          )
        })}
      </div>

      <h2 className="text-3xl">
        <span className="mr-2 inline-block">🙋‍♀️</span>
        <Trans i18nKey={'publicodes.FAQ.titreQuestion'}>
          J'ai une autre question
        </Trans>
      </h2>
      <GithubContributionCard />
    </>
  )
}
