import LandingContent from '@/app/[landing]/_components/LandingContainer'
import franceRelanceLogo from '@/assets/images/logo-france-relance.svg'
import ueLogo from '@/assets/images/union-européenne.svg'
import InlineLink from '@/design-system/inputs/InlineLink'
import Image from 'next/image'
import TransServer from '../translation/TransServer'

export default function Footer() {
	return (
		<LandingContent background>
			<footer className="flex flex-col gap-2 py-8">
				<div className="m-4 flex flex-wrap items-center justify-center gap-4">
					<Image
						src={franceRelanceLogo}
						alt="Logo de France Relance"
						className="mr-2 h-auto w-[5rem]"
						width="96"
						height="86"
					/>

					<div className="flex flex-col items-center justify-center font-bold">
						<Image
							src={ueLogo}
							alt="Logo de l'Union Européenne"
							className="mr-2 h-auto w-[5rem]"
							width="96"
							height="86"
						/>
						<span>NextGenerationEU</span>
					</div>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-2">
					<InlineLink href="/à-propos">
						<TransServer>À propos</TransServer>
					</InlineLink>

					<InlineLink
						className="flex items-center justify-center"
						href={'/documentation'}
					>
						<TransServer>Documentation</TransServer>
					</InlineLink>

					<InlineLink href="/diffuser">
						<TransServer>Diffuser</TransServer>
					</InlineLink>
					<InlineLink href="/nouveautés">
						<TransServer>Nouveautés</TransServer>
					</InlineLink>
					<InlineLink href="/international">
						<TransServer>International</TransServer>
					</InlineLink>
					<InlineLink href="/blog">
						<TransServer>Blog</TransServer>
					</InlineLink>
					<InlineLink href="/plan">
						<TransServer i18nKey="publicodes.planDuSite.title">
							Plan du site
						</TransServer>
					</InlineLink>
				</div>
				<div className="flex w-full items-center justify-center">
					<InlineLink href="/accessibilite" className="text-sm no-underline">
						<TransServer>Accessibilité : partiellement conforme</TransServer>
					</InlineLink>
				</div>
			</footer>
		</LandingContent>
	)
}
