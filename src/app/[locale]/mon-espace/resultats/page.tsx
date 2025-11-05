import { NOT_FOUND_PATH } from '@/constants/urls/paths'
import { redirect } from 'next/navigation'

export default function ResultatsPage() {
  redirect(NOT_FOUND_PATH)
}
