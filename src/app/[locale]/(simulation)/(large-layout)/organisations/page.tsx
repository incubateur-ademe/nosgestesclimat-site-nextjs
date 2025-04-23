import TheySpeakAboutUs from '@/app/[locale]/_components/TheySpeakAboutUs'
import Separator from '@/design-system/layout/Separator'
import type { DefaultPageProps } from '@/types'
import HeroSection from './_components/HeroSection'
import IllustratedPointsList from './_components/IllustratedPointsList'

export default async function Page({ params }: DefaultPageProps) {
  const { locale } = await params

  return (
    <section className="w-full bg-[#fff] md:mx-auto">
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
  )
}
