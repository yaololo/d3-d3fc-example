import { setSuccess, setFetchFail } from '../utils/remote-data'
import { SafeTypedAny, RecordType } from 'src/interfaces/utils'

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT'
type ParamType<P> = {
  method: Method
  url: string
  payload?: P
  newHeader?: Record<string, string>
}

class ApiCaller {
  // Ignored for test coverage as it is private function.
  /* istanbul ignore next */
  private normalizeError = (err: SafeTypedAny) => {
    if (err instanceof Error) {
      return err
    }

    return new Error('Unknown error occurred')
  }

  // Ignored for test coverage as it is private function.
  /* istanbul ignore next */
  private resolveFetchAction = async <T, P extends RequestInit['body']>({
    method,
    url,
    payload,
  }: ParamType<P>) => {
    try {
      const response = await fetch(url, {
        method,
        body: payload,
        headers: {
          'Access-Control-Allow-Origin': '*',
          mode: 'no-cors',
        },
      })

      const { status } = response

      // 499 is our own BE error response
      if (status < 200 || status >= 300) {
        // Define error message
        return setFetchFail(new Error('Operation fail'))
      }

      try {
        const result = await response.json()
        return setSuccess<T>(result)
      } catch (error) {
        return setFetchFail(this.normalizeError(error))
      }
    } catch (error) {
      return setFetchFail(this.normalizeError(error))
    }
  }

  // Ignored for test coverage as it is private function.
  /* istanbul ignore next */

  private toJsonString = (payload: Record<string, unknown>) =>
    JSON.stringify(payload)

  public GET = async <T>(url: string) => {
    return this.resolveFetchAction<T, null>({ method: 'GET', url })
  }

  public POST = async <T, P extends RecordType>(url: string, payload: P) => {
    const requestPayload = this.toJsonString(payload)

    return this.resolveFetchAction<T, string>({
      method: 'POST',
      url,
      payload: requestPayload,
    })
  }

  public PUT = async <T, P extends RecordType>(url: string, payload: P) => {
    const requestPayload = this.toJsonString(payload)

    return this.resolveFetchAction<T, string>({
      method: 'PUT',
      url,
      payload: requestPayload,
    })
  }

  public DELETE = async <T>(url: string) => {
    return this.resolveFetchAction<T, null>({
      method: 'DELETE',
      url,
    })
  }

  public UPLOAD = async <T, P>(
    url: string,
    payload: P,
    file?: File,
    method?: 'POST' | 'PUT',
  ) => {
    const data = new FormData()
    if (file) {
      data.append('uploadedFile', file)
    }

    if (payload && typeof payload === 'object') {
      for (const [key, value] of Object.entries(payload)) {
        data.append(key, value)
      }
    }

    return this.resolveFetchAction<T, FormData>({
      method: method || 'POST',
      url,
      payload: data,
    })
  }
}

export const apiCaller = new ApiCaller()
