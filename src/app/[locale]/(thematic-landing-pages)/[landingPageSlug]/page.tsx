import DynamicCTAButtons from '@/components/cta/DynamicCTAButtons'
import DailyGestures from '@/components/landing-pages/DailyGestures'
import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import FAQ from '@/components/landing-pages/FAQ'
import Legend from '@/components/landing-pages/Legend'
import MotivationSection from '@/components/landing-pages/MotivationSection'
import Partners from '@/components/landing-pages/Partners'
import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import WhatDoWeMeasure from '@/components/landing-pages/WhatDoWeMeasure'
import WhatItIs from '@/components/landing-pages/WhatItIs'
import Footer from '@/components/layout/Footer'
import Link from '@/components/Link'
import JSONLD from '@/components/seo/JSONLD'
import {
  trackingActionClickCTA,
  trackingActionClickPageBottom,
} from '@/constants/tracking/actions'
import LandingPage from '@/design-system/layout/LandingPage'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import {
  getLandingClickCTARestart,
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import type { Locale } from '@/i18nConfig'
import { fetchThematicLandingPage } from '@/services/cms/fetchThematicLandingPage'
import { fetchThematicLandingPageMetadata } from '@/services/cms/fetchThematicLandingPageMetadata'
import type { DefaultPageProps } from '@/types'
import { getArticleHref } from '@/utils/cms/getArticleHref'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params,
}: DefaultPageProps<{
  params: Promise<{ landingPageSlug: string; locale: Locale }>
}>) {
  const { landingPageSlug, locale } = await params

  const { thematicLandingPageMetadata } =
    (await fetchThematicLandingPageMetadata({
      landingPageSlug,
    })) || {}

  return getMetadataObject({
    locale,
    title:
      thematicLandingPageMetadata?.metadata?.title ||
      thematicLandingPageMetadata?.title ||
      'Landing page thématique - Nos Gestes Climat',
    description:
      'Découvrez des conseils pratiques pour réduire votre empreinte écologique.',
    alternates: {
      canonical: `/${landingPageSlug}`,
    },
  })
}

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
    block1,
    block2,
    block3,
    block4,
    block5,
    block6,
    block7,
    articlesList,
    articlesCTALink,
    articlesCTALabel,
    faq,
    htmlLegend,
  } = thematicLandingPage

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
        heroTitle={block1?.title}
        heroDescription={
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <p
              dangerouslySetInnerHTML={{
                __html: block1?.htmlDescription ?? '',
              }}></p>
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
                src={block1?.image?.url ?? ''}
                alt={block1?.image?.alternativeText ?? ''}
              />
            </div>
          </div>
        }
        heroIllustration={
          <div className="hidden md:block">
            <Image
              width={400}
              height={400}
              src={block1?.image?.url ?? ''}
              alt={block1?.image?.alternativeText ?? ''}
            />
          </div>
        }
        heroPartners={<Partners locale={locale} />}>
        {block2 && (
          <WhatItIs
            title={block2?.title}
            description={block2?.htmlDescription ?? ''}
            illustration={{
              url: block2?.image?.url ?? '',
              alternativeText: block2?.image?.alternativeText ?? '',
              className: 'py-6 md:py-10',
            }}
          />
        )}

        {block3 && (
          <WhatDoWeMeasure
            title={block3.title}
            description={block3.htmlDescription ?? ''}
            listItems={block3.listItems?.map(({ title, image }) => ({
              title,
              icon: {
                url: image?.url ?? '',
                alternativeText: image?.alternativeText ?? '',
              },
            }))}
            shouldDescriptionBeBeforeList
          />
        )}

        {block4 && (
          <DidYouKnowSlider
            slides={block4?.map(({ text, image, pinkText }) => ({
              content: text,
              illustration: image?.url ?? '',
              highlight: pinkText ?? '',
            }))}
          />
        )}

        {block5 && (
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
            title={block5.title}
            description={block5?.htmlDescription ?? ''}
            gestures={{
              default: {
                imageAlt: block5.image?.alternativeText ?? '',
                imageSrc: block5.image?.url ?? '',
                gestureList: block5.listItems?.map(({ title }) => title),
              },
            }}
          />
        )}

        {block6 && (
          <UnderstandToAct
            locale={locale}
            pathname={`/${landingPageSlug}`}
            title={block6.title}
            description={block6.htmlDescription}
            posts={
              articlesList?.map(({ category, title, slug, image }) => ({
                category: category?.title ?? '',
                title,
                href: getArticleHref({
                  categorySlug: category?.slug ?? '',
                  articleSlug: slug,
                }),
                imageSrc: image?.url ?? '',
                imageAlt: image?.alternativeText ?? '',
              })) ?? []
            }
            ctaLink={
              articlesCTALink &&
              articlesCTALabel && (
                <Link href={articlesCTALink}>{articlesCTALabel}</Link>
              )
            }
          />
        )}

        {block7 && (
          <MotivationSection
            title={block7.title}
            description={block7.htmlDescription ?? ''}
            motivationItems={block7.listItems?.map(
              ({ title, image, description }) => ({
                title,
                icon: {
                  url: image?.url ?? '',
                  alternativeText: image?.alternativeText ?? '',
                },
                description: description ?? '',
              })
            )}
          />
        )}

        <FAQ
          questions={
            faq?.questions?.map(({ question, htmlAnswer }) => ({
              question,
              answer: htmlAnswer,
            })) ?? []
          }
          subTitle={faq?.subTitle}
          shouldUseDangerouslySetInnerHTML
        />

        {htmlLegend && <Legend htmlLegend={htmlLegend} />}
      </LandingPage>

      <Footer langButtonsDisplayed={{ fr: false, en: false, es: false }} />
    </>
  )
}
