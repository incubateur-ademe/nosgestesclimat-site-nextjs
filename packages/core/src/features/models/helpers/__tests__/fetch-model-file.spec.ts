import { afterEach, describe, expect, it, vi } from 'vitest'
import { ModelFileFetchFailedException } from '../../exceptions/model-rules.exception.ts'
import { fetchModelFile } from '../fetch-model-file.ts'

const REMOTE_RULES = { bilan: { formule: 0 } }

const okResponse = () => ({
  ok: true,
  json: () => Promise.resolve(REMOTE_RULES),
})

describe('fetchModelFile', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns the parsed body on a successful request', async () => {
    const fetchMock = vi.fn().mockResolvedValue(okResponse())
    vi.stubGlobal('fetch', fetchMock)

    const rules = await fetchModelFile('https://example.com/model.json')

    expect(fetchMock).toHaveBeenCalledOnce()
    expect(rules).toEqual(REMOTE_RULES)
  })

  it('throws on a missing remote file instead of resolving to an empty rule set', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    )

    await expect(
      fetchModelFile('https://example.com/model.json')
    ).rejects.toThrow(ModelFileFetchFailedException)
  })

  it('does not retry a 4xx', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 404 })
    vi.stubGlobal('fetch', fetchMock)

    await expect(
      fetchModelFile('https://example.com/model.json')
    ).rejects.toThrow(ModelFileFetchFailedException)
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('retries once on a transient failure', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('ECONNRESET'))
      .mockResolvedValueOnce(okResponse())
    vi.stubGlobal('fetch', fetchMock)

    const rules = await fetchModelFile('https://example.com/model.json')

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(rules).toEqual(REMOTE_RULES)
  })

  it('gives up after the retry', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 502 })
    vi.stubGlobal('fetch', fetchMock)

    await expect(
      fetchModelFile('https://example.com/model.json')
    ).rejects.toThrow(ModelFileFetchFailedException)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
