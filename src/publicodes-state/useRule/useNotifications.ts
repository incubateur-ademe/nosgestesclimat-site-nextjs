'use client'

import { useMemo } from 'react'
import { NGCEvaluatedNode, Situation } from '../types'

type Props = {
  dottedName: string
  everyNotifications: string[]
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  situation: Situation
}

export default function useNotifications({
  dottedName,
  everyNotifications,
  safeEvaluate,
  situation,
}: Props) {
  const notifications = useMemo<string[]>(
    () =>
      everyNotifications.filter(
        (notification) =>
          notification.split(' . ')[1] === dottedName.split(' . ')[1],
        [dottedName, everyNotifications]
      ),
    [dottedName, everyNotifications]
  )

  const activeNotifications = useMemo<string[]>(
    () =>
      notifications.filter(
        (notification) => safeEvaluate(notification)?.nodeValue
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notifications, safeEvaluate, situation]
  )

  return { notifications, activeNotifications }
}
