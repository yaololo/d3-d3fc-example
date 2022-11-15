import {
  RecordType,
  RecordTypeString,
  RecordTypeUndefined,
} from 'src/interfaces/utils'

/**
 * @param value is an object
 * @returns query string
 *
 * e.g. value = {a: 'as', b: 'bs'}
 *  queryStringify(value) => "a=as&b=bs"
 */
export const queryStringify = (value: RecordTypeString) => {
  return new URLSearchParams(value).toString()
}

/**
 * @returns object based on current query string
 *
 * e.g. query string is"a=as&b=bs"
 *  getQueryObj => {a: 'as', b: 'bs}
 */
export const getQueryObj = <T extends RecordType | RecordTypeUndefined>() => {
  return Object.fromEntries(new URLSearchParams(location.search)) as T
}
