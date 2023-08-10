import lostMapImage from '@/assets/images/map-directions.png'
import InlineLink from '@/design-system/inputs/InlineLink'
import Image from 'next/image'
import emoji from 'react-easy-emoji'
import TransServer from '../translation/TransServer'

export default async function Route404() {
	return (
		<div
			style={{
				color: '#333350',
				margin: '15% auto',
				width: '15em',
				textAlign: 'center',
			}}
			className="width: 15em; text-align: center; my-[10%] mx-auto; color: #333350;"
		>
			<p>
				<TransServer i18nKey="404.message">
					Cette page n'existe pas ou n'existe plus
				</TransServer>
				{emoji(' 🙅')}
			</p>

			<InlineLink href="/">
				{/* TODO: credits for the image to add: https://thenounproject.com/term/treasure-map/96666/ */}
				<Image className="m-10 w-full" alt="" src={lostMapImage} />
				<em>
					<TransServer i18nKey="404.action">Revenir en lieu sûr</TransServer>
				</em>
			</InlineLink>
		</div>
	)
}
