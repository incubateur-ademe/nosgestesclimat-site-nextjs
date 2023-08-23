import { useRule } from '@/publicodes-state'
import MosaicQuestion from './mosaicChild/MosaicQuestion'

type Props = { child: string }

export default function MosaicChild({ child }: Props) {
	const { title, questionsOfMosaic } = useRule(child)

	return (
		<MosaicQuestion
			title={title}
			question={questionsOfMosaic.length ? questionsOfMosaic[0] : child}
		/>
	)
}
