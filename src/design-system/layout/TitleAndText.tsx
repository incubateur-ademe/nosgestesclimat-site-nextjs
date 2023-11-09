import { PropsWithChildren } from 'react'

function TitleAndText({ children }: PropsWithChildren) {
  return <div>{children}</div>
}

function SmallTitle({ children }: PropsWithChildren) {
  return <h3>{children}</h3>
}
function Title({ children }: PropsWithChildren) {
  return <h2>{children}</h2>
}
function Text({ children }: PropsWithChildren) {
  return <p>{children}</p>
}

TitleAndText.SmallTitle = SmallTitle
TitleAndText.Title = Title
TitleAndText.Text = Text

export default TitleAndText
