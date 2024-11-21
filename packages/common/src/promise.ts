export type TDefer<T = any> = {
  promise: Promise<T>
  _resolve: (value: T) => void
  _reject: (reason?: any) => void
}
export const defer = <T = any>() => {
  const _defer = {
    resolve: null,
    reject: null,
  } as unknown as TDefer<T>
  _defer.promise = new Promise<T>((_resolve, _reject) => {
    _defer._resolve = _resolve
    _defer._reject = _reject
  })
  return _defer
}
