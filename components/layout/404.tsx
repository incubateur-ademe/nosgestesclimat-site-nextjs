import lostMapImage from '@/assets/images/map-directions.png'
import InlineLink from '@/design-system/inputs/InlineLink'
import Image from 'next/image'
import emoji from 'react-easy-emoji'
import TransServer from '../translation/TransServer'

export default async function Route404() {
	return (
		<div className="mx-auto my-16 text-center text-primaryDark">
			<h1>
				<TransServer i18nKey="404.message">
					Oups! Cette page n'existe pas ou n'existe plus
				</TransServer>
				{emoji(' 🙅')}
			</h1>

			<InlineLink href="/" className="flex flex-col items-center !text-center">
				{/* TODO: credits for the image to add: https://thenounproject.com/term/treasure-map/96666/ */}
				<Image className="m-10 h-auto w-40" alt="" src={lostMapImage} />
				<em>
					<TransServer i18nKey="404.action">Revenir en lieu sûr</TransServer>
				</em>
			</InlineLink>
		</div>
	)
}
