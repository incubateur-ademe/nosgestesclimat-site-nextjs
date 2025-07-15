import Trans from '@/components/translation/trans/TransServer'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { fetchArticlePageContent } from '@/services/cms/fetchArticlePageContent'
import { fetchArticlePageMetadata } from '@/services/cms/fetchArticlePageMetadata'

import ZoomOnClick from '@/components/blog/ZoomOnClick'
import Footer from '@/components/layout/Footer'
import Badge from '@/design-system/layout/Badge'
import { getLangButtonsDisplayed } from '@/helpers/language/getLangButtonsDisplayed'
import type { Locale } from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'
import parse, {
  attributesToProps,
  domToReact,
  Element,
  type DOMNode,
} from 'html-react-parser'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ArticleBreadcrumbs from './_components/ArticleBreadcrumbs'
import ArticleJSONLD from './_components/ArticleJSONLD'
import AuthorBlock from './_components/AuthorBlock'
import OtherArticles from './_components/OtherArticles'
import StickySidebar from './_components/StickySidebar'

export async function generateMetadata({
  params,
}: DefaultPageProps<{
  params: { category: string; article: string; locale: Locale }
}>) {
  const { category, article, locale } = await params

  const { metaTitle, metaDescription, image } =
    (await fetchArticlePageMetadata({
      articleSlug: article,
      locale: locale,
    })) || {}

  return getMetadataObject({
    locale,
    title: metaTitle || 'Blog - Nos Gestes Climat',
    description:
      metaDescription ||
      'Découvrez des conseils pratiques pour réduire votre empreinte écologique.',
    image: image?.url || '',
    alternates: {
      canonical: `/blog/${category}/${article}`,
    },
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; article: string; locale: Locale }>
}) {
  const { category, article: articleSlug, locale } = await params

  const { article, otherArticles } =
    (await fetchArticlePageContent({
      articleSlug: articleSlug,
      categorySlug: category,
      locale,
    })) || {}

  const langButtonsDisplayed = await getLangButtonsDisplayed({
    category,
    article: articleSlug,
  })

  if (!article) {
    return notFound()
  }

  return (
    <>
      <ArticleJSONLD article={article} />

      <div className="relative max-w-5xl px-4 md:mx-auto lg:px-0">
        <ArticleBreadcrumbs
          categorySlug={category}
          articleSlug={articleSlug}
          articleTitle={article.title}
          categoryTitle={article.category?.title ?? ''}
        />

        <div className="mb-16 flex flex-col items-start gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col items-start md:w-8/12">
            <Badge className="mb-4" size="sm">
              {article.category?.title ?? ''}
            </Badge>

            <h1 className="mb-6 text-3xl font-bold md:text-5xl">
              {article.title}
            </h1>

            <div className="flex flex-row gap-3">
              <p className="mb-0 text-lg">
                <span className="text-primary-600">
                  <Trans locale={locale}>Temps de lecture :</Trans>
                </span>{' '}
                {Math.round(article.duration / 60)}{' '}
                <Trans locale={locale}>minutes</Trans>
              </p>

              <span className="text-lg text-gray-500">|</span>

              <p className="mb-0 text-lg">
                <span className="text-primary-600">
                  <Trans locale={locale}>Publié le :</Trans>
                </span>{' '}
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString('fr')
                  : ''}
              </p>
            </div>
          </div>

          <div className="md:w-4/12">
            <Image
              className="rounded-md"
              src={article.image?.url ?? ''}
              alt={article.image?.alternativeText ?? ''}
              width={420}
              height={420}
            />
          </div>
        </div>

        <StickySidebar
          article={article}
          category={category}
          articleSlug={articleSlug}
        />

        <div className="relative mt-8 flex max-w-5xl flex-col flex-nowrap gap-8 overflow-visible md:mx-auto md:mt-0 md:flex-row md:items-stretch">
          <div className="max-w-full md:w-8/12">
            <div className="markdown max-w-full border-b border-gray-300 pb-8">
              {parse(article.htmlContent ?? '', {
                replace: (domNode: DOMNode) => {
                  if (!(domNode instanceof Element && domNode.type === 'tag')) {
                    return domToReact([domNode])
                  }

                  // Look for a <p> tag that directly wraps an <img> tag.
                  // This is a common pattern from Rich Text Editors in CMSs.
                  if (
                    domNode.name === 'p' &&
                    domNode.children[0] &&
                    domNode.children[0] instanceof Element &&
                    domNode.children[0].name === 'img'
                  ) {
                    const imgNode = domNode.children[0]
                    if (imgNode.attribs?.src) {
                      console.log(
                        'Image wrapped in a paragraph found. Replacing...'
                      )
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const { style, ...props } = attributesToProps(
                        imgNode.attribs
                      )
                      return (
                        <ZoomOnClick
                          {...props}
                          src={props.src as string}
                          alt={props.alt as string}
                        />
                      )
                    }
                  }

                  // Let the parser handle all other nodes as usual.
                  return domToReact([domNode])
                },
              })}
            </div>
          </div>
        </div>
      </div>

      <AuthorBlock author={article.author} />
      <OtherArticles articles={otherArticles} locale={locale} />

      <Footer langButtonsDisplayed={langButtonsDisplayed} />
    </>
  )
}
