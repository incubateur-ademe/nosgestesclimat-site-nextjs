import Separator from '@/design-system/layout/Separator'
import CTAFooter from './_components/CTAFooter'
import HeroSection from './_components/HeroSection'
import IllustratedPointsList from './_components/IllustratedPointsList'
import PartnersSection from './_components/PartnersSection'

export default function Page() {
  return (
    <section className="mx-auto w-full bg-[#fff] px-6 lg:px-0">
      <div className="">
        <HeroSection />

        <Separator className="my-12" />

        <IllustratedPointsList />

        <PartnersSection />
      </div>

      <CTAFooter />
    </section>
  )
}
