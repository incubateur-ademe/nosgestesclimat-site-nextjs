'use client'

import { PropsWithChildren, createContext, useState } from 'react'

type GroupCreationContextType = {
  groupValues?: { name: string; emoji: string }
  updateGroup: (group: { name: string; emoji: string }) => void
}

export const GroupCreationContext = createContext<GroupCreationContextType>({
  groupValues: undefined,
  updateGroup: () => {},
})

export function GroupCreationProvider({ children }: PropsWithChildren) {
  const [groupValues, setGroupValues] = useState<
    { name: string; emoji: string } | undefined
  >(undefined)

  function updateGroup(values: { name: string; emoji: string }) {
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
