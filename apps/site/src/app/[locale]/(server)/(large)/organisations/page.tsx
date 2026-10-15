import TheySpeakAboutUs from '@/app/[locale]/_components/TheySpeakAboutUs'
import OrganisationFilAriane from '@/components/layout/FilAriane'
import Separator from '@/design-system/layout/Separator'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import HeroSection from './_components/HeroSection'
import IllustratedPointsList from './_components/IllustratedPointsList'

export default async function Page() {
  const { t } = await getServerTranslation()

  return (
    <>
      <OrganisationFilAriane t={t} />
      <section className="w-full overflow-hidden bg-[#fff] md:mx-auto">
        <div className="mx-4 lg:mx-0">
          <HeroSection />

          <Separator className="my-12 opacity-0 lg:opacity-100" />

          <IllustratedPointsList />
        </div>

        <TheySpeakAboutUs ctaHref="/organisations/creer" className="mt-16" />
      </section>
    </>
  )
}
