import Route404 from '@/components/layout/404'
import InlineLink from '@/design-system/inputs/InlineLink'
import Title from '@/design-system/layout/Title'
import { useServerTranslation } from '@/locales'
import { getCurrentLangInfos } from '@/locales/translation'
import { capitaliseString } from '@/utils/capitaliseString'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { extractImage } from '../_helpers/extractImage'
import { getFormattedDate } from '../_helpers/getFormattedDate'
import { getPath } from '../_helpers/getPath'
import { slugifyString } from '../_helpers/slugifyString'
import { sortReleases } from '../_helpers/sortReleases'
import ReleaseSelect from './_components/ReleaseSelect'

const removeGithubIssuesReferences = (text: string) =>
  text.replace(/#[0-9]{1,5}/g, '')

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

  const selectedReleaseIndex = data.findIndex(
    ({ name }) => encodeURI(slugifyString(name)) === slug
  )

  if (!slug || selectedReleaseIndex === -1) {
    return <Route404 />
  }

  const releaseName = data[selectedReleaseIndex]?.name?.toLowerCase()
  const body = data[selectedReleaseIndex]?.body

  const image = extractImage(body)

  const releaseDateCool = getFormattedDate(
    new Date(data[selectedReleaseIndex].published_at),
    currentLangInfos.abrvLocale
  )

  return (
    <main>
      <div className='news-page flex items-start justify-center gap-8'>
        {/*
      <Meta
				title={`${t('Nouveautés')} ${releaseDateCool} - ${capitaliseString(
					releaseName
				)}`}
				image={image}
			/>
      */}

        <label title={t('titre de la version')}>
          <ReleaseSelect
            releases={data}
            selectedReleaseIndex={selectedReleaseIndex}
          />
        </label>
        <section className='flex'>
          <ul className='t-4 mr-4 hidden w-[12rem] flex-col border-0 border-r-[1px] border-solid border-r-gray-200 pl-0 text-sm md:sticky md:flex'>
            {data.map(({ name, published_at: date }, index) => {
              const isActive = selectedReleaseIndex === index
              return (
                <li
                  className={`m-0 list-inside list-none p-0 ${
                    isActive ? 'bg-primary !text-white' : ''
                  }`}
                  key={name}
                >
                  <InlineLink
                    className={`m-0 px-2 py-1 ${isActive ? 'text-white' : ''}`}
                    href={getPath(index, data)}
                  >
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
              )
            })}
          </ul>
          <div className='max-w-4xl flex-1'>
            <Title
              className='text-3xl'
              title={capitaliseString(releaseName) || ''}
              subtitle={t('Nouveautés')}
            />

            <MDXRemote source={removeGithubIssuesReferences(body)} />

            <div className='mt-10 flex justify-between'>
              {selectedReleaseIndex + 1 < data.length && (
                <>
                  <InlineLink href={getPath(selectedReleaseIndex + 1, data)}>
                    ← {data[selectedReleaseIndex + 1].name}
                  </InlineLink>{' '}
                </>
              )}
              {selectedReleaseIndex > 0 && (
                <InlineLink href={getPath(selectedReleaseIndex - 1, data)}>
                  {data[selectedReleaseIndex - 1].name} →
                </InlineLink>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
