import { faker } from '@faker-js/faker'
import { URLSearchParams } from 'url'
import { appendSearchParams } from '../appendSearchParams'

describe('appendSearchParams', () => {
  it('should return the inputted url or pathname if no searchParams are passed', () => {
    const url = faker.internet.url()

    expect(appendSearchParams(url, undefined)).toEqual(url)
  })

  it('should append the searchParams passed to the url', () => {
    const url = faker.internet.url()

    expect(
      appendSearchParams(url, new URLSearchParams({ test: 'test', foo: 'bar' }))
    ).toEqual(`${url}?test=test&foo=bar`)
  })

  it('should append an array type searchParam to the url', () => {
    const initialUrl = new URL(`${faker.internet.url()}?test=test1&test=test2`)

    const url = faker.internet.url()

    expect(appendSearchParams(url, initialUrl.searchParams)).toEqual(
      `${url}?test=test1&test=test2`
    )
  })
})
