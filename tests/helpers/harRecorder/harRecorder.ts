import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname } from 'node:path'
import { toHar } from './toHar'
export class HarRecorder {
  private requests: Array<{
    request: Request
    response: Response
    timestamp: number
  }> = []
  constructor(private path: string) {}
  async save(request: Request) {
    const response = await fetch(request)
    this.requests.push({ request, response, timestamp: Date.now() })
    return response
  }

  writeToFile() {
    let entries: any[] = []
    if (existsSync(this.path)) {
      const previousHar = JSON.parse(readFileSync(this.path, 'utf-8'))
      entries = previousHar.log.entries
    }
    const har = toHar(this.requests)
    har.log.entries = [...entries, ...har.log.entries]

    if (!existsSync(dirname(this.path))) {
      mkdirSync(dirname(this.path), { recursive: true })
    }
    writeFileSync(this.path, JSON.stringify(har, null, 2), {})
  }
}
