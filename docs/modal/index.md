# `@vue-use-x/modal`
Provides a composable to toggle modals and pass data. It can be used alongside UI library modals/dialogs. When you need to manage the modal visibility state and pass data multiple times, `useModal` can fully showcase its value.

## Installation
```sh
npm i @vue-use-x/modal
```

## Functionalities
- [useModal](./use-modal): Targeting modal that open by props like `v-modal`
- [useRefModal](./use-ref-modal): Targeting modal that open by component exposed method.

## Why
When managing modal visibility in Vue components, we often find ourselves repeating the same patterns. This includes setting up reactive state for visibility, handling data passed to the modal, and managing callbacks for when the modal opens and closes.

```vue
<script setup lang="ts">
const modalVisibleA = ref(false)
const dataA = ref({ message: "" })
const openModalA = () => {
  modalVisibleA.value = true
  dataA.message.value = "hello world"
}
</script>
<template>
  <Modal v-model="modalVisibleA" :message="dataA.message" />
  <button @click="openModalA">Open A</button>
</template>
```

If you only need to set it up once, it's probably fine, but if you need to set it up multiple times, it can become tedious and painful.

```vue{8-12,19-20}
<script setup lang="ts">
const modalVisibleA = ref(false)
const dataA = ref({ message: "" })
const openModalA = () => {
  modalVisibleA.value = true
  dataA.message.value = "hello world"
}
const modalVisibleB = ref(false)
const dataB = ref({ message: "" })
const openModalB = () => {
  modalVisibleB.value = true
  dataB.message.value = "hello world"
}
</script>
<template>
  <Modal v-model="modalVisibleA" :message="dataA.message" />
  <button @click="openModalA">Open A</button>
  
  <Modal v-model="modalVisibleB" :message="dataB.message" />
  <button @click="openModalB">Open B</button>
</template>
```

By using [`useModal`](./use-modal), we can encapsulate these common patterns into a reusable composable function, making our code cleaner and more maintainable.

```vue{4-6,9-10,13-14,16-17}
<script setup lang="ts">
import { useModal } from '@vue-use-x/modal';

const modalA = useModal({ 
  initData: { message: "" }
})

const modalB = useModal({ 
  initData: { message: "" }
})
</script>
<template>
  <Modal v-model="modalA.visible" :message="modalA.data.message" />
  <button @click="modalA.open({ message: 'hello world' })">Open A</button>
  
  <Modal v-model="modalB.visible" :message="modalB.data.message" />
  <button @click="modalB.open({ message: 'hello world' })">Open B</button>
</template>
```
