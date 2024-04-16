import InlineLink from '@/design-system/inputs/InlineLink'
import Image from 'next/image'

export default async function Route404() {
  return (
    <div className="mx-auto my-16 text-center text-primary-700">
      <h1 className="flex items-center justify-center">
        <NGCTrans>Oups! Cette page n'existe pas ou n'existe plus</NGCTrans>{' '}
        <span role="img" aria-label="Emoji no" aria-hidden>
          🙅
        </span>
      </h1>

      <InlineLink href="/" className="flex flex-col items-center !text-center">
        <Image
          className="m-10 h-auto w-40"
          alt=""
          title="Credits for the image goes to: https://thenounproject.com/term/treasure-map/96666/"
          src="/images/misc/map-directions.png"
          width={100}
          height={100}
        />
        <em>
          <NGCTrans i18nKey="404.action">Revenir en lieu sûr</NGCTrans>
        </em>
      </InlineLink>
    </div>
  )
}
