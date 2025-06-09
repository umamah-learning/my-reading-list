<script setup>
import { ref } from 'vue'
const router = useRouter()

const title = ref('')
const author = ref('')

const submitForm = async () => {
  if (!title.value.trim() || !author.value.trim()) {
    alert('Please fill in both title and author.')
    return
  }

  await $fetch('/api/books', {
    method: 'POST',
    body: { title: title.value, author: author.value }
  })

  // After success, clear form or redirect
  title.value = ''
  author.value = ''
  router.push('/')
}
</script>

<template>
  <form @submit.prevent="submitForm" style="display: flex;flex-direction: column;align-items: flex-start;">
    <input v-model="title" placeholder="Book Title" required style="margin-bottom: 1rem;width: 50%;"/>
    <input v-model="author" placeholder="Author" required style="margin-bottom: 1rem;width: 50%;"/>
    <button type="submit" style="background: #ff9999;">Add Book</button>
  </form>
</template>

