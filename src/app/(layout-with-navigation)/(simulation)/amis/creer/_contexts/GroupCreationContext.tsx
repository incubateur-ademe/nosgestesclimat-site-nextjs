'use client'

import { PropsWithChildren, createContext, useState } from 'react'

type GroupCreationContextType = {
  groupValues?: { administratorName: string; administratorEmail: string }
  updateGroup: (group: {
    administratorName: string
    administratorEmail: string
  }) => void
}

export const GroupCreationContext = createContext<GroupCreationContextType>({
  groupValues: undefined,
  updateGroup: () => {},
})

export function GroupCreationProvider({ children }: PropsWithChildren) {
  const [groupValues, setGroupValues] = useState<
    { administratorName: string; administratorEmail: string } | undefined
  >(undefined)

  function updateGroup(values: {
    administratorName: string
    administratorEmail: string
  }) {
    setGroupValues({ ...groupValues, ...values })
  }

  return (
    <GroupCreationContext.Provider
      value={{
        groupValues,
        updateGroup,
      }}>
      {children}
    </GroupCreationContext.Provider>
  )
}
