import * as XLSX from 'xlsx'

export function createXLSXFileAndDownload({
  data,
  fileName,
  callback = () => {},
}: {
  data: { [key: string]: any }[]
  fileName: string
  callback: () => void
}) {
  const worksheet = XLSX.utils.json_to_sheet(data)

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Simulations')

  XLSX.writeFile(workbook, fileName)

  callback()
}
