type Props = {
  params: {
    step: string
  }
}

export default function page({ params: { step } }: Props) {
  return <div>{step}</div>
}
