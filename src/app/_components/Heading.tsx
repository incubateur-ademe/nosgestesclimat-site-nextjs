import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Buttons from './heading/Buttons'
import Icons from './heading/Icons'
import Partners from './heading/Partners'

export default async function Heading() {
  const { t } = await getServerTranslation()

  return (
    <>
      <div className="relative flex h-[34rem] items-center justify-center overflow-hidden bg-gray-100 p-4 md:h-[36rem]">
        <Icons />
        <div className="relative mb-2 max-w-sm text-center md:mb-0 md:max-w-xl">
          <h1 className="md:text-5xl">
            {t('Connaissez-vous votre empreinte sur le climat\u202f?')}
          </h1>
          <p className="mb-6 md:mb-10 md:text-2xl">
            <Trans>En</Trans>{' '}
            <span className="text-secondary-700">
              <Trans>10 minutes</Trans>
            </span>
            ,{' '}
            <Trans>
              obtenez une estimation de votre empreinte carbone de consommation.
            </Trans>
          </p>
          <Buttons />
        </div>
      </div>
      <Partners />
    </>
  )
}
