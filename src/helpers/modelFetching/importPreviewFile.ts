import { getPreviewUrl } from '@/constants/urls/main'
import { captureException } from '@sentry/nextjs'
import axios from 'axios'

type Props = {
  fileName: string
  PRNumber: string
}

// fetch file from PR
export async function importPreviewFile({ fileName, PRNumber }: Props) {
  const previewURL = getPreviewUrl(PRNumber)
  console.log('fetching preview file', fileName)
  return axios
    .get(`${previewURL}/${fileName}`)
    .then((res) => res.data)
    .catch((e) => {
      captureException(e)
      return null
    })
}
