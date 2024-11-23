/**
 * A deferred promise
 *
 * @template T The type of the promise
 * @property promise The promise
 * @property _resolve The resolve function
 * @property _reject The reject function
 *
 * @example
 * const _defer = defer<number>()
 * _defer.promise.then(value => console.log(value))
 * _defer._resolve(42)
 */
export type TDefer<T = any> = {
  promise: Promise<T>
  _resolve: (value: T) => void
  _reject: (reason?: any) => void
}
/**
 * Creates a deferred promise
 *
 * @returns  A deferred promise
 * @template T The type of the promise
 * @example
 *
 * const _defer = defer<number>()
 * _defer.promise.then(value => console.log(value))
 * _defer._resolve(42)
 *
 */
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
