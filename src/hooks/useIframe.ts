import { IframeOptionsContext } from '@/contexts/IframeOptionsContext'
import { useContext } from 'react'

export const useIframe = () => useContext(IframeOptionsContext)
