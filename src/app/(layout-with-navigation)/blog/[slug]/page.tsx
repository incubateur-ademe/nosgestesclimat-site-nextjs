import { capitaliseString } from '@/utils/capitaliseString'
import { Metadata } from 'next'
import Content from './_components/Content'

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return {
    title: `${capitaliseString(decodeURI(slug))?.replaceAll(
      '-',
      ' '
    )}, article du blog - Nos Gestes Climat`,
    description: 'Découvrez les articles de blog du site Nos Gestes Climat.',
  }
}

export default function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  return <Content slug={slug} />
}
