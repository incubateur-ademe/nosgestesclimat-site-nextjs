type Props = {
  onClick: any
  color?: 'white' | 'primary'
}

export const colorClassNames = {
  primary: 'border-primary text-primary',
  white: 'border-white text-white',
}
export default function QuestionButton({ onClick, color = 'primary' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${colorClassNames[color]} border-2 z-10 w-7 h-7 leading-none	font-bold text-lg rounded-full bg-transparent`}>
      ?
    </button>
  )
}
