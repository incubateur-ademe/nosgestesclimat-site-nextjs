// In-memory store of transactional emails captured from the Brevo mock.

const emails = []

export const storeEmail = ({ to, templateId, params }) => {
  emails.push({
    to,
    templateId,
    params,
    receivedAt: new Date().toISOString(),
  })
}

export const findEmails = ({ to, templateId }) =>
  emails
    .filter((email) => !to || email.to === to)
    .filter((email) => !templateId || String(email.templateId) === templateId)
    .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))

export const clearEmails = () => {
  emails.length = 0
}
