'use client'

import { Group } from '@/types/groups'
import { PropsWithChildren, createContext, useState } from 'react'

type GroupCreationContextType = {
  groupValues?: Pick<Group, 'name' | 'emoji'>
  updateGroup: (group: Pick<Group, 'name' | 'emoji'>) => void
}

export const GroupCreationContext = createContext<GroupCreationContextType>({
  groupValues: undefined,
  updateGroup: () => {},
})

export function GroupCreationProvider({ children }: PropsWithChildren) {
  const [groupValues, setGroupValues] = useState<
    Pick<Group, 'name' | 'emoji'> | undefined
  >(undefined)

  function updateGroup(values: Pick<Group, 'name' | 'emoji'>) {
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
