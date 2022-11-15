/* eslint-disable @typescript-eslint/ban-ts-comment */
import { queryStringify, getQueryObj } from '../query-string'

describe('query string functions', () => {
  const obj = { a: 'ab', b: 'ba' }
  // @ts-ignore
  delete window.location
  // @ts-ignore
  window.location = new URL('https://www.example.com?a=ab&b=ba')

  it('queryStringify should convert obj into url query params', () => {
    const result = queryStringify(obj)

    expect(result).toBe('a=ab&b=ba')
  })

  it('getQueryObj should convert query params into object', () => {
    const result = getQueryObj()

    expect(result).toEqual(obj)
  })
})
