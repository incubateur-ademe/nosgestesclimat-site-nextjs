import Main from '@/design-system/layout/Main'
import Title from '@/design-system/layout/Title'
import LogoADEME from '@/images/logoADEME.svg'
import NewsBanner from './_components/NewsBanner'

import { useTranslation } from '@/locales'
import AnimatedIllustration from './_components/AnimatedIllustration'
import GroupsLink from './_components/GroupsLink'
import LandingExplanations from './_components/LandingExplanations'
import ProfileLink from './_components/ProfileLink'
import TakeTestButton from './_components/TakeTestLink'

export default async function Landing({
	params: { language },
}: {
	params: { language: string }
}) {
	console.log('TODO : replace logic here')
	const hasData = true

	const { t } = await useTranslation(language, 'landing')

	return (
		<Main>
			<div className="flex flex-row items-center justify-center flex-wrap mt-12 p-2 gap-4">
				<div className="flex flex-col max-w-[36rem]">
					<Title
						title={t(
							'Connaissez-vous votre empreinte sur le climat ?',
							'publicodes.Landing.question'
						)}
					/>
					<AnimatedIllustration className="block md:hidden" />
					<p>
						{t(
							'En 10 minutes, obtenez une estimation de votre empreinte carbone de consommation.',
							'sites.publicodes.Landing.description'
						)}
					</p>
					<div>
						<div className="my-4 flex gap-4">
							<TakeTestButton />

							<GroupsLink />

							<ProfileLink />
						</div>
						<div className="flex items-center justify-between flex-wrap">
							<NewsBanner />
						</div>
					</div>
				</div>
				<AnimatedIllustration className="hidden md:block" />
			</div>

			<div className="flex justify-center items-center flex-wrap max-w-[70%] mt-4">
				<img
					src="/images/marianne.svg"
					alt="République Française"
					className="w-24 h-auto mr-3"
					width="96"
					height="86"
				/>

				<a href="https://ademe.fr" className="h-full">
					<LogoADEME className="w-16" />
				</a>

				<a href="https://abc-transitionbascarbone.fr">
					<img
						className="w-24 h-auto !ml-4"
						src="https://abc-transitionbascarbone.fr/wp-content/uploads/2022/02/logo-ABC-web.png"
						alt={t("Logo de l'Association pour la transition Bas Carbone")}
						width="86"
						height="29"
					/>
				</a>
			</div>

			<LandingExplanations />
		</Main>
	)
}
