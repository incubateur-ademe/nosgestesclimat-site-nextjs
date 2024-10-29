import { ReactNode } from 'react'

export type WhatDoWeMeasureListItem = {
  icon: ReactNode
  title: ReactNode
}

export type GesturesType = {
  [category: string]: {
    imageSrc: string
    gestureList: ReactNode[]
  }
}

export type LandingPagePostType = {
  category: string
  title: string
  imageSrc: string
  href: string
}
