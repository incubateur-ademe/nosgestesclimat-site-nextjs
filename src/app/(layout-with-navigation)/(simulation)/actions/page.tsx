import { Metadata } from 'next'
import ActionPageContent from './_components/ActionPageContent'

export const metadata: Metadata = {
  title: 'Actions - Nos Gestes Climat',
  description:
    'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.',
}

export default function ActionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  ;<ActionPageContent searchParams={searchParams} />
}
