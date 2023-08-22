'use client'

// import { loadPreviousSimulation, resetLocalisation } from '@/actions/actions'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import CardGameIcon from '../icons/CardGameIcon'

import closePlain from '@/assets/images/close-plain.svg'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useClientTranslation } from '@/locales/client'
import { Persona } from '@/types/persona'
import Image from 'next/image'
import Logo from '../Logo'
import TransClient from '../translation/TransClient'

const ActionsInteractiveIcon = () => {
	const actionChoices = {}
	const count = Object.values(actionChoices).filter((a) => a === true).length
	return <CardGameIcon number={count} />
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

	let enquete = ''
	let persona: Persona | undefined = undefined
	let pullRequestNumber: number | undefined = undefined

	return (
		<nav
			id="mainNavigation"
			tabIndex={0}
			className="my-2 flex flex-col justify-center outline-none md:sticky md:top-0 md:my-0 md:h-screen md:w-[14rem] md:shrink-0 md:justify-start md:overflow-hidden md:border-0 md:border-r-[1px] md:border-solid md:border-grey-200"
		>
			<Logo size="small" className="hidden md:block" />

			<div className="z-100 fixed bottom-0 left-0 m-0 w-full md:static md:z-auto md:mt-4 md:w-auto">
				<ul className="m-0 flex h-16 w-full list-none flex-col justify-center bg-white px-4 py-2  shadow-sm md:h-auto md:flex-col md:justify-start md:bg-none md:shadow-none">
					<li>
						<ButtonLink
							className="flex w-full  gap-4"
							color="text"
							href="/simulateur/bilan"
						>
							<ProgressCircle />
							<TransClient>Le test</TransClient>
						</ButtonLink>
					</li>

					<li>
						<ButtonLink
							color="text"
							href="/actions"
							aria-disabled={false /* enquête && !testCompleted */}
							className="flex w-full gap-4"
						>
							<ActionsInteractiveIcon />
							<TransClient>Agir</TransClient>
						</ButtonLink>
					</li>

					{!enquete && (
						<li>
							<ButtonLink
								className="flex w-full gap-4"
								color="text"
								href="/profil"
							>
								<div className="relative">
									<Image
										src={openmojiURL('profile')}
										alt=""
										className="w-8"
										aria-hidden="true"
										width="1"
										height="1"
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
						<li>
							<ButtonLink
								className="flex w-full gap-4"
								color="text"
								href="/groupes"
							>
								<Image
									src={openmojiURL('silhouettes')}
									alt=""
									className="w-8"
									aria-hidden="true"
									width="1"
									height="1"
								/>
								<TransClient>Groupes</TransClient>
							</ButtonLink>
						</li>
					)}

					{pullRequestNumber && (
						<li>
							<ButtonLink
								color="text"
								href={
									'https://github.com/datagir/nosgestesclimat/pull/' +
									pullRequestNumber
								}
								className="flex gap-4"
							>
								<Image
									src={openmojiURL('github')}
									alt=""
									className="w-8"
									aria-hidden="true"
									width="1"
									height="1"
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
