import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import { getFormattedDate } from '@/helpers/date/getFormattedDate'
import { currentLocale } from 'next-i18n-router'
import Image from 'next/image'

export default function Item({ item, path }: any) {
  const locale = currentLocale()

  return (
    <Card
      tag={Link}
      href={`${path}/${item.slug}`}
      className="h-full w-full justify-between p-4 text-primaryDark no-underline">
      <div>
        <Image
          src={item.image || ''}
          width="100"
          height="100"
          className="mx-auto mb-2 max-h-36 w-full object-cover"
          alt={`Illustration: ${item.title}`}
        />
        <p
          className="mb-4 mt-4 text-center text-lg font-bold"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
      </div>
      <p className="text-center">
        <small>{getFormattedDate(new Date(item.date), locale || 'fr')}</small>
      </p>
    </Card>
  )
}
