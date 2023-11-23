import axios from 'axios'
import { NextResponse } from 'next/server'

const TEMPLATE_ID_GROUP_CREATED = 57
const TEMPLATE_ID_GROUP_JOINED = 58

const axiosConf = {
  headers: {
    'api-key': process.env.BREVO_API_KEY,
  },
}

export async function POST(req: Request) {
  const result = await req.json()
  const { email, shareURL, groupURL, deleteURL, groupName, name, isCreation } =
    result

  // Add contact to list
  try {
    await axios.post(
      'https://api.brevo.com/v3/contacts',
      {
        email,
        name,
        attributes: {
          OPT_IN: true,
        },
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
      templateId: isCreation
        ? TEMPLATE_ID_GROUP_CREATED
        : TEMPLATE_ID_GROUP_JOINED,
      params: {
        SHARE_URL: shareURL,
        GROUP_URL: groupURL,
        DELETE_URL: deleteURL,
        GROUP_NAME: groupName,
        NAME: name,
      },
    },
    axiosConf
  )

  return new NextResponse('Email sent.', {
    status: 200,
  })
}

export async function GET() {
  // Respond with the stream

  return new NextResponse('This function do not support GET.', {
    status: 200,
  })
}
