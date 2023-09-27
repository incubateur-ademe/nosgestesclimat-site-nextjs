import axios from 'axios'
import { NextResponse } from 'next/server'

const axiosConf = {
  headers: {
    'api-key': process.env.BREVO_API_KEY,
  },
}

export async function GET() {
  if (!process.env.BREVO_API_KEY) {
    return new NextResponse('0', {
      status: 200,
    })
  }
  const listInfos = await axios.get(
    'https://api.brevo.com/v3/contacts/lists/22',

    axiosConf
  )

  return new NextResponse(listInfos?.data.totalSubscribers, {
    status: 200,
  })
}
