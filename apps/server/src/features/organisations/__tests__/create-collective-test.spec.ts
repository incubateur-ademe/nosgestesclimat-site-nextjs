import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'
import { prisma } from '@nosgestesclimat/core/prisma/client'
import { StatusCodes } from 'http-status-codes'
import slugify from 'slugify'
import supertest from 'supertest'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import {
  brevoRemoveFromList,
  brevoSendEmail,
  brevoUpdateContact,
} from '../../../adapters/brevo/__tests__/fixtures/server.fixture.ts'
import { connectUpdateContact } from '../../../adapters/connect/__tests__/fixtures/server.fixture.ts'
import { OrganisationType } from '../../../adapters/prisma/generated.ts'
import app from '../../../app.ts'
import { authHeaders } from '../../../core/__tests__/fixtures/authentication.fixture.ts'
import {
  mswServer,
  resetMswServer,
} from '../../../core/__tests__/fixtures/server.fixture.ts'
import { EventBus } from '../../../core/event-bus/event-bus.ts'
import {
  CREATE_COLLECTIVE_TEST_ROUTE,
  createOrganisation,
} from './fixtures/organisations.fixture.ts'

const slugifyString = (value: string) =>
  slugify.default(value.toLowerCase(), { strict: true })

const collectSentEmails = () => {
  const sentEmails: Array<{ templateId: number }> = []
  mswServer.use(
    http.post(`${process.env.BREVO_URL}/v3/smtp/email`, async ({ request }) => {
      sentEmails.push(
        (await request.json()) as { templateId: number; to: unknown }
      )
      return HttpResponse.json()
    })
  )
  return sentEmails
}

