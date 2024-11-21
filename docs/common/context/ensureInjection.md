# `ensureInjection`
`ensureInjection` is useful when the key that needs to be injected must be provided.

## Usage
The usage is very similar to Vue's `inject`.

By default, Vue's inject triggers a warning if the key is missing and no default value is provided. However, `ensureInjection` will throw an error instead.

```vue
<script setup lang="ts">
// Parent.vue

provide("exist-key", { name: "Hello" })

</script>
```

```ts{3}
import { ensureInjection } from "@vue-use-x/common"

const { name } = ensureInjection("exist-key")

// almost equal to
const { name } = inject("exist-key") 

// Throw an Error if it is not provided
ensureInjection("not-exist-key") 
```

You can optionally pass an error message as second parameter when the key is not provided.

```ts{5}
import { ensureInjection } from "@vue-use-x/common"

ensureInjection(
  "not-exist-key", 
  "You should call `provide` in the parent component."
) 
// Error: You should call `provide` in the parent component.
```

## Type

```ts
const ensureInjection: <T = unknown>(
  injectKey: string | InjectionKey<T>,
  errorMsg: string
) => T
```
