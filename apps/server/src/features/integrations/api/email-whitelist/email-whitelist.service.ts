import { prisma } from '@nosgestesclimat/core/prisma/client'
import { isPrismaErrorNotFound } from '@nosgestesclimat/core/prisma/utils'
import { transaction } from '../../../../adapters/prisma/transaction.ts'
import { EntityNotFoundException } from '../../../../core/errors/EntityNotFoundException.ts'
import { ForbiddenException } from '../../../../core/errors/ForbiddenException.ts'
import type {
  EmailWhitelistCreateDto,
  EmailWhitelistParams,
  EmailWhitelistsFetchQuery,
  EmailWhitelistUpdateDto,
} from './email-whitelist.contract.ts'
import {
  createWhitelist,
  deleteWhitelist,
  fetchWhitelists,
  updateWhitelist,
} from './email-whitelist.repository.ts'

const whitelistToDto = ({
  apiScopeName,
  ...whitelist
}: Awaited<ReturnType<typeof createWhitelist>>) => ({
  ...whitelist,
  scope: apiScopeName,
})

export const createEmailWhitelist = async ({
  emailWhitelistDto,
  userScopes,
}: {
  emailWhitelistDto: EmailWhitelistCreateDto
  userScopes: Set<string>
}) => {
  try {
    if (!userScopes.has(emailWhitelistDto.scope)) {
      throw new ForbiddenException(
        `Unauthorized to create whitelist for ${emailWhitelistDto.scope}`
      )
    }

    const whitelist = await createWhitelist(emailWhitelistDto, {
      session: prisma,
    })

    return whitelistToDto(whitelist)
  } catch (e) {
    if (isPrismaErrorNotFound(e)) {
      throw new EntityNotFoundException('ApiScope not found')
    }
    throw e
  }
}

export const updateEmailWhitelist = async ({
  params,
  userScopes,
  emailWhitelistDto,
}: {
  params: EmailWhitelistParams
  userScopes: Set<string>
  emailWhitelistDto: EmailWhitelistUpdateDto
}) => {
  try {
    const whitelist = await updateWhitelist(
      params,
      emailWhitelistDto,
      userScopes,
      { session: prisma }
    )

    return whitelistToDto(whitelist)
  } catch (e) {
    if (isPrismaErrorNotFound(e)) {
      throw new EntityNotFoundException('Email Whitelist not found')
    }
    throw e
  }
}

export const deleteEmailWhitelist = async ({
  params,
  userScopes,
}: {
  params: EmailWhitelistParams
  userScopes: Set<string>
}) => {
  try {
    await deleteWhitelist(params, userScopes, { session: prisma })
  } catch (e) {
    if (isPrismaErrorNotFound(e)) {
      throw new EntityNotFoundException('Email Whitelist not found')
    }
    throw e
  }
}

export const fetchEmailWhitelists = async ({
  query,
  userScopes,
}: {
  query: EmailWhitelistsFetchQuery
  userScopes: Set<string>
}) => {
  const whitelists = await transaction(
    (session) =>
      fetchWhitelists(
        {
          ...query,
          scopes: userScopes,
        },
        { session }
      ),
    prisma
  )

  return whitelists.map(whitelistToDto)
}
