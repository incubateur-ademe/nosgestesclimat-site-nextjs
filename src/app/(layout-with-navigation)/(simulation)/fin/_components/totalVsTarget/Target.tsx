import Annotation from './target/Annotation'
import NumberDisplay from './total/NumberDisplay'

type Props = {
  total: number
}

export default function Target({ total }: Props) {
  const percent = (2000 / total) * 100

  return (
    <div className="flex flex-col justify-end h-full w-28">
      <div
        className="relative flex w-full justify-center items-center border-white border-ltransition-all bg-primary rounded-t"
        style={{ height: `${percent}%` }}>
        <NumberDisplay number={2000} />
        <Annotation content="Mon objectif annuel" />
        🎯
      </div>
    </div>
  )
}
