import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ActionDetail from './_components/ActionDetail'

export function generateMetadata() {
  return getMetadataObject({
    title:
      "Actions, suite à votre simulation d'empreinte climat - Nos Gestes Climat",
    description:
      'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.',
  })
}

export default function ActionDetailPage({
  params,
}: {
  params: { dottedName: string[] }
}) {
  return (
    <div className="mx-auto max-w-[600px]">
      <AutoCanonicalTag />

      <ButtonLink
        size="sm"
        color="text"
        href="/actions"
        className="flex items-center">
        <span
          role="img"
          className="pr-2 !text-[0.5rem]"
          aria-label="arrow pointing left">
          ◀
        </span>{' '}
        <Trans> Retour à la liste</Trans>
      </ButtonLink>

      <ActionDetail params={params} />
    </div>
  )
}
