'use server'

interface DataSent {
  date: string
  time: string
  reasons: string
}

const webhookURL = process.env.GOOGLE_SHEET_WEBHOOK_URL

export async function sendDataToGoogleSheet(data: DataSent) {
  if (!webhookURL) {
    throw new Error(
      'Google Sheet webhook URL is not configured. Please check your environment variables.'
    )
  }

  const response = await fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorText = await response.text()

    throw new Error(
      `Failed to send data to Google Sheet: ${response.statusText} - ${errorText}`
    )
  }
}
