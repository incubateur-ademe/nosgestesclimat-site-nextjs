import InlineLink from '@/design-system/inputs/InlineLink'
import Image from 'next/image'
import Trans from '../translation/Trans'

export default async function Route404() {
  return (
    <div className="mx-auto my-16 text-center text-primaryDark">
      <h1 className="flex items-center justify-center">
        <Trans>Oups! Cette page n'existe pas ou n'existe plus</Trans>{' '}
        <span role="img" aria-label="Emoji no" aria-hidden>
          🙅
        </span>
      </h1>

      <InlineLink href="/" className="flex flex-col items-center !text-center">
        {/* TODO: credits for the image to add: https://thenounproject.com/term/treasure-map/96666/ */}
        <Image
          className="m-10 h-auto w-40"
          alt=""
          src="/images/misc/map-directions.png"
        />
        <em>
          <Trans i18nKey="404.action">Revenir en lieu sûr</Trans>
        </em>
      </InlineLink>
    </div>
  )
}
