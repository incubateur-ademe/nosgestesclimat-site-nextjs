import { AbTestingContext } from '@/contexts/AbTestingContext'
import { useContext } from 'react'

export default function useAbTesting() {
  return useContext(AbTestingContext)
}
