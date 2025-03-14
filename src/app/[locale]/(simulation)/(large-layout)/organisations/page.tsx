import Separator from '@/design-system/layout/Separator'
import type { DefaultPageProps } from '@/types'
import CTAFooter from './_components/CTAFooter'
import HeroSection from './_components/HeroSection'
import IllustratedPointsList from './_components/IllustratedPointsList'
import PartnersSection from './_components/PartnersSection'

export default async function Page({ params }: DefaultPageProps) {
  const { locale } = await params

  return (
    <section className="w-full bg-[#fff] md:mx-auto">
      <div className="mx-4 lg:mx-0">
        <HeroSection />

        <Separator className="my-12 opacity-0 lg:opacity-100" />

        <IllustratedPointsList locale={locale} />
      </div>
      <PartnersSection locale={locale} />
      <CTAFooter />
    </section>
  )
}
