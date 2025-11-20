'use server'

/**
 * Verify if the integrator is allowed to bypass the consent data share
 */
// eslint-disable-next-line @typescript-eslint/require-await
export const verifyIfIntegratorBypassRights = async (integratorUrl: string) => {
  return new Set(
    process.env.NEXT_PUBLIC_DATASHARE_BYPASS_ORIGINS?.split(',') ?? []
  ).has(integratorUrl)
}
