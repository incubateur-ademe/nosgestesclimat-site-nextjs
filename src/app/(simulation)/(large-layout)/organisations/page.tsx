import Separator from '@/design-system/layout/Separator'
import CTAFooter from './_components/CTAFooter'
import HeroSection from './_components/HeroSection'
import IllustratedPointsList from './_components/IllustratedPointsList'
import PartnersSection from './_components/PartnersSection'

export default function Page() {
  return (
    <section className="mx-none w-full bg-[#fff] md:mx-auto">
      <div>
        <HeroSection />

        <Separator className="my-12 opacity-0 lg:opacity-100" />

        <IllustratedPointsList />

        <PartnersSection />
      </div>

      <CTAFooter />
    </section>
  )
}
