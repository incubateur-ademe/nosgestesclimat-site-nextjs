import Card from '@/design-system/layout/Card'
import { getCurrentLangInfos } from '@/locales/translation'
import Image from 'next/image'

import Link from '@/components/Link'
import { useServerTranslation } from '@/locales'
import { extractImage } from '../_helpers/extractImage'
import { getFormattedDate } from '../_helpers/getFormattedDate'
import { getPath } from '../_helpers/getPath'
import { sortReleases } from '../_helpers/sortReleases'

export default async function NewsList() {
  const { i18n } = await useServerTranslation()

  const currentLangInfos = getCurrentLangInfos(i18n)

  console.log('TODO : replace persisting state logic here - NewsList.tsx')
  // const [, setLastViewedRelease] = usePersistingState(localStorageKey, null)

  const data = sortReleases(currentLangInfos.releases)

  // useEffect(() => {
  // 	setLastViewedRelease(lastRelease.name)
  // }, [])

  if (!data) {
    return null
  }

  return (
    <div>
      <ul className='flex list-none flex-wrap pl-0 w-full gap-4'>
        {data.map(
          (
            {
              name,
              published_at: date,
              body,
            }: { name: string; published_at: string; body: string },
            index: number
          ) => (
            <li key={name} className='flex-1'>
              <Card tag={Link} href={getPath(index, data)}>
                <Image
                  src={extractImage(body) ?? ''}
                  alt=''
                  width='300'
                  height='200'
                  className='object-cover w-[12rem] h-[8rem] mb-2 mr-4'
                />
                <div>
                  <h2 className='text-base'>{name}</h2>
                  <div>
                    <small>
                      {getFormattedDate(
                        new Date(date),
                        currentLangInfos.abrvLocale
                      )}
                    </small>
                  </div>
                </div>
              </Card>
            </li>
          )
        )}
      </ul>
    </div>
  )
}
