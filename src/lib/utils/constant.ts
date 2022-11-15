type RemoteStatus = 'FAIL' | 'SUCCESS' | 'LOADING' | 'UN_SET'

export const REMOTE_STATUS: Record<string, RemoteStatus> = {
  fail: 'FAIL',
  success: 'SUCCESS',
  loading: 'LOADING',
  unSet: 'UN_SET',
}

export const dateFormat = 'YYYY-MM-DD'
