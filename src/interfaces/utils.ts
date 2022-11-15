/* istanbul ignore file */

import { ReactPortal, ReactElement } from 'react'

export type SafeTypedAny = RecordType | null | unknown

export type RecordType = Record<string, unknown>
export type RecordTypeString = Record<string, string>
export type RecordTypeUndefined = Record<string, undefined>

type ReactNode =
  | ReadonlyArray<ReactNode>
  | ReactElement
  | string
  | number
  | ReactPortal
  | boolean
  | null
  | undefined

export type ReactWithChildRen<T = unknown> = T & { children?: ReactNode }

export type UnSet = { status: 'UN_SET' }
export type Success<D> = { status: 'SUCCESS'; data: D }
export type Fail = { status: 'FAIL'; error: Error }
export type Loading = { status: 'LOADING' }

export type BaseData<D> = UnSet | Success<D> | Fail | Loading
