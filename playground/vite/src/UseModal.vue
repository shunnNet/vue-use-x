<script setup lang="ts">
import { useModal } from '@vue-use-x/modal'
import { ElButton, ElMessage } from 'element-plus'
import { useRefModal } from './composables/useRefModal';
import { shallowRef } from 'vue';

type ModalData = { name: string, age?: number }

const modal = useModal<ModalData, string>({
  initData: { name: 'init data' },
  resetDataAfterClose: true,
})

const onOpen = async () => {
  const result = await modal.open({ name: 'Happy', age: 123 })

  ElMessage.success({
    message: `Modal closed with message: ${result}`,
  })
}

const patchWithFunction = () => {
  modal.patchData(() => {
    return {
      name: 'Tommy',
    }
  })
}
const dialogRef = shallowRef<HTMLDialogElement | null>(null)
const dialog = useRefModal(dialogRef, {
  initData: { message: 'I am dialog' },
  resetDataAfterClose: true,
})
const onClickOpenDialog = async () => {
  const result = await dialog.open({ message: 'I am dialog Data' })
  console.log('dialog closed with message:', result);
  console.log('dialog return:', dialogRef.value?.returnValue);
}
</script>
<template>
  <h2>useModal</h2>
  <ElButton @click="onOpen">
    Open
  </ElButton>
  <div>
    <h4>Data</h4>
    <pre v-text="modal.data" />
  </div>
  <div>
    <h4>Return Value</h4>
    <pre v-text="modal.returnValue" />
  </div>
  <div>
    <button type="button" @click="onClickOpenDialog">Open Dialog</button>
  </div>
  <dialog ref="dialogRef">
    {{ dialog.data.message }}
    <button @click="dialog.close('I am returnValue')">Close</button>
  </dialog>
  <ElDialog v-model="modal.visible">
    Hello
    <ElButton
      type="primary"
      @click="modal.close('I am returnValue').then(() => ElMessage.warning('Closed'))"
    >
      Close
    </ElButton>
    <ElButton
      type="success"
      @click="modal.patchData({ name: 'Tom' })"
    >
      Patch
    </ElButton>
    <ElButton
      type="success"
      @click="patchWithFunction"
    >
      Patch with function
    </ElButton>
  </ElDialog>
</template>
<style></style>
