import Card from '@/design-system/layout/Card'
import Link from 'next/link'
import { Trans } from 'react-i18next'

type Avantage = {
	illustration: string
	icon?: string
	text: React.ReactNode
}

export default function ListedAdvantages() {
	const advantages: Avantage[] = [
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
					L'intégralité du calcul est{' '}
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
		<ul className="flex justify-center items-center flex-wrap pl-0 m-0 gap-4">
			{advantages.map((advantage) => (
				<Card
					tag="li"
					key={advantage.illustration}
					className="w-[14rem] h-[14rem] flex flex-col justify-center items-center gap-4"
				>
					<span className="text-[200%]">{advantage.illustration}</span>

					<div className="text-center text-base">{advantage.text}</div>
				</Card>
			))}
		</ul>
	)
}
