import { Exception } from '../../../exception.js'

export class ModelFileFetchFailedException extends Exception<{
  url: string
  status?: number
}> {
  level = 'error' as const
}

export class OutdatedModelVersionException extends Exception<{
  publishedTag: string
  currentModelVersion: string
}> {
  level = 'warning' as const
}
