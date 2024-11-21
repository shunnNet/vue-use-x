<script setup lang="ts">
import { ref } from 'vue';
import UseModal from './UseModal.vue'

const visible = ref(false)
</script>

<template>
  <h1>Vue use modal </h1>
  <button @click="visible = !visible">toggle</button>
  <UseModal />
</template>

<style></style>
