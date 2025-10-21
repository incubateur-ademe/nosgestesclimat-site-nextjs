import { IframeStaticContext } from '@/app/[locale]/_components/IframeStaticProvider'
import { useContext } from 'react'

export const useIframeStatic = () => useContext(IframeStaticContext)
