import TheySpeakAboutUs from '@/app/[locale]/_components/TheySpeakAboutUs'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Separator from '@/design-system/layout/Separator'
import { getOrganisationBaseBreadcrumb } from '@/helpers/filAriane/getOrganisationBaseBreadcrumb'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { DefaultPageProps } from '@/types'
import HeroSection from './_components/HeroSection'
import IllustratedPointsList from './_components/IllustratedPointsList'

export default async function Page({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })
  const items = getOrganisationBaseBreadcrumb(t)
  items.at(-1)!.isActive = true
  return (
    <>
      <Breadcrumbs className="-mt-4" items={items} />

      <section className="w-full overflow-hidden bg-[#fff] md:mx-auto">
        <div className="mx-4 lg:mx-0">
          <HeroSection />

          <Separator className="my-12 opacity-0 lg:opacity-100" />

          <IllustratedPointsList locale={locale} />
        </div>

        <TheySpeakAboutUs
          ctaHref="/organisations/creer"
          className="mt-16"
          locale={locale}
        />
      </section>
    </>
  )
}
