# `useModal`
The `useModal` composable function is designed to manage the state of modals in Vue components. It provides a reactive way to control the visibility, data, and return values of modals, making it easier to handle complex modal interactions.

See [Installation and Why](./index).

## Usage Example
```vue
<script setup lang="ts">
import { useModal } from '@vue-use-x/modal';

const modalA = useModal()
</script>
<template>
  <Modal v-model="modalA.visible" @success="modalA.close()" />
  <button @click="modalA.open()">Open A</button>
</template>
```

::: info
`useModal` return a Vue `reactive` object, which means you **can not destruct it**, or it will lost it reactivity.
:::

## Handling data
You can pass data by `modal.open(data)`, the data will be available on `modal.data` and you can pass it to the modal. 

The `data` should be an object like `{ a: 1, b: 2}`.

```vue{11}
<script setup lang="ts">
import { useModal } from '@vue-use-x/modal';

const modalA = useModal()
</script>
<template>
  <Modal 
    v-model="modalA.visible" 
    :message="modalA.data.message" 
  />
  <button @click="modalA.open({ message: 'Hello World' })">Open A</button>
</template>
```

If your need to provide some data when modal is not opened, you can use `initData` option. The data passed into `.open()` will be merged with `initData` when `modal.open` is called.

```vue{5,11-12,15-18}
<script setup lang="ts">
import { useModal } from '@vue-use-x/modal';

const modalA = useModal({
  initData: { message: "", name: "John Doe" }
})
</script>
<template>
  <Modal 
    v-model="modalA.visible" 
    :message="modalA.data.message" 
    :name="modalA.data.name" 
  />
  <button @click="modalA.open({ message: 'Hello World' })">Open A</button>
  <!-- 
   The modal will get data when .open():
    `{ message: "Hello World", name: "John Doe" }` 
   -->
</template>
```

If you want modify data after modal opened, use `.patchData()`, the data will be merged into current data.

```vue{7-13,20}
<script setup lang="ts">
import { useModal } from '@vue-use-x/modal';

const modalA = useModal({
  initData: { message: "", name: "John Doe" }
})
const onUpdate = (newData) => {
  // Option 1: directly pass data into it
  modal.patchData(newData)

  // Option 2: pass a function which return a patch, the function accept currentData as first param.
  modal.patchData((currentData) => newData)
}
</script>
<template>
  <Modal 
    v-model="modalA.visible" 
    :message="modalA.data.message" 
    :name="modalA.data.name" 
    @update="onUpdate"
  />
  <button @click="modalA.open({ message: 'Hello World' })">Open A</button>
</template>
```

When modal is closed, data will be reset to `initData` (`{}` by default). If you don't want to reset it, set `resetDataAfterClose: true`

```ts{3}
const modal = useModal({
  initData: { message: "", name: "John Doe" }
  resetDataAfterClose: false
})
```

To reset data to `initData` any time, call `modal.resetData()`

```ts
modal.resetData() // reset to `initData`
```

## Get returnValue
When call `modal.close()`, you can optionally pass `returnValue` to it. 

You can get it from promise returned from `.open()`, or `modal.returnValue`.

Please note that `returnValue` will be set every time modal closed. If you don't explicitly call `.close(returnValue)`, it will be `undefined`.

```vue{7-8,16,20}
<script setup lang="ts">
import { useModal } from '@vue-use-x/modal';

const modal = useModal()

const openModal = async () => {
  const value = await modal.open({ message: "some msg" })
  console.log(value) // 'success message'
}
</script>
<template>
  <Modal 
    v-model="modal.visible" 
    :message="modal.data.message" 
  >
    <Form @success="modal.close('success message')" />
  </Modal>
  <button @click="openModalA">Open A</button>

  <p>{{ modal.returnValue }}</p> 
</template>
```

:::warning
Modal may not be closed by `close()`, for example, set `modal.visible = false` will also close the modal.

In the example above, when clicking on the overlay, `Modal` component may emit `close` event, then changing `visible` via `v-model`. In this case, `returnValue` will be `undefined`. Therefore, if you listen to the modal's close event to call `.close(returnValue)`, you may not get the correct `returnValue` due to timing issues. 

It is recommended to manually emit an event (e.g., `success`) and then listen to this event to close the modal.
:::

## Perform action after `.close()`
You may what to perform additional actions after close modal. `modal.close` provide a `.then()` function to help this situation.

```vue{2-3}
<Form @success="
  modal.close('success message')
       .then((returnValue) => fetchData(returnValue))"
></Form>
```

:::warning
`.then()` is just a helper function, `modal.close()` does not return a `Promise`.
:::

## Callbacks: onOpen, onClose
`useModal` provide 2 hooks: `onOpen`, `onClose`, they will be called when `modal.visible` is set to `true` / `false`

```ts
const modalA = useModal({ 
  onOpen(data) {
    // do something
  },
  onClose(returnValue) {
    // do something
  },
})
```

## Important note: visible
Please note that, `visible` **does not means the real modal visibility**, same as the words like `.open()`,`onOpen`,`onClose`. 

`useModal` is just a composable, it did not bind to the modal component.
