import Trans from '@/components/translation/Trans'
import Buttons from './heading/Buttons'
import HeadingIllustration from './heading/HeadingIllustration'
import Partners from './heading/Partners'

export default async function Heading() {
  return (
    <>
      <div className="flex min-h-[588px] items-center bg-primary-50 px-4 py-20 md:min-h-full">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center gap-20">
          <div className="flex-1">
            <h1 className="mb-10 md:text-5xl">
              <Trans>Connaissez-vous votre empreinte écologique ?</Trans>
            </h1>
            <p className="mb-10 md:text-2xl">
              <Trans>
                Calculez votre <strong>empreinte carbone</strong> et votre{' '}
                <strong>empreinte eau</strong> en{' '}
                <strong className="text-secondary-700">
                  seulement 10 minutes.
                </strong>
              </Trans>
            </p>

            <Buttons />
            <p className="max-w-80 text-lg">
              <Trans>
                <strong className="text-primary-700">
                  2 millions de personnes
                </strong>{' '}
                ont déjà calculé leur empreinte !
              </Trans>
            </p>
          </div>
          <HeadingIllustration />
        </div>
      </div>
      <Partners />
    </>
  )
}
