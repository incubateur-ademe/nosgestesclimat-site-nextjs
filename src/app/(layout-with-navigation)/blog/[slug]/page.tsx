import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { capitaliseString } from '@/utils/capitaliseString'
import Content from './_components/Content'

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}) {
  return getMetadataObject({
    title: `${capitaliseString(decodeURI(slug))?.replaceAll(
      '-',
      ' '
    )}, article du blog - Nos Gestes Climat`,
    description: 'Découvrez les articles de blog du site Nos Gestes Climat.',
    params: { slug },
  })
}

export default function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  return <Content slug={slug} />
}
