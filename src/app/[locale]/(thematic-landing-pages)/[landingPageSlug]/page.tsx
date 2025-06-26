import DynamicCTAButtons from '@/components/cta/DynamicCTAButtons'
import DailyGestures from '@/components/landing-pages/DailyGestures'
import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import FAQ from '@/components/landing-pages/FAQ'
import MotivationSection from '@/components/landing-pages/MotivationSection'
import Partners from '@/components/landing-pages/Partners'
import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import WhatDoWeMeasure from '@/components/landing-pages/WhatDoWeMeasure'
import WhatItIs from '@/components/landing-pages/WhatItIs'
import Footer from '@/components/layout/Footer'
import JSONLD from '@/components/seo/JSONLD'
import {
  trackingActionClickCTA,
  trackingActionClickPageBottom,
} from '@/constants/tracking/actions'
import LandingPage from '@/design-system/layout/LandingPage'
import {
  getLandingClickCTARestart,
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import type { Locale } from '@/i18nConfig'
import { fetchThematicLandingPage } from '@/services/cms/fetchThematicLandingPage'
import type { DefaultPageProps } from '@/types'
import { getArticleHref } from '@/utils/cms/getArticleHref'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function ThematicLandingPage({
  params,
}: DefaultPageProps<{
  params: Promise<{ landingPageSlug: string; locale: Locale }>
}>) {
  const { landingPageSlug, locale } = await params
  const { thematicLandingPage } =
    (await fetchThematicLandingPage({
      landingPageSlug,
    })) ?? {}

  if (!thematicLandingPage) {
    redirect('/404')
  }

  const {
    heroTitle,
    heroImage,
    htmlHeroText,
    secondBlockTitle,
    secondBlockImage,
    htmlSecondBlockText,
    thirdBlockTitle,
    htmlThirdBlockText,
    thirdBlockList,
    actionsBlockTitle,
    actionsBlockImage,
    htmlActionsBlockText,
    actionsBlockList,
    articlesBlockTitle,
    htmlArticlesBlockText,
    articlesBlockArticles,
    seventhBlockTitle,
    carouselItems,
    htmlSeventhBlockText,
    seventhBlockList,
    faq,
  } = thematicLandingPage
  console.log(heroImage)
  return (
    <>
      <JSONLD
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'https://nosgestesclimat.fr',
            name: 'Nos Gestes Climat',
            logo: 'https://nosgestesclimat.fr/_next/image?url=%2Fimages%2Fmisc%2Fpetit-logo%403x.png&w=640&q=75',
          },

          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq?.questions?.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ]}
      />

      <LandingPage
        heroTitle={heroTitle}
        heroDescription={
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <p dangerouslySetInnerHTML={{ __html: htmlHeroText }}></p>
            <div className="flex w-full justify-center md:justify-start">
              <DynamicCTAButtons
                trackingEvents={{
                  start: getLandingClickCTAStart(
                    `/${landingPageSlug}`,
                    trackingActionClickCTA
                  ),
                  resume: getLandingClickCTAResume(
                    `/${landingPageSlug}`,
                    trackingActionClickCTA
                  ),
                  results: getLandingClickCTAResults(
                    `/${landingPageSlug}`,
                    trackingActionClickCTA
                  ),
                  restart: getLandingClickCTARestart(
                    `/${landingPageSlug}`,
                    trackingActionClickCTA
                  ),
                }}
              />
            </div>

            <div className="mx-auto mt-4 max-w-80 md:mt-0 md:hidden">
              <Image
                width={280}
                height={280}
                src={heroImage?.url ?? undefined}
                alt={heroImage?.alternativeText ?? ''}
              />
            </div>
          </div>
        }
        heroIllustration={
          <div className="hidden md:block">
            <Image
              width={400}
              height={400}
              src={heroImage?.url ?? undefined}
              alt={heroImage?.alternativeText ?? ''}
            />
          </div>
        }
        heroPartners={<Partners locale={locale} />}>
        <WhatItIs
          title={secondBlockTitle}
          description={htmlSecondBlockText}
          illustration={{
            url: secondBlockImage?.url ?? '',
            alternativeText: secondBlockImage?.alternativeText ?? '',
            className: 'py-6 md:py-10',
          }}
        />

        <WhatDoWeMeasure
          title={thirdBlockTitle}
          description={htmlThirdBlockText}
          listItems={thirdBlockList?.map(({ title, icon }) => ({
            title,
            icon: {
              url: icon?.url ?? '',
              alternativeText: icon?.alternativeText ?? '',
            },
          }))}
        />

        <DidYouKnowSlider
          slides={carouselItems?.map(({ text, icon }) => ({
            content: text,
            illustration: icon?.url ?? undefined,
          }))}
        />
        <DailyGestures
          trackingEvents={{
            start: getLandingClickCTAStart(
              `/${landingPageSlug}`,
              trackingActionClickPageBottom
            ),
            resume: getLandingClickCTAResume(
              `/${landingPageSlug}`,
              trackingActionClickPageBottom
            ),
            results: getLandingClickCTAResults(
              `/${landingPageSlug}`,
              trackingActionClickPageBottom
            ),
          }}
          title={actionsBlockTitle}
          description={htmlActionsBlockText}
          gestures={{
            default: {
              imageAlt: actionsBlockImage?.alternativeText ?? '',
              imageSrc: actionsBlockImage?.url ?? undefined,
              gestureList: actionsBlockList?.map(({ title }) => title),
            },
          }}
        />

        <UnderstandToAct
          locale={locale}
          pathname={`/${landingPageSlug}`}
          title={articlesBlockTitle}
          description={htmlArticlesBlockText}
          posts={articlesBlockArticles?.map(
            ({ category, title, slug, image }) => ({
              category: category?.title ?? '',
              title,
              href: getArticleHref({
                categorySlug: category?.slug ?? '',
                articleSlug: slug,
              }),
              imageSrc: image?.url ?? '',
              imageAlt: image?.alternativeText ?? '',
            })
          )}
        />

        <MotivationSection
          title={seventhBlockTitle}
          description={htmlSeventhBlockText}
          motivationItems={seventhBlockList?.map(({ title, icon, text }) => ({
            title,
            icon: {
              url: icon?.url ?? '',
              alternativeText: icon?.alternativeText ?? '',
            },
            description: text ?? '',
          }))}
        />

        <FAQ questions={faq?.questions ?? []} />
      </LandingPage>

      <Footer />
    </>
  )
}
