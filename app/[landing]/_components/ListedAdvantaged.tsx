import Link from 'next/link'
import { Trans } from 'react-i18next'

export default function ListedAdvantages() {
	const advantages = [
		{
			illustration: '🪟',
			text: (
				<Trans>
					Le code source est ouvert, le site est{' '}
					<Link href="/nouveautés">amélioré régulièrement</Link>.
				</Trans>
			),
		},
		{
			illustration: '🔎',
			text: (
				<Trans>
					L\'intégralité du calcul est{' '}
					<Link href="/documentation">documenté</Link> en ligne pour les curieux
					et les experts.
				</Trans>
			),
		},
		{
			illustration: '🖋️',
			text: (
				<Trans>
					Une idée ? Une correction ? Une remarque ? Toute contribution{' '}
					<Link href="/contact">est la bienvenue</Link>!
				</Trans>
			),
		},
	]

	return (
		<ul className="flex justify-center items-center flex-wrap pl-0 m-0">
			{advantages.map((advantage) => (
				<li
					key={advantage.illustration}
					className="ui__ card box width-[14rem] height-[14rem] justify-center"
				>
					<span className="text-[200%]">{advantage.illustration}</span>

					<div className="max-w-[40rem]">{advantage.text}</div>
				</li>
			))}
		</ul>
	)
}
