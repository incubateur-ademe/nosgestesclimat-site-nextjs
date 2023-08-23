import emImage from '@/assets/images/electricitymaps.svg'
import internationalIllustration from '@/assets/images/international-illustration.jpeg'
import TransServer from '@/components/translation/TransServer'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import InlineLink from '@/design-system/inputs/InlineLink'
import Container from '@/design-system/layout/Container'
import Main from '@/design-system/layout/Main'
import Title from '@/design-system/layout/Title'
import { useServerTranslation } from '@/locales'
import Image from 'next/image'
import RegionGrid from './_components/RegionGrid'

export default async function International() {
	const { t } = await useServerTranslation()

	const title = t("Le calculateur d'empreinte climat international")
	const description = t(
		'Où que vous vivez, calculez votre empreinte carbone personnelle avec les particularités de votre pays.',
	)

	return (
		<Main>
			{/*
			<Meta
				title={title}
				description={description}
				image="https://nosgestesclimat.fr/images/international-illustration.jpeg"
			/>
  */}
			<Container maxWidth="3xl" className="pb-12 pt-8">
				<div className="flex items-start justify-between gap-4">
					<div className="text-center md:text-left">
						<Title title={title} />

						<Image
							src={internationalIllustration}
							alt=""
							className="max-w-12 py-8 md:hidden"
							width="300"
							height="300"
						/>

						<p className="mb-8">{description}</p>
						<div>
							<ButtonLink href="/simulateur/bilan" size="xl" className="px-20">
								<span>
									<TransServer>Faire le test</TransServer>
								</span>
							</ButtonLink>
						</div>
					</div>

					<Image
						src={internationalIllustration}
						alt=""
						aria-hidden="true"
						className="mx-auto hidden max-w-md p-8 md:block"
						width="300"
						height="300"
					/>
				</div>
			</Container>
			<div className="bg-primaryLight">
				<Container maxWidth="3xl" className="pb-12 pt-8">
					<h2>
						<TransServer i18nKey="international.pourquoi.titre">
							Adapté à votre pays
						</TransServer>
					</h2>
					<p>
						<TransServer i18nKey="international.pourquoi.1">
							Les modes de vies ne sont pas les mêmes en fonction du pays dans
							lequel on vit. Certains pays ont un réseau ferré très développé,
							d'autres sont insulaires et donc reposent davantage sur le ferry
							et l'avion.
						</TransServer>
					</p>
					<p>
						<TransServer i18nKey="international.pourquoi.2">
							Au fur et à mesure que l'électricité prend une place très
							importante grâce à la transition énergétique, l'empreinte carbone
							du mix électrique influence fortement le calcul d'empreinte
							climat.
						</TransServer>
					</p>
					<p>
						<TransServer i18nKey="international.pourquoi.3">
							Nous utilisons, quand disponible, l'empreinte du mix électrique
							fournie par{' '}
							<a href="https://app.electricitymaps.com/map" target="_blank">
								<Image
									alt="Electricity Maps"
									src={emImage}
									className="ml-2 h-4"
									width="100"
									height="100"
								/>
							</a>
							.
						</TransServer>
					</p>
				</Container>
			</div>

			<Container maxWidth="3xl" className="pb-12 pt-8">
				<h2>
					<TransServer i18nKey="international.comment.titre">
						Comment ça marche ?
					</TransServer>
				</h2>
				<p>
					<TransServer i18nKey="international.comment.1">
						Pour proposer un modèle pour chaque pays, il nous faut forcément une
						base. Nos Gestes Climat s'est construit sur le cas de la France. À
						partir de là, chaque pays décrit ses différences par rapport à la
						base.
					</TransServer>
					<p>
						<TransServer i18nKey="international.comment.2">
							Explorez en détail les spécificités de chaque pays.
						</TransServer>
						&nbsp;
						<span className="ml-2 whitespace-nowrap rounded-sm bg-primaryLight px-2 py-1">
							⏳️ <TransServer>À venir !</TransServer>
						</span>
					</p>
				</p>
			</Container>

			<div className="bg-primaryLight">
				<Container maxWidth="3xl" className="pb-12 pt-8">
					<div className="mx-auto my-0">
						<RegionGrid shouldShowButton={false} />
					</div>
				</Container>
			</div>

			<Container maxWidth="3xl" className="pb-12 pt-8">
				<h2>
					<TransServer i18nKey="international.ensuite.titre">
						Vous ne trouvez pas votre pays ?
					</TransServer>
				</h2>
				<p>
					<TransServer i18nKey="international.ensuite.1">
						Nous avons lancé une première version de l'internationalisation qui
						comprend une douzaine de pays. Nous le faisons pas à pas, pour
						consolider les particularités de chaque pays. Le votre n'y est pas ?{' '}
						<InlineLink href="/a-propos">Écrivez-nous !</InlineLink>
					</TransServer>
				</p>
			</Container>
		</Main>
	)
}
