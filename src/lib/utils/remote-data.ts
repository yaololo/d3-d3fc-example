import { Success, Fail, Loading, UnSet } from 'src/interfaces/utils'

export const setFetchFail = (error: Error) =>
  ({
    status: 'FAIL',
    error,
  } as Fail)

export const setSuccess = <D>(data: D) =>
  ({
    status: 'SUCCESS',
    data,
  } as Success<D>)

export const setLoading = () =>
  ({
    status: 'LOADING',
  } as Loading)

export const setUnSet = () => ({ status: 'UN_SET' } as UnSet)
