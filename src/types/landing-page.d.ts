import { ReactNode } from 'react'

export type WhatDoWeMeasureListItem = {
  icon: ReactNode
  title: ReactNode
}

export type GesturesType = {
  [category: string]: ReactNode[]
}