describe('Given a NGC user', () => {
  const agent = supertest(app)
  const url = CREATE_COLLECTIVE_TEST_ROUTE

  afterEach(async () => {
    await prisma.organisationAdministrator.deleteMany()
    await Promise.all([
      prisma.organisation.deleteMany(),
      prisma.user.deleteMany(),
      prisma.verifiedUser.deleteMany(),
      prisma.verificationCode.deleteMany(),
    ])
    resetMswServer()
  })

  describe('And no authentication', () => {
    test(`Then it returns a ${StatusCodes.UNAUTHORIZED} error`, async () => {
      await agent.post(url).expect(StatusCodes.UNAUTHORIZED)
    })
  })

  describe('And not a verified user', () => {
    test(`Then it returns a ${StatusCodes.UNAUTHORIZED} error`, async () => {
      await agent
        .post(url)
        .set(authHeaders({ userId: faker.string.uuid() }))
        .send({
          poll: {
            name: faker.company.buzzNoun(),
          },
        })
        .expect(StatusCodes.UNAUTHORIZED)
    })
  })

  describe('And a verified user', () => {
    let userId: string
    let email: string

    beforeEach(() => {
      userId = faker.string.uuid()
      email = faker.internet.email()
    })

    describe('When submitting a collective test', () => {
      describe('And no data provided', () => {
        test(`Then it returns a ${StatusCodes.BAD_REQUEST} error`, async () => {
          await agent
            .post(url)
            .set(authHeaders({ userId, email }))
            .expect(StatusCodes.BAD_REQUEST)
        })
      })

      describe('And no organisation while the user has no organisation', () => {
        test(`Then it returns a ${StatusCodes.FORBIDDEN} error and creates nothing`, async () => {
          await agent
            .post(url)
            .set(authHeaders({ userId, email }))
            .send({
              poll: {
                name: faker.company.buzzNoun(),
              },
            })
            .expect(StatusCodes.FORBIDDEN)

          expect(await prisma.organisation.count()).toBe(0)
          expect(await prisma.poll.count()).toBe(0)
        })
      })

      describe('And the user has no organisation yet', () => {
        const organisationName = faker.company.name()
        const pollName = faker.company.buzzNoun()

        describe('When creating his organisation and poll', () => {
          test(`Then it returns a ${StatusCodes.CREATED} response with the organisation and the poll`, async () => {
            mswServer.use(
              brevoSendEmail(),
              brevoUpdateContact(),
              brevoRemoveFromList(27),
              connectUpdateContact()
            )

            const response = await agent
              .post(url)
              .set(authHeaders({ userId, email }))
              .send({
                organisation: {
                  name: organisationName,
                  type: OrganisationType.association,
                },
                poll: {
                  name: pollName,
                  mode: 'standard',
                },
              })
              .expect(StatusCodes.CREATED)

            expect(response.body.organisation).toEqual(
              expect.objectContaining({
                name: organisationName,
                slug: slugifyString(organisationName),
                type: OrganisationType.association,
              })
            )
            expect(response.body.poll).toEqual(
              expect.objectContaining({
                name: pollName,
                slug: slugifyString(pollName),
                mode: 'standard',
              })
            )
          })

          test('Then it stores the organisation and the poll in database', async () => {
            mswServer.use(
              brevoSendEmail(),
              brevoUpdateContact(),
              brevoRemoveFromList(27),
              connectUpdateContact()
            )

            const response = await agent
              .post(url)
              .set(authHeaders({ userId, email }))
              .send({
                organisation: {
                  name: organisationName,
                  type: OrganisationType.association,
                },
                poll: {
                  name: pollName,
                  mode: 'standard',
                },
              })
              .expect(StatusCodes.CREATED)

            const organisation = await prisma.organisation.findUniqueOrThrow({
              where: { id: response.body.organisation.id },
              select: {
                name: true,
                administrators: {
                  select: { userEmail: true },
                },
              },
            })
            expect(organisation.name).toBe(organisationName)
            expect(organisation.administrators).toEqual([
              { userEmail: email },
            ])

            const poll = await prisma.poll.findUniqueOrThrow({
              where: { id: response.body.poll.id },
              select: {
                name: true,
                organisationId: true,
              },
            })
            expect(poll.name).toBe(pollName)
            expect(poll.organisationId).toBe(response.body.organisation.id)
          })

          test('Then it sends the organisation created and the poll created emails', async () => {
            const sentEmails = collectSentEmails()
            mswServer.use(
              brevoUpdateContact(),
              brevoRemoveFromList(27),
              connectUpdateContact()
            )

            await agent
              .post(url)
              .set(authHeaders({ userId, email }))
              .send({
                organisation: {
                  name: organisationName,
                  type: OrganisationType.association,
                },
                poll: {
                  name: pollName,
                  mode: 'standard',
                },
              })
              .expect(StatusCodes.CREATED)

            await EventBus.flush()

            expect(sentEmails.map(({ templateId }) => templateId)).toEqual(
              expect.arrayContaining([70, 126])
            )
          })
        })
      })

      describe('And the user already has an organisation', () => {
        let organisationId: string

        beforeEach(async () => {
          const createdOrganisation = await createOrganisation({
            agent,
            userId,
            email,
            organisation: {
              name: faker.company.name(),
              type: OrganisationType.association,
            },
          })
          organisationId = createdOrganisation.id
        })

        describe('When creating a poll', () => {
          test(`Then it returns a ${StatusCodes.CREATED} response with the poll attached to his organisation`, async () => {
            const pollName = faker.company.buzzNoun()

            mswServer.use(
              brevoSendEmail(),
              brevoUpdateContact(),
              brevoRemoveFromList(27)
            )

            const response = await agent
              .post(url)
              .set(authHeaders({ userId, email }))
              .send({
                poll: {
                  name: pollName,
                  mode: 'standard',
                },
              })
              .expect(StatusCodes.CREATED)

            expect(response.body.organisation.id).toBe(organisationId)
            expect(response.body.poll.slug).toBe(slugifyString(pollName))

            const organisation = await prisma.organisation.findUniqueOrThrow({
              where: { id: organisationId },
              select: {
                _count: { select: { polls: true } },
              },
            })
            expect(organisation._count.polls).toBe(1)
          })

          test('Then it does not create a second organisation nor send the organisation created email', async () => {
            const sentEmails = collectSentEmails()
            mswServer.use(brevoUpdateContact(), brevoRemoveFromList(27))

            await agent
              .post(url)
              .set(authHeaders({ userId, email }))
              .send({
                organisation: {
                  name: faker.company.name(),
                  type: OrganisationType.association,
                },
                poll: {
                  name: faker.company.buzzNoun(),
                  mode: 'standard',
                },
              })
              .expect(StatusCodes.CREATED)

            await EventBus.flush()

            expect(await prisma.organisation.count()).toBe(1)
            expect(sentEmails.map(({ templateId }) => templateId)).toEqual([
              126,
            ])
          })
        })
      })
    })
  })
})
