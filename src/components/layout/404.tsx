import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'
import Trans from '../translation/Trans'

export default async function Route404() {
  const { t } = await getServerTranslation()
  return (
    <div className="mx-auto text-center text-primary-700">
      <div className="fixed left-0 right-0 top-[16%]">
        <svg
          className="absolute left-0 right-0 top-0 h-screen w-[3000px] fill-primary-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28">
          <path
            className="wave-1"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
          <path
            className="wave-2 w-1/2 opacity-95"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
          <path
            className="wave-3 opacity-90"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
          <path
            className="wave-4 opacity-85"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
          <path
            className="wave-5 opacity-90"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
          <path
            className="wave-6 opacity-95"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
          <path
            className="wave-7 opacity-80"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
          <path
            className="wave-8 opacity-95"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
          <path
            className="wave-9 opacity-85"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </svg>
      </div>

      <div className="absolute left-0 right-0 top-[12rem] flex flex-col items-center justify-end">
        <h1 className="flex h-[15rem] items-center justify-center text-[10rem] text-primary-950 md:h-[20rem] md:text-[20rem]">
          <span className="island mt-24 animate-bounce">4</span>
          <span className="island relative">
            <Image
              className="absolute -top-[32px] left-0 right-0 m-auto w-10 md:top-[10px] md:w-12"
              src="/images/misc/404_bonhomme.svg"
              width="60"
              height="60"
              alt={t('Un bonhomme se demandant où il est')}
            />
            0
          </span>
          <span className="island mt-24 animate-bounce">4</span>
        </h1>

        <p className="text-base font-bold text-white sm:text-lg md:mt-8 md:text-2xl">
          <Trans>Rien à l'horizon ! La page recherchée n'existe pas.</Trans>
        </p>
        <ButtonLink
          color="secondary"
          href="/"
          className="mt-8 justify-self-center bg-white">
          <Trans>Revenir à l'accueil</Trans>
        </ButtonLink>
      </div>
    </div>
  )
}
