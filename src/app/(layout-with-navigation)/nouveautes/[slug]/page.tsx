import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { capitaliseString } from '@/utils/capitaliseString'
import { JSXElementConstructor } from 'react'
import posts from '../_data/articles'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params: { slug } }: Props) {
  return getMetadataObject({
    title: `${capitaliseString(decodeURI(slug))?.replaceAll(
      '-',
      ' '
    )}, nouveautés - Nos Gestes Climat`,
    description: 'Découvrez les nouveautés du site Nos Gestes Climat.',
    params: { slug },
  })
}

export default function BlogPost({ params: { slug } }: Props) {
  const markdownFile = posts.find(
    (element: any) => element.slug == decodeURI(slug as string)
  )
  const Content = markdownFile?.content as JSXElementConstructor<any>

  return (
    <div>
      <Link href="/nouveautes" className="text-sm">
        ← <Trans>Retour à la liste des nouveautes</Trans>
      </Link>
      <br />
      <br />
      {markdownFile ? (
        <Content />
      ) : (
        <Trans>Oups, nous n'avons pas d'article correspondant</Trans>
      )}
    </div>
  )
}
