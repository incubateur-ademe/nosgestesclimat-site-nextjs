import internationalIllustration from '@/assets/images/international-illustration.jpeg'
import TransServer from '@/components/translation/TransServer'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import InlineLink from '@/design-system/inputs/InlineLink'
import Main from '@/design-system/layout/Main'
import Title from '@/design-system/layout/Title'
import { useServerTranslation } from '@/locales'
import Image from 'next/image'
import RegionGrid from './_components/RegionGrid'
console.log(internationalIllustration)
export default async function International() {
	const { t } = await useServerTranslation()

	const title = t("Le calculateur d'empreinte climat international")
	const description = t(
		'Où que vous vivez, calculez votre empreinte carbone personnelle avec les particularités de votre pays.'
	)

	return (
		<Main maxWidth="3xl">
			{/*
			<Meta
				title={title}
				description={description}
				image="https://nosgestesclimat.fr/images/international-illustration.jpeg"
			/>
  */}

			<div>
				<div>
					<Title title={title} />

					<Image
						src={'/images/international-illustration.jpeg'}
						alt=""
						className="max-w-[40vh] p-8 md:hidden"
						width="300"
						height="200"
					/>

					<p>{description}</p>
					<div>
						<div>
							<ButtonLink href="/simulateur/bilan" size="xl" className="px-20">
								<span>
									<TransServer>Faire le test</TransServer>
								</span>
							</ButtonLink>
						</div>
					</div>
				</div>

				<img
					src="/images/international-illustration.jpeg"
					css={`
						padding: 2rem;
						max-width: 40vh;
						margin: 0 auto;
					`}
					aria-hidden="true"
					className="mx-auto hidden max-w-[40vh] p-8 md:block"
				/>
			</div>

			<div>
				<h2>
					<TransServer i18nKey="international.pourquoi.titre">
						Adapté à votre pays
					</TransServer>
				</h2>
				<p>
					<TransServer i18nKey="international.pourquoi.1">
						Les modes de vies ne sont pas les mêmes en fonction du pays dans
						lequel on vit. Certains pays ont un réseau ferré très développé,
						d'autres sont insulaires et donc reposent davantage sur le ferry et
						l'avion.
					</TransServer>
				</p>
				<p>
					<TransServer i18nKey="international.pourquoi.2">
						Au fur et à mesure que l'électricité prend une place très importante
						grâce à la transition énergétique, l'empreinte carbone du mix
						électrique influence fortement le calcul d'empreinte climat.
					</TransServer>
				</p>
				<p>
					<TransServer i18nKey="international.pourquoi.3">
						Nous utilisons, quand disponible, l'empreinte du mix électrique
						fournie par{' '}
						<a href="https://app.electricitymaps.com/map" target="_blank">
							<img
								alt="Electricity Maps"
								src="/images/electricitymaps.svg"
								css="margin-left: .6rem; height: 1rem; vertical-align: sub"
							/>
						</a>
						.
					</TransServer>
				</p>
			</div>

			<div>
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
						<span
							css={`
								background: var(--lighterColor);
								border-radius: 0.4rem;
								padding: 0.1rem 0.4rem;
								white-space: nowrap;
								margin-left: 0.4rem;
							`}
						>
							⏳️ <TransServer>À venir !</TransServer>
						</span>
					</p>
				</p>
			</div>

			<div>
				<div css=" margin: 0 auto">
					<RegionGrid shouldShowButton={false} />
				</div>
			</div>

			<div>
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
			</div>
		</Main>
	)
}
