import { Ref, WritableComputedRef } from 'vue'

/**
 * A function that toggles a boolean `ref` to its opposite value before executing the provided function,
 *
 * and toggles it back to its original value after the execution completes,
 *
 * regardless of whether the function succeeds or throws an error.
 *
 * @param boolRef The boolean ref to toggle
 * @param fn The function to call
 * @returns The return value of the provided function
 *
 * @example
 * const loading = ref(false)
 * const data = withToggleRef(loading, () => doSomething())
 */
export const withToggleRef = <T>(
  boolRef: Ref<boolean> | WritableComputedRef<boolean>,
  fn: (...args: any) => T,
) => {
  const original = boolRef.value

  boolRef.value = !original
  try {
    const r = fn()
    boolRef.value = original
    return r
  }
  catch (e) {
    boolRef.value = original
    throw e
  }
}

/**
 * A function that toggles a boolean `ref` to its opposite value before executing the provided function,
 *
 * and toggles it back to its original value after the execution completes,
 *
 * regardless of whether the function succeeds or throws an error.
 *
 * @param boolRef The boolean ref to toggle
 * @param fn The function that return promise
 * @returns The return value of the provided function
 *
 * @example
 * const loading = ref(false)
 * const data = await withToggleRefAsync(loading, () => fetchData())
 */
export const withToggleRefAsync = <T>(
  boolRef: Ref<boolean> | WritableComputedRef<boolean>,
  fn: (...args: any) => Promise<T>,
) => {
  const original = boolRef.value
  boolRef.value = !original
  return fn().finally(() => {
    boolRef.value = original
  })
}
