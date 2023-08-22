import TransServer from '@/components/translation/TransServer'
import Card from '@/design-system/layout/Card'
import Link from 'next/link'

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
				<TransServer>
					Le code source est ouvert, le site est{' '}
					<Link href="/nouveautés">amélioré régulièrement</Link>.
				</TransServer>
			),
		},
		{
			illustration: '🔎',
			text: (
				<TransServer>
					L'intégralité du calcul est{' '}
					<Link href="/documentation">documenté</Link> en ligne pour les curieux
					et les experts.
				</TransServer>
			),
		},
		{
			illustration: '🖋️',
			text: (
				<TransServer>
					Une idée ? Une correction ? Une remarque ? Toute contribution{' '}
					<Link href="/contact">est la bienvenue</Link>!
				</TransServer>
			),
		},
	]

	return (
		<ul className="m-0 flex flex-wrap items-center gap-4 pl-0">
			{advantages.map((advantage) => (
				<Card
					tag="li"
					key={advantage.illustration}
					className="flex h-[14rem] w-full flex-col items-center justify-center gap-4 md:w-[14rem]"
				>
					<span className="text-[200%]">{advantage.illustration}</span>

					<div className="text-center text-base">{advantage.text}</div>
				</Card>
			))}
		</ul>
	)
}
