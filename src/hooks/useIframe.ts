import { IframeOptionsContext } from '@/app/_components/mainLayoutProviders/IframeOptionsContext'
import { useContext } from 'react'

export const useIframe = () => useContext(IframeOptionsContext)
