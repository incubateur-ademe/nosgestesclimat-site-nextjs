import { http, HttpResponse } from 'msw'
import { clearEmails, findEmails, storeEmail } from './mailbox.mjs'

const json = (data, status = 200) => HttpResponse.json(data, { status })
const noContent = () => new HttpResponse(null, { status: 204 })

export const handlers = [
  // Brevo — transactional send, captured for the local mailbox.
  http.post('/v3/smtp/email', async ({ request }) => {
    const body = await request.json()
    storeEmail({
      to: body.to?.[0]?.email,
      templateId: body.templateId,
      params: body.params,
    })
    return json({ messageId: `<e2e.${Date.now()}@mock>` }, 201)
  }),

  // Local mailbox, read by the StubMailbox adapter.
  http.get('/emails', ({ request }) => {
    const params = new URLSearchParams(request.url.split('?')[1] ?? '')
    return json(
      findEmails({
        to: params.get('to'),
        templateId: params.get('templateId'),
      })
    )
  }),
  http.delete('/emails', () => {
    clearEmails()
    return noContent()
  }),

  // Brevo — contacts. The mock has no contact store: reads 404
  // (document_not_found), writes succeed. Mirrors the server's
  // isNotFound/isBadRequest handling.
  http.post('/v3/contacts', () => json({}, 201)),
  http.get('/v3/contacts/:email', () =>
    json({ code: 'document_not_found' }, 404)
  ),
  http.delete('/v3/contacts/:email', () =>
    json({ code: 'document_not_found' }, 404)
  ),
  http.post('/v3/contacts/lists/:id/contacts/remove', () => noContent()),
  http.get('/v3/contacts/lists/:id', () => json({ id: 1, name: 'e2e' })),

  // Connect (Agir) — side-effect sink.
  http.post('/api/v1/personnes', () => json({}, 201)),
]
