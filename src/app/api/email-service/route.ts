import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const axiosConf = {
  headers: {
    'api-key': process.env.BREVO_API_KEY,
  },
}

export async function POST(request: NextRequest) {
  const result = await request.json()
  const { email, shareURL, simulationURL, shouldSendReminder } = result

  const attributes: { [key: string]: string | boolean } = {
    OPT_IN: false,
  }

  // In case the user wants to be reminded in 6 months
  // we need to save the simulation URL permanently in the Brevo contact
  if (shouldSendReminder) {
    attributes.SIMULATION_URL = simulationURL
  }

  // Add contact to list
  try {
    await axios.post(
      'https://api.brevo.com/v3/contacts',
      {
        email,
        attributes,
      },
      axiosConf
    )
  } catch (error) {
    // Do nothing, the contact already exists
  }

  await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
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
