import {
  COLLECTIVE_TEST_INFORMATIONS_PATH,
  COLLECTIVE_TEST_MODE_PATH,
} from '@/constants/urls/paths'
import { redirect } from 'next/navigation'

export function redirectToCollectiveTestInformations() {
  redirect(COLLECTIVE_TEST_INFORMATIONS_PATH)
}

export function redirectToCollectiveTestMode() {
  redirect(COLLECTIVE_TEST_MODE_PATH)
}
