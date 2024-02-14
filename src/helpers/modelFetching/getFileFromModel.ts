import { getPreviewUrl } from '@/constants/urls'
import axios from 'axios'

type Props = {
  fileName: string
  PRNumber?: string
}
/**
 * Assess if we are in preview mode or production mode and fetch the file accordingly
 */
export default async function getFileFromModel({ fileName, PRNumber }: Props) {
  // If a PR Number is provided, we want to use the preview data
  if (PRNumber) {
    const previewFile = await importPreviewFile({
      fileName,
      PRNumber,
    })
    if (previewFile) return previewFile
  }

  // Otherwise, we want to use the production data
  const file = await importFile({ fileName })

  return file
}

async function importPreviewFile({
  fileName,
  PRNumber,
}: {
  fileName: string
  PRNumber: string
}) {
  const previewURL = getPreviewUrl(PRNumber)
  console.log('fetching preview file', fileName)
  return axios
    .get(`${previewURL}/${fileName}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error('importPreviewFile error', e)
      return null
    })
}

async function importFile({ fileName }: { fileName: string }) {
  console.log('importing file', fileName)
  try {
    return await import(
      `@incubateur-ademe/nosgestesclimat/public/${fileName}`
    ).then((module) => module.default)
  } catch (e) {
    console.error('importFile error', e)
    return {}
  }
}
