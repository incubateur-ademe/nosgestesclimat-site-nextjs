/* eslint-disable @typescript-eslint/require-await */
import { Handler } from '@netlify/functions'
import CryptoJS from 'crypto-js'

/**
 * Encrypts data with AES
 * @param {string} data - Data to encrypt
 */
const handler: Handler = async (event) => {
  const data = JSON.parse(event.body as string) as string

  const encryptedData = CryptoJS.AES.encrypt(
    data,
    process.env.ENCRYPTION_KEY || ''
  ).toString()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(encryptedData),
  }
}

export { handler }
