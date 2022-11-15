import { setFetchFail, setSuccess } from 'src/lib/utils/remote-data'
import { apiCaller } from '../index'

const getCall = jest.spyOn(apiCaller, 'GET')
const postCall = jest.spyOn(apiCaller, 'POST')
const putCall = jest.spyOn(apiCaller, 'PUT')
const deleteCall = jest.spyOn(apiCaller, 'DELETE')
const uploadCall = jest.spyOn(apiCaller, 'UPLOAD')

afterEach(() => {
  jest.clearAllMocks()
})

describe('Get api call', () => {
  it('should get error response', async () => {
    getCall.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          return resolve(setFetchFail(new Error('errorMsg')))
        }),
    )

    const url = 'something'
    const result = await apiCaller.GET(url)

    expect(getCall).toBeCalledWith(url)
    expect(result.status).toEqual('FAIL')
  })

  it('should get error response', async () => {
    getCall.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          return resolve(setSuccess({ message: '' }))
        }),
    )

    const url = 'newUrl'
    const result = await apiCaller.GET(url)

    expect(getCall).toBeCalledWith(url)
    expect(result.status).toEqual('SUCCESS')
  })
})

describe('Post api call', () => {
  it('should get error response', async () => {
    postCall.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          return resolve(setFetchFail(new Error('errorMsg')))
        }),
    )

    const url = 'something'
    const payload = { data: '' }
    const result = await apiCaller.POST(url, payload)

    expect(postCall).toBeCalledWith(url, payload)
    expect(result.status).toEqual('FAIL')
  })

  it('should get success response', async () => {
    postCall.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          return resolve(setSuccess({ message: '' }))
        }),
    )

    const url = 'newUrl'
    const payload = { data: '' }
    const result = await apiCaller.POST(url, payload)

    expect(postCall).toBeCalledWith(url, payload)
    expect(result.status).toEqual('SUCCESS')
  })
})

describe('PUT api call', () => {
  it('should get error response', async () => {
    putCall.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          return resolve(setFetchFail(new Error('errorMsg')))
        }),
    )

    const url = 'something'
    const payload = { data: '' }
    const result = await apiCaller.PUT(url, payload)

    expect(putCall).toBeCalledWith(url, payload)
    expect(result.status).toEqual('FAIL')
  })

  it('should get success response', async () => {
    putCall.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          return resolve(setSuccess({ message: '' }))
        }),
    )

    const url = 'newUrl'
    const payload = { data: '' }
    const result = await apiCaller.PUT(url, payload)

    expect(putCall).toBeCalledWith(url, payload)
    expect(result.status).toEqual('SUCCESS')
  })
})

describe('Delete  api call', () => {
  it('should get error response', async () => {
    deleteCall.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          return resolve(setFetchFail(new Error('errorMsg')))
        }),
    )

    const url = 'something'
    const result = await apiCaller.DELETE(url)

    expect(deleteCall).toBeCalledWith(url)
    expect(result.status).toEqual('FAIL')
  })

  it('should get success response', async () => {
    deleteCall.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          return resolve(setSuccess({ message: '' }))
        }),
    )

    const url = 'newUrl'
    const result = await apiCaller.DELETE(url)

    expect(deleteCall).toBeCalledWith(url)
    expect(result.status).toEqual('SUCCESS')
  })
})

describe('Upload  api call', () => {
  it('should get error response', async () => {
    uploadCall.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          return resolve(setFetchFail(new Error('errorMsg')))
        }),
    )

    const url = 'something'
    const payload = { data: '' }
    const result = await apiCaller.UPLOAD(url, payload)

    expect(uploadCall).toBeCalledWith(url, payload)
    expect(result.status).toEqual('FAIL')
  })

  it('should get success response', async () => {
    uploadCall.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          return resolve(setSuccess({ message: '' }))
        }),
    )

    const url = 'newUrl'
    const payload = { data: '' }
    const result = await apiCaller.UPLOAD(url, payload)

    expect(uploadCall).toBeCalledWith(url, payload)
    expect(result.status).toEqual('SUCCESS')
  })
})
