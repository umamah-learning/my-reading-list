<script setup>
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['deleted', 'statusUpdated'])

import { ref } from 'vue'

const isRead = ref(props.book.is_read === 1)

const toggleStatus = async () => {
  const newStatus = !isRead.value
  await $fetch(`/api/books/${props.book.id}`, {
    method: 'PUT',
    body: { is_read: newStatus }
  })
  isRead.value = newStatus
  emits('statusUpdated', props.book.id, newStatus)
}

const deleteBook = async () => {
  await $fetch(`/api/books/${props.book.id}`, { method: 'DELETE' })
  emits('deleted', props.book.id)
}
</script>

<template>
  <n-card class="mb-4">
    <h3>{{ book.title }}</h3>
    <p>Author: {{ book.author }}</p>
    <p>Status: <strong>{{ isRead ? 'Read' : 'Unread' }}</strong></p>
    <n-space>
      <n-switch v-model:value="isRead" @update:value="toggleStatus" />
      <n-button type="error" @click="deleteBook">Delete</n-button>
    </n-space>
  </n-card>
</template>
