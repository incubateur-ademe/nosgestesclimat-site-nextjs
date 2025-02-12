'use client'

import GroupItem from './groupList/GroupItem'

type Props = {
  groups: any[]
  className?: string
}

export default function GroupList({ groups, className = '' }: Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      {groups.map((group, index) => {
        return (
          <GroupItem key={`group-item-${index}`} group={group} index={index} />
        )
      })}
    </div>
  )
}
