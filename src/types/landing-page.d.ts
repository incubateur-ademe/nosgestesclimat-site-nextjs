import type { ReactNode } from 'react'

export type WhatDoWeMeasureListItem = {
  icon: ReactNode
  title: ReactNode
}

export type GesturesType = {
  [category: string]: {
    imageSrc: string
    imageAlt: string
    gestureList: ReactNode[]
  }
}

export type LandingPagePostType = {
  category: ReactNode
  title: ReactNode
  imageSrc: string
  imageAlt: string
  href: string
  trackingEvent: string[]
}
