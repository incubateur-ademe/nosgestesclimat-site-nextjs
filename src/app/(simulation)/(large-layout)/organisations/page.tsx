import Separator from '@/design-system/layout/Separator'
import CTAFooter from './_components/CTAFooter'
import HeroSection from './_components/HeroSection'
import IllustratedPointsList from './_components/IllustratedPointsList'
import PartnersSection from './_components/PartnersSection'

export default function Page() {
  return (
    <section className="w-full bg-[#fff] md:mx-auto">
      <div className="mx-4 lg:mx-0">
        <HeroSection />

        <Separator className="my-12 opacity-0 lg:opacity-100" />

        <IllustratedPointsList />
      </div>
      <PartnersSection />
      <CTAFooter />
    </section>
  )
}
