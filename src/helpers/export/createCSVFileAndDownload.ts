import dayjs from 'dayjs'

export function createCSVFileAndDownload({
  csvHeaderRow,
  csvDataRows,
  callback,
}: {
  csvHeaderRow: string
  csvDataRows: string[]
  callback: () => void
}) {
  let csv = csvHeaderRow + '\\n'

  // Merge the data with csv
  csvDataRows.forEach(function (row) {
    csv += row + '\\n'
  })

  const hiddenElement = document.createElement('a')

  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
  hiddenElement.target = '_blank'

  // Set a name for the file
  hiddenElement.download = `nos-gestes-climat-export-${dayjs().format(
    'DD-MM-YYYY'
  )}.csv`

  hiddenElement.click()

  callback()
}
