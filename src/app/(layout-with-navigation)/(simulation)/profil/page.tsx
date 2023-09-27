import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useSupportedRegions } from '@/hooks/useSupportedRegions'
import { FormProvider } from '@/publicodes-state'
import { Metadata } from 'next'
import ProfilPageContent from './_components/ProfilPageContent'

export const metadata: Metadata = {
  title: 'Mon profil, voir mon empreinte carbone - Nos Gestes Climat',
  description:
    'Explorez et modifiez les informations que vous avez saisies dans le parcours nosgestesclimat.',
}

export default async function Profil() {
  const supportedRegions = await useSupportedRegions()

  return (
    <FormProvider>
      <Title title={<Trans>Mon profil</Trans>} />
      <ProfilPageContent supportedRegions={supportedRegions} />
    </FormProvider>
  )
}
