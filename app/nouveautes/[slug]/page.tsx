import Route404 from '@/components/layout/404'
import InlineLink from '@/design-system/inputs/InlineLink'
import Title from '@/design-system/layout/Title'
import { useServerTranslation } from '@/locales'
import { getCurrentLangInfos } from '@/locales/translation'
import { capitaliseString } from '@/utils/capitaliseString'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { extractImage } from '../_helpers/extractImage'
import { getFormattedDate } from '../_helpers/getFormattedDate'
import { getPath } from '../_helpers/getPath'
import { slugifyString } from '../_helpers/slugifyString'
import { sortReleases } from '../_helpers/sortReleases'
import ReleaseSelect from './_components/ReleaseSelect'

const removeGithubIssuesReferences = (text: string) =>
	text.replace(/#[0-9]{1,5}/g, '')

const MDXComponents = {
	img: (props: any) => <Image {...props} alt={props.alt} />,
}

export default async function NewsPage({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const { t, i18n } = await useServerTranslation()
	const currentLangInfos = getCurrentLangInfos(i18n)

	console.log('TODO : replace persisting state logic here - NewsPage.tsx')
	// const [, setLastViewedRelease] = usePersistingState(localStorageKey, null)

	const data = sortReleases(currentLangInfos.releases)

	// useEffect(() => {
	// 	setLastViewedRelease(lastRelease.name)
	// }, [])

	if (!data) {
		return null
	}

	const selectedRelease = data.findIndex(
		({ name }) => encodeURI(slugifyString(name)) === slug
	)

	if (!slug || selectedRelease === -1) {
		return <Route404 />
	}

	const releaseName = data[selectedRelease]?.name?.toLowerCase()
	const body = data[selectedRelease]?.body

	const image = extractImage(body)

	const releaseDateCool = getFormattedDate(
		new Date(data[selectedRelease].published_at),
		currentLangInfos.abrvLocale
	)

	return (
		<div
			css={`
				padding: 0 0.6rem;
				margin: 0 auto;
			`}
		>
			{/*
      <Meta
				title={`${t('Nouveautés')} ${releaseDateCool} - ${capitaliseString(
					releaseName
				)}`}
				image={image}
			/>
      */}

			<label title={t('titre de la version')}>
				<ReleaseSelect releases={data} selectedRelease={selectedRelease} />
			</label>
			<section className="flex">
				<ul className="w-[12rem] flex-col t-4 mr-4 pl-0 text-sm border-r-solid border-r-primaryLight border-r-[1px] hidden md:sticky md:flex">
					{data.map(({ name, published_at: date }, index) => (
						<li className="list-none list-inside p-0 m-0" key={name}>
							<InlineLink className="py-1 px-2 m-0" href={getPath(index, data)}>
								{name}
								<div>
									<small>
										{getFormattedDate(
											new Date(date),
											currentLangInfos.abrvLocale
										)}
									</small>
								</div>
							</InlineLink>
						</li>
					))}
				</ul>
				<div className="flex-1 max-w-3xl">
					<Title title={capitaliseString(releaseName) || ''} />
					<MDXRemote
						source={removeGithubIssuesReferences(body)}
						components={MDXComponents}
					/>

					<div className="flex justify-between mt-10">
						{selectedRelease + 1 < data.length ? (
							<InlineLink href={getPath(selectedRelease + 1, data)}>
								← {data[selectedRelease + 1].name}
							</InlineLink>
						) : (
							<span /> // For spacing
						)}
						{selectedRelease > 0 && (
							<InlineLink href={getPath(selectedRelease - 1, data)}>
								{data[selectedRelease - 1].name} →
							</InlineLink>
						)}
					</div>
				</div>
			</section>
		</div>
	)
}
