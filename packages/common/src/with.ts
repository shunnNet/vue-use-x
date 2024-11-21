import { Ref } from 'vue'

export const withToggleRefAsync = <T>(
  boolRef: Ref<boolean>,
  fn: () => Promise<T>,
) => {
  boolRef.value = true
  return fn().finally(() => {
    boolRef.value = false
  })
}
