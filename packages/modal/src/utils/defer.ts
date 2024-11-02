export type TDefer<T = any> = Promise<T> & {
  _resolve: (value: T) => void
  _reject: (reason?: any) => void
}
export const defer = <T = any>() => {
  let resolve: (value: T) => void
  let reject: (reason?: any) => void
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as TDefer<T>
  promise._resolve = resolve!
  promise._reject = reject!
  return promise
}
