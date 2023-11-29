import Trans from '@/components/translation/Trans'
import Buttons from './heading/Buttons'
import Icons from './heading/Icons'
import Partners from './heading/Partners'

export default function Heading() {
  return (
    <>
      <div className="relative flex h-[34rem] items-center justify-center overflow-hidden bg-grey-100 p-4 md:h-[36rem]">
        <Icons />
        <div className="relative mt-6 max-w-sm text-center md:mt-0 md:max-w-xl">
          <h1 className="md:text-5xl">
            <Trans>Connaissez-vous votre empreinte sur le climat&#8239;?</Trans>
          </h1>
          <p className="mb-6 md:mb-10 md:text-2xl">
            <Trans>
              En <span className="text-secondary">10 minutes</span>, obtenez une
              estimation de votre empreinte carbone de consommation.
            </Trans>
          </p>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
            <Buttons />
          </div>
        </div>
      </div>
      <Partners />
    </>
  )
}
