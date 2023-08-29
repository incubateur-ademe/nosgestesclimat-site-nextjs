/* eslint-disable @typescript-eslint/require-await */
import { Handler } from '@netlify/functions'
import CryptoJS from 'crypto-js'

/**
 * Decrypts data with AES (use to decrypt data from encrypt-data.ts)
 * @param {string} data - Data to decrypt
 */
const handler: Handler = async (event) => {
  const data = String(event.body)

  const decryptedData = CryptoJS.AES.decrypt(
    data,
    process.env.ENCRYPTION_KEY || ''
  ).toString(CryptoJS.enc.Utf8)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(decryptedData),
  }
}

export { handler }
