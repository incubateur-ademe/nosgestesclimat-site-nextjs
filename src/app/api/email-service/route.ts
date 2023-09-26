import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const axiosConf = {
  headers: {
    'api-key': process.env.BREVO_API_KEY,
  },
}

export async function POST(request: NextRequest) {
  const result = await request.json()
  const { email, shareURL, simulationURL } = result

  // Add contact to list
  try {
    await axios.post(
      'https://api.brevo.com/v3/contacts',
      {
        email,
        attributes: {
          OPT_IN: true,
        },
      },
      axiosConf
    )
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }

  await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      sender: {
        name: 'Nos Gestes Climat',
        email: 'contact@nosgestesclimat.fr',
      },
      replyTo: {
        name: 'Nos Gestes Climat',
        email: 'contact@nosgestesclimat.fr',
      },
      to: [
        {
          name: email,
          email,
        },
      ],
      templateId: 55,
      params: {
        SHARE_URL: shareURL,
        SIMULATION_URL: simulationURL,
      },
    },
    axiosConf
  )

  return new NextResponse('Email sent.', {
    status: 200,
  })
}
