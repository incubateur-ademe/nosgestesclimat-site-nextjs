import { Situation } from '../types'

type Props = {
  question: string
  situation: Situation
}

export default function getIsAnswered({ question, situation }: Props): boolean {
  return situation[question] ? true : situation[question] === 0
}
