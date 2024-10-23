import Header from '@/components/layout/Header'
import Trans from '@/components/translation/Trans'
import Main from '@/design-system/layout/Main'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Ambassadeurs from './_components/Ambassadeurs'
import Amis from './_components/Amis'
import Blog from './_components/Blog'
import CollectiveAction from './_components/CollectiveAction'
import Heading from './_components/Heading'
import Modele from './_components/Modele'
import MultiFootprint from './_components/MultiFootprint'
import Organisation from './_components/Organisation'

export async function generateMetadata() {
  const { t } = await getServerTranslation()
  return getMetadataObject({
    title: t(
      "Votre calculateur d'empreinte carbone personnelle - Nos Gestes Climat"
    ),
    description: t(
      'Connaissez-vous votre empreinte sur le climat ? Faites le test et découvrez comment réduire votre empreinte carbone sur le climat.'
    ),
    alternates: {
      canonical: '',
    },
  })
}

export default async function Homepage() {
  return (
    <>
      <Header />
      <Main className="lg:-mt-8">
        <Heading />
        <MultiFootprint />
        <h2 className="mx-auto mb-10 max-w-md text-center text-3xl">
          <Trans>Mobilisez votre entourage pour la planète !</Trans>
        </h2>
        <Amis />
        <Organisation />
        <Blog />
        <CollectiveAction />
        <Modele />
        <Ambassadeurs />
      </Main>
    </>
  )
}
