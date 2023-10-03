'use client'

// import { loadPreviousSimulation, resetLocalisation } from '@/actions/actions'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import CardGameIcon from '../../../components/icons/CardGameIcon'

import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useDebug } from '@/hooks/useDebug'
import { useGetPRNumber } from '@/hooks/useGetPRNumber'
import { useUser } from '@/publicodes-state'
import { capitaliseString } from '@/utils/capitaliseString'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import NavLink from './navigation/NavLink'

const ActionsInteractiveIcon = ({ className = '' }) => {
  const actionChoices = {}
  const count = Object.values(actionChoices).filter((a) => a === true).length
  return <CardGameIcon className={className} number={count} />
}

const openmojis = {
  test: '25B6',
  action: 'E10C',
  conference: '1F3DF',
  sondage: '1F4CA',
  profile: 'silhouette',
  silhouettes: 'silhouettes',
  personas: '1F465',
  github: 'E045',
}

export const openmojiURL = (name: keyof typeof openmojis) =>
  `/images/misc/${openmojis[name]}.svg`

export const actionImg = openmojiURL('action')
export const conferenceImg = openmojiURL('conference')

export default function Navigation() {
  const { t } = useClientTranslation()

  const router = useRouter()

  const isDebug = useDebug()

  const pathname = usePathname()

  const enquete = ''

  const { getCurrentSimulation } = useUser()

  const persona: string | undefined = getCurrentSimulation()?.persona

  const { PRNumber, clearPRNumber } = useGetPRNumber()

  return (
    <nav
      id="mainNavigation"
      className="z-50 my-2 flex h-auto flex-col justify-center pb-8 outline-none lg:sticky lg:top-0 lg:my-4 lg:w-[14rem] lg:shrink-0 lg:justify-start lg:overflow-hidden lg:border-0 lg:border-r-[1px] lg:border-solid lg:border-grey-200">
      <Logo size="small" className="hidden lg:block" />
      {isDebug ? (
        <div className="mx-auto hidden rounded-lg bg-red-600 px-4 py-2 text-center font-bold uppercase text-white lg:block">
          Debug
        </div>
      ) : null}
      <div className="z-100 fixed bottom-0 left-0 m-0 w-screen border-0 border-t-[1px] border-solid border-grey-200 lg:static lg:z-auto lg:mt-4 lg:w-auto lg:border-none">
        <ul className="m-0 flex h-20 w-full list-none justify-between bg-white py-1 shadow-md sm:px-4 lg:h-auto lg:flex-col lg:justify-start lg:gap-1 lg:bg-none lg:py-2 lg:shadow-none">
          <NavLink
            href="/simulateur/bilan"
            className="justify-end !p-0 lg:justify-start lg:!p-4">
            <ProgressCircle className="lg:mr-4" />
            <span className="text-base font-normal text-primaryDark md:text-lg">
              <Trans>Le test</Trans>
            </span>
          </NavLink>

          <NavLink
            href="/actions"
            className="justify-end !p-0 lg:justify-start lg:!p-4">
            <ActionsInteractiveIcon className="w-12 lg:mr-4" />

            <span className="text-base font-normal text-primaryDark md:text-lg">
              <Trans>Agir</Trans>
            </span>
          </NavLink>

          {!enquete && (
            <NavLink href="/profil">
              <div className="relative">
                <Image
                  src="/images/misc/silhouette.svg"
                  alt=""
                  className="w-8 lg:mr-4"
                  aria-hidden="true"
                  width="25"
                  height="25"
                />
              </div>
              <span className="text-base font-normal text-primaryDark md:text-lg">
                {!persona ? (
                  t('Profil')
                ) : (
                  <span className="rounded-md bg-primary px-4 py-2 text-white">
                    {capitaliseString(persona.split(' . ')[1])}
                  </span>
                )}
              </span>
            </NavLink>
          )}

          {!enquete && (
            <NavLink href="/amis">
              <Image
                src="/images/misc/silhouettes.svg"
                alt=""
                className="w-8 lg:mr-4"
                aria-hidden="true"
                width="25"
                height="25"
              />

              <span className="text-base font-normal text-primaryDark md:text-lg">
                <Trans>Amis</Trans>
              </span>
            </NavLink>
          )}

          {PRNumber && (
            <NavLink
              href={
                'https://github.com/datagir/nosgestesclimat/pull/' + PRNumber
              }>
              <Image
                src={openmojiURL('github')}
                alt=""
                className="w-8 lg:mr-4"
                aria-hidden="true"
                width="20"
                height="20"
              />
              <span className="font-base text-sm text-primaryDark md:text-lg">
                #{PRNumber}
              </span>

              <button
                onClick={(event) => {
                  event.stopPropagation()

                  clearPRNumber()

                  router.push(pathname)
                }}>
                <Image
                  className="w-6"
                  src="/images/misc/close-plain.svg"
                  alt=""
                  width="1"
                  height="1"
                />
              </button>
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  )
}
