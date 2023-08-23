'use client'

// import { loadPreviousSimulation, resetLocalisation } from '@/actions/actions'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import CardGameIcon from '../icons/CardGameIcon'

import closePlain from '@/assets/images/close-plain.svg'
import profileImage from '@/assets/images/silhouette.svg'
import groupImage from '@/assets/images/silhouettes.svg'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useClientTranslation } from '@/locales/client'
import { Persona } from '@/types/persona'
import Image from 'next/image'
import Logo from '../Logo'
import TransClient from '../translation/TransClient'

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
	`@/assets/images/${openmojis[name]}.svg`
export const actionImg = openmojiURL('action')
export const conferenceImg = openmojiURL('conference')

export default function Navigation() {
	const { t } = useClientTranslation()

	const enquete = ''
	const persona: Persona | undefined = undefined
	const pullRequestNumber: number | undefined = undefined

	const buttonClassNames =
		'flex !w-full flex-col md:flex-row gap-1 py-2 md:py-4 h-full'
	const liClassNames = 'min-w-[84px] w-full md:w-auto'

	return (
		<nav
			id="mainNavigation"
			className="my-2 flex flex-col justify-center outline-none md:sticky md:top-0 md:my-0 md:h-screen md:w-[14rem] md:shrink-0 md:justify-start md:overflow-hidden md:border-0 md:border-r-[1px] md:border-solid md:border-grey-200"
		>
			<Logo size="small" className="hidden md:block" />

			<div className="z-100 fixed bottom-0 left-0 m-0 w-full border-0 border-t-[1px] border-solid border-grey-200 md:static md:z-auto md:mt-4 md:w-auto md:border-none">
				<ul className="m-0 flex h-20 w-full list-none justify-between bg-white px-4 py-1 shadow-md md:h-auto md:flex-col md:justify-start md:gap-1 md:bg-none md:py-2 md:shadow-none">
					<li className={liClassNames}>
						<ButtonLink
							className={buttonClassNames}
							color="text"
							href="/simulateur/bilan"
						>
							<ProgressCircle className="md:mr-4" />
							<TransClient>Le test</TransClient>
						</ButtonLink>
					</li>

					<li className={liClassNames}>
						<ButtonLink
							color="text"
							href="/actions"
							aria-disabled={false /* enquête && !testCompleted */}
							className={buttonClassNames}
						>
							<ActionsInteractiveIcon className="md:mr-4" />
							<TransClient>Agir</TransClient>
						</ButtonLink>
					</li>

					{!enquete && (
						<li className={liClassNames}>
							<ButtonLink
								className={buttonClassNames}
								color="text"
								href="/profil"
							>
								<div className="relative">
									<Image
										src={profileImage}
										alt=""
										className="w-8 md:mr-4"
										aria-hidden="true"
										width="25"
										height="25"
									/>
								</div>
								{!persona ? (
									t('Profil')
								) : (
									<span className="rounded-sm bg-primary px-2 text-white">
										{(persona as Persona)?.nom}
									</span>
								)}
							</ButtonLink>
						</li>
					)}

					{!enquete && (
						<li className={liClassNames}>
							<ButtonLink
								className={buttonClassNames}
								color="text"
								href="/groupes"
							>
								<Image
									src={groupImage}
									alt=""
									className="w-8 md:mr-4"
									aria-hidden="true"
									width="25"
									height="25"
								/>
								<TransClient>Groupes</TransClient>
							</ButtonLink>
						</li>
					)}

					{pullRequestNumber && (
						<li className={liClassNames}>
							<ButtonLink
								color="text"
								href={
									'https://github.com/datagir/nosgestesclimat/pull/' +
									pullRequestNumber
								}
								className={buttonClassNames}
							>
								<Image
									src={openmojiURL('github')}
									alt=""
									className="w-8 md:mr-4"
									aria-hidden="true"
									width="20"
									height="20"
								/>
								#{pullRequestNumber}
								<Button
									color="text"
									onClick={() => {
										/*
							setSearchParams(omit(['PR'], searchParams))
							dispatch(resetLocalisation())
							chooseIp(undefined)
							dispatch({ type: 'SET_PULL_REQUEST_NUMBER', number: null })
              */
										// reset PR number
									}}
								>
									<Image
										className="w-6"
										src={closePlain}
										alt=""
										width="1"
										height="1"
									/>
								</Button>
							</ButtonLink>
						</li>
					)}
				</ul>
			</div>
		</nav>
	)
}
