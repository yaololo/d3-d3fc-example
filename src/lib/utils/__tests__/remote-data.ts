import { setFetchFail, setLoading, setSuccess, setUnSet } from '../remote-data'

describe('remote data functions', () => {
  it('setUnSet should object with status field equal to "UN_SET"', () => {
    const expected = { status: 'UN_SET' }
    expect(setUnSet()).toEqual(expected)
  })

  it('setLoading should object with status field equal to "LOADING"', () => {
    const expected = { status: 'LOADING' }
    expect(setLoading()).toEqual(expected)
  })

  it('setFetchFail should object with status field equal to "FAIL" and error field equal to Error', () => {
    const error = new Error('test')
    const expected = { status: 'FAIL', error }
    expect(setFetchFail(error)).toEqual(expected)
  })

  it('setSuccess should object with status field equal to "SUCCESS" and data field equal to value provided', () => {
    const data = { a: 'ab' }
    const expected = { status: 'SUCCESS', data }
    expect(setSuccess(data)).toEqual(expected)
  })
})
