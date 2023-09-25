import Card from '@/design-system/layout/Card'
import { getCurrentLangInfos } from '@/locales/translation'
import Image from 'next/image'

import Link from '@/components/Link'
import { getFormattedDate } from '@/helpers/date/getFormattedDate'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { extractImageSrc } from '../_helpers/extractImage'
import { getPath } from '../_helpers/getPath'
import { sortReleases } from '../_helpers/sortReleases'

export default async function NewsList() {
  const { i18n } = await getServerTranslation()

  const currentLangInfos = getCurrentLangInfos(i18n)

  const data = sortReleases(currentLangInfos.releases)

  if (!data) {
    return null
  }

  return (
    <div>
      <ul className="grid w-full list-none grid-cols-1 gap-4 pl-0 md:grid-cols-2">
        {data.map(
          (
            {
              name,
              published_at: date,
              body,
            }: { name: string; published_at: string; body: string },
            index: number
          ) => {
            const image = extractImageSrc(body)

            console.log(image)
            return (
              <li key={name} className="flex-1">
                <Card
                  tag={Link}
                  href={getPath(index, data)}
                  className="flex-row">
                  <Image
                    src={image.startsWith('https') ? image : ''}
                    alt=""
                    width="300"
                    height="200"
                    className="mb-2 mr-4 h-[8rem] w-[12rem] object-cover"
                  />
                  <div>
                    <h2 className="text-base">{name}</h2>
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
          }
        )}
      </ul>
    </div>
  )
}
