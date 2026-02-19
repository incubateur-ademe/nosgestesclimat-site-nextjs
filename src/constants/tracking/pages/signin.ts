import type { AuthenticationMode } from '@/types/authentication'

export const captureClickSubmitEmail = ({
  mode,
}: {
  mode?: AuthenticationMode
}) => {
  return {
    eventName: 'click submit email',
    properties: {
      mode,
    },
  }
}

export const captureClickTab = ({
  tab,
}: {
  tab: 'connexion' | 'inscription'
}) => {
  return {
    eventName: 'click tab',
    properties: {
      tab,
    },
  }
}

export const captureClickResendCode = () => {
  return {
    eventName: 'click resend code',
  }
}
