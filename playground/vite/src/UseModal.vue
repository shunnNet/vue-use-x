<script setup lang="ts">
import { useModal } from '@vue-use-x/modal'
import { ElButton, ElMessage } from 'element-plus'

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

const setReturn = () => {
  modal.setReturnValue('I am return value set by setReturnValue')
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
    <ElButton
      type="success"
      @click="setReturn"
    >
    setReturn
    </ElButton>
  </ElDialog>
</template>
<style></style>
