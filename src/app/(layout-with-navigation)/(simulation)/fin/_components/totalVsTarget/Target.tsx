import Annotation from './target/Annotation'
import NumberDisplay from './total/NumberDisplay'

type Props = {
  total: number
}

export default function Target({ total }: Props) {
  const percent = (2000 / total) * 100

  return (
    <div className="flex h-full w-16 flex-col justify-end md:w-28">
      <div
        className="relative flex w-full items-center justify-center rounded-t border-4 border-b-0 border-black bg-primary text-4xl transition-all"
        style={{ height: `${percent}%` }}>
        <NumberDisplay number={2000} />
        <Annotation content="Mon objectif annuel" />
        🎯
      </div>
    </div>
  )
}
