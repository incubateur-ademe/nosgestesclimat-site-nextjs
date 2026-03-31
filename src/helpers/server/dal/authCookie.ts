export const AUTHENTICATED_COOKIE_NAME = process.env.COOKIE_NAME ?? 'ngcjwt2'

const domain = new URL(process.env.NEXT_PUBLIC_SITE_URL!).hostname
const secure = domain !== 'localhost'

export const DEFAULT_COOKIE_OPTION = {
  httpOnly: true,
  secure,
  partitioned: secure,
  sameSite: 'lax' as const,
  domain,
}
