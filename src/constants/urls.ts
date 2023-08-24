const openmojis = {
  test: '25B6',
  action: 'E10C',
  conference: '1F3DF',
  sondage: '1F4CA',
  profile: 'silhouette',
  silhouettes: 'silhouettes',
  personas: '1F465',
  github: 'E045',
} as { [key: string]: string }

export const getOpenmojiURL = (name: string) => `/images/${openmojis[name]}.svg`

export const NETLIFY_FUNCTIONS_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888/.netlify/functions'
    : '/.netlify/functions'

export const secure = process.env.NODE_ENV === 'development' ? '' : 's'
const protocol = `http${secure}://`

export const SERVER_URL = protocol + process.env.SERVER_URL

export const SURVEYS_URL = SERVER_URL + '/surveys/'

export const GROUP_URL =
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : SERVER_URL) + '/group'
