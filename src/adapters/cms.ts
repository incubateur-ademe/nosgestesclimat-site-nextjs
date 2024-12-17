import axios from 'axios'

export const cmsClient = axios.create({
  baseURL: process.env.CMS_URL,
  headers: {
    Authorization: `Bearer ${process.env.CMS_TOKEN}`,
  },
})
