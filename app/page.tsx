import AnimatedIllustration from '@/components/AnimatedIllustration'
import Title from '@/components/groupe/Title'
import animate from '@/components/ui/animate'
import { IframeOptionsContext } from '@/contexts/IframeOptionsContext'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import InlineLink from '@/design-system/inputs/InlineLink'
import Main from '@/design-system/layouts/Main'
import LogoADEME from '@/images/logoADEME.svg'
import { useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
	HeaderCTAs,
	HeaderContent,
	LandingHeaderWrapper,
	fluidLayoutMinWidth,
} from '../../components/LandingLayout'
import NewsBanner from '../../components/NewsBanner'
import { CircleSVG } from '../../components/ProgressCircle'
import { openmojiURL } from '../../components/SessionBar'
import { useMatomo } from '../../contexts/MatomoContext'
import useMediaQuery from '../../hooks/useMediaQuery'
import {
	matomoEventModeGroupeCTAStart,
	matomoEventParcoursTestReprendre,
	matomoEventParcoursTestStart,
} from '../constants/matomo-events'
import LandingExplanations from './LandingExplanations'

export default function Home() {
	const { trackEvent } = useMatomo()
	const { t } = useTranslation()
	const mobile = useMediaQuery(`(max-width: ${fluidLayoutMinWidth})`)
	const { isIframe } = useContext(IframeOptionsContext)

	return (
		<Main>
			<LandingHeaderWrapper>
				<HeaderContent>
					<Title
						title={
							<Trans i18nKey={'publicodes.Landing.question'}>
								Connaissez-vous votre empreinte sur le climat ?
							</Trans>
						}
					/>
					{mobile && <AnimatedIllustration />}
					<p>
						<Trans i18nKey={'sites.publicodes.Landing.description'}>
							En 10 minutes, obtenez une estimation de votre empreinte carbone
							de consommation.
						</Trans>
					</p>
					<div>
						<HeaderCTAs>
							<ButtonLink
								href="/simulateur/bilan"
								className={`ui__ plain button cta`}
								css={hasData ? 'padding: 1rem!important;' : ''}
								data-cypress-id="do-the-test-link"
								onClick={() => {
									if (hasData) {
										trackEvent(matomoEventParcoursTestReprendre)
										return
									}

									trackEvent(matomoEventParcoursTestStart)
								}}
							>
								<CircleSVG progress={0} white />
								<span>
									{hasData ? (
										<Trans>Reprendre mon test</Trans>
									) : (
										<Trans>Faire le test</Trans>
									)}
								</span>
							</ButtonLink>
							<ButtonLink
								href="/groupe"
								className="ui__ button cta"
								onClick={() => {
									trackEvent(matomoEventModeGroupeCTAStart)
								}}
								data-cypress-id="as-a-group-link"
							>
								<img
									src="/images/silhouettes.svg"
									alt=""
									width="100"
									height="100"
									className="w-32 h-auto"
								/>
								<span>
									<Trans>En groupe</Trans>
								</span>
							</ButtonLink>
							<ProfileLink />
						</HeaderCTAs>
						<div className="flex items-center justify-between flex-wrap">
							<NewsBanner />
						</div>
					</div>
				</HeaderContent>
				{!mobile && <AnimatedIllustration />}
			</LandingHeaderWrapper>

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
						alt="Logo de l'Association pour la transition Bas Carbone"
						width="86"
						height="29"
					/>
				</a>
			</div>

			{!isIframe && <LandingExplanations />}
		</Main>
	)
}

const ProfileLink = () => {
	const { hasData } = useProfileData()
	const { t } = useTranslation()

	if (!hasData) {
		return null
	}

	return (
		<animate.appear delay="1">
			<div className="mt-4 md:flex md:justify-center">
				<InlineLink
					href="/profil"
					title={t('Page profil')}
					className="w-[18rem] rounded-sm flex items-center"
				>
					<img alt="" src={openmojiURL('profile')} className="w-6" />
					<span className="ml-2">
						<Trans>Voir le détail de ma simulation</Trans>
					</span>
				</InlineLink>
			</div>
		</animate.appear>
	)
}
