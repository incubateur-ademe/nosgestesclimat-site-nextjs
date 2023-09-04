import { useState } from 'react'

export default function useActionChoices() {
  const [actionChoices, setActionChoices] = useState<{
    [key: string]: boolean | undefined
  }>({})

  const toggleActionChoice = (toggledActionChoice: string) => {
    setActionChoices((prevActionChoice) => ({
      ...prevActionChoice,
      actionChoiceAdded: prevActionChoice?.[toggledActionChoice] ? false : true,
    }))
  }

  const setActionChoiceValue = ({
    actionChoiceDottedName,
    value,
  }: {
    actionChoiceDottedName: string
    value: boolean | undefined
  }) => {
    setActionChoices((prevActionChoice) => ({
      ...prevActionChoice,
      [actionChoiceDottedName]: value,
    }))
  }

  return {
    actionChoices,
    toggleActionChoice,
    setActionChoiceValue,
  }
}
