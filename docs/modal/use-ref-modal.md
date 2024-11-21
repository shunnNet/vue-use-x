# useRefModal
Some modal library open modal like `$refs.modal.open` or `$refs.modal.close` methods that exposed by modal component. Similarly, native HTML `<dialog>` work in the same way.

In this case, you can use `useRefModal`. 

It essentially wraps `useModal`, so it is recommended that you first understand how to use [`useModal`](./use-modal.md).

## Usage
First, you need to use `createRefModal` to define the actions to be executed when opening and closing the modal.

At the same time, you can access the data passed when using useModal `.open()` and the `returnValue` from `.close()`.

```ts
export const useRefModal = createRefModal<HTMLDialogElement | null>({
  open(modal, data) {
    modal?.showModal()
  },
  close(modal, returnValue) {
    modal?.close(returnValue)
  },
})
```

Next, you will get `useRefModal`. The usage of `useRefModal` is the same as `useModal`, with the only difference being the first parameter. You need to pass in the `modal` or `modalRef`. For example:

```vue{2-3,12}
<script setup lang="ts">
const dialogRef = shallowRef<HTMLDialogElement | null>(null)
const modal = useRefModal(dialogRef, {
  // ... useModal options
})
</script>

<template>
  <button type="button" @click="modal.open({ message: 'I am Dialog' })">
    Open Dialog
  </button>
  <dialog ref="dialogRef">
    {{ modal.data.message }}
    <button @click="modal.close('I am returnValue')">Close</button>
  </dialog>
</template>

```
