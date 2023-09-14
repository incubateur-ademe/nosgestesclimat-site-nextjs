'use client'

// import { loadPreviousSimulation, resetLocalisation } from '@/actions/actions'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import CardGameIcon from '../../../components/icons/CardGameIcon'

import Logo from '@/components/misc/Logo'
import LanguageSwitchButton from '@/components/translation/LanguageSwitchButton'
import Trans from '@/components/translation/Trans'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useGetPRNumber } from '@/hooks/useGetPRNumber'
import { Persona } from '@/types/persona'
import Image from 'next/image'
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

  const enquete = ''
  const persona: Persona | undefined = undefined
  const pullRequestNumber = useGetPRNumber()

  return (
    <nav
      id="mainNavigation"
      className="z-50 my-2 flex flex-col justify-center outline-none lg:sticky lg:top-0 lg:my-0 lg:h-screen lg:w-[14rem] lg:shrink-0 lg:justify-start lg:overflow-hidden lg:border-0 lg:border-r-[1px] lg:border-solid lg:border-grey-200">
      <Logo size="small" className="hidden lg:block" />

      <div className="z-100 fixed bottom-0 left-0 m-0 w-full border-0 border-t-[1px] border-solid border-grey-200 lg:static lg:z-auto lg:mt-4 lg:w-auto lg:border-none">
        <ul className="m-0 flex h-20 w-full list-none justify-between bg-white px-4 py-1 shadow-md lg:h-auto lg:flex-col lg:justify-start lg:gap-1 lg:bg-none lg:py-2 lg:shadow-none">
          <NavLink href="/simulateur/bilan">
            <ProgressCircle className="lg:mr-4" />
            <span className="font-normal text-primaryDark">
              <Trans>Le test</Trans>
            </span>
          </NavLink>

          <NavLink href="/actions">
            <ActionsInteractiveIcon className="lg:mr-4" />

            <span className="font-normal text-primaryDark">
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
              <span className="font-normal text-primaryDark">
                {!persona ? (
                  t('Profil')
                ) : (
                  <span className="rounded-sm bg-primary px-2 text-white">
                    {(persona as Persona)?.nom}
                  </span>
                )}
              </span>
            </NavLink>
          )}

          {!enquete && (
            <NavLink href="/groupes">
              <Image
                src="/images/misc/silhouettes.svg"
                alt=""
                className="w-8 lg:mr-4"
                aria-hidden="true"
                width="25"
                height="25"
              />

              <span className="font-normal text-primaryDark">
                <Trans>Groupes</Trans>
              </span>
            </NavLink>
          )}

          {pullRequestNumber && (
            <NavLink
              href={
                'https://github.com/datagir/nosgestesclimat/pull/' +
                pullRequestNumber
              }>
              <Image
                src={openmojiURL('github')}
                alt=""
                className="w-8 lg:mr-4"
                aria-hidden="true"
                width="20"
                height="20"
              />
              <span className="font-base text-primaryDark">
                #{pullRequestNumber}
              </span>

              <button
                onClick={() => {
                  /*
							setSearchParams(omit(['PR'], searchParams))
							dispatch(resetLocalisation())
							chooseIp(undefined)
							dispatch({ type: 'SET_PULL_REQUEST_NUMBER', number: null })
              */
                  // reset PR number
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
          <li className="mt-4 hidden text-center lg:block">
            <LanguageSwitchButton />
          </li>
        </ul>
      </div>
    </nav>
  )
}
