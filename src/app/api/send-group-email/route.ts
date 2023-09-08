import Brevo from '@getbrevo/brevo'
import BrevoClient from '@getbrevo/brevo/src/ApiClient'

const TEMPLATE_ID_GROUP_CREATED = 57
const TEMPLATE_ID_GROUP_JOINED = 58

export async function POST(req: Request) {
  const { email, shareURL, groupURL, deleteURL, groupName, name, isCreation } =
    await req.json()

  console.log(Brevo)

  const defaultClient = BrevoClient.instance

  // Configure API key authorization: api-key
  const apiKey = defaultClient.authentications['api-key']
  apiKey.apiKey = process.env.BREVO_API_KEY

  // Add contact to list
  const contactApiInstance = new Brevo.ContactsApi()

  const createContact = new Brevo.CreateContact()

  createContact.email = email
  createContact.name = name
  createContact.attributes = {
    OPT_IN: true,
  }

  try {
    await contactApiInstance.createContact(createContact)
  } catch (e) {
    // Do nothing, contact already exists
  }

  const transacApiInstance = new Brevo.TransactionalEmailsApi()

  const sendSmtpEmail = new Brevo.SendSmtpEmail() // SendSmtpEmail | Values to send a transactional email
  sendSmtpEmail.sender = {
    name: 'Nos Gestes Climat',
    email: 'contact@nosgestesclimat.fr',
  }
  sendSmtpEmail.replyTo = {
    name: 'Nos Gestes Climat',
    email: 'contact@nosgestesclimat.fr',
  }
  sendSmtpEmail.to = [
    {
      name: email,
      email,
    },
  ]
  sendSmtpEmail.templateId = isCreation
    ? TEMPLATE_ID_GROUP_CREATED
    : TEMPLATE_ID_GROUP_JOINED
  sendSmtpEmail.params = {
    SHARE_URL: shareURL,
    GROUP_URL: groupURL,
    DELETE_URL: deleteURL,
    GROUP_NAME: groupName,
    NAME: name,
  }

  try {
    await transacApiInstance.sendTransacEmail(sendSmtpEmail)
  } catch (e) {
    console.log(e)
    return new Response('Error', {
      status: 404,
    })
  }

  // Respond with the stream
  return new Response('Emails sent.', {
    status: 200,
  })
}
