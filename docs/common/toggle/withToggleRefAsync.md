# `withToggleRefAsync`
Run an (async/sync) function while toggling a boolean ref object. It can be used in scenarios such as toggling a loading state.

## Usage
During development, it's common to encounter situations where you need to toggle a loading state while calling an API. The code often looks something like this:

```ts{4,9-11}
const loading = ref(false)

const getSomeData = async () => {
  loading.value = true
  try {
    await fetch("...")
  } catch (e) {
    // handle error
  } finally {
    loading.value = false
  }
}
```

`withToggleRefAsync` can simplify the above implementation by automatically toggling the loading state, even in case of an error, while also forwarding the return value and error of the executed function.

```ts{4}
import { withToggleRefAsync } from "@vue-use-x/common"

const loading = ref(false)

const getSomeData = async () => {
  try {
    const res = await withToggleRefAsync(loading, () => fetch("..."))
  } catch (e) {
    // handle error
  }
}
```

Although it may not be used frequently, a synchronous version, `withToggleRef`, is also available.

```ts
import { withToggleRef } from "@vue-use-x/common"

const handling = ref(false)

const doSomething = () => {
  withToggleRef(handling, () => {
    // synchronous operation
  })
}
```

## Type

```ts
const withToggleRef: <T>(
  boolRef: Ref<boolean> | WritableComputedRef<boolean>, 
  fn: (...args: any) => T
) => T

const withToggleRefAsync: <T>(
  boolRef: Ref<boolean> | WritableComputedRef<boolean>, 
  fn: (...args: any) => Promise<T>
) => Promise<T>
```
