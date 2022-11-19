/* istanbul ignore file */

import { ReactPortal, ReactElement } from 'react'

export type SafeTypedAny = RecordType | null | unknown

export type RecordType = Record<string, string>

type ReactNode =
  | ReadonlyArray<ReactNode>
  | ReactElement
  | string
  | number
  | ReactPortal
  | boolean
  | null
  | undefined

export type ReactWithChildren<T = unknown> = T & { children?: ReactNode }

export type UnSet = { status: 'UN_SET' }
export type Success<D> = { status: 'SUCCESS'; data: D }
export type Fail = { status: 'FAIL'; error: Error }
export type Loading = { status: 'LOADING' }

export type BaseData<D> = UnSet | Success<D> | Fail | Loading
