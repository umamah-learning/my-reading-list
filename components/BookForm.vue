<script setup>
import { ref } from 'vue'
const router = useRouter()

// const title = ref('')
// const author = ref('')
const state = reactive({ title: '', author:'' })

const submitForm = async () => {
  if (!state.title.trim() || !state.author.trim()) {
    alert('Please fill in both title and author.')
    return
  }

  await $fetch('/api/books', {
    method: 'POST',
    body: { title: state.title, author: state.author }
  })

  router.push('/')
}
</script>

<template>
  <!-- <form @submit.prevent="submitForm" style="display: flex;flex-direction: column;align-items: flex-start;">
    <input v-model="title" placeholder="Book Title" required style="margin-bottom: 1rem;width: 50%;"/>
    <input v-model="author" placeholder="Author" required style="margin-bottom: 1rem;width: 50%;"/>
    <UButton type="submit" style="background: #ff9999;">Add Book</UButton>
  </form> -->
  <UForm :state="state" :validate="validate" @submit="submitForm" style="width: 50%;">
    <UFormField name="title" label="Book Title">
      <UInput v-model="state.title" />
    </UFormField>
    <UFormField name="author" label="Author">
      <UInput v-model="state.author" class="mt-2"/>
    </UFormField>
    <UButton type="submit" class="mt-2" loading-auto>
      Add
    </UButton>
  </UForm>
</template>

