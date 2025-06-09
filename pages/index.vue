<!-- <template>
  <div>
    <h1>My Books</h1>
    <NuxtLink to="/add-book">
      <Button class="mb-4">Add New Book</Button>
    </NuxtLink>
    <BookCard v-for="book in books" :key="book.id" :book="book" @updated="fetchBooks" />
  </div>
</template>

<script setup>
const books = ref([])
const fetchBooks = async () => {
  books.value = await $fetch('/api/books')
}
onMounted(fetchBooks)
</script> -->


<script setup>
import { ref } from 'vue'

const books = ref([])

const fetchBooks = async () => {
  const { data } = await useFetch('/api/books')
  books.value = data.value || []
}

fetchBooks()

// Toggle status for a book by id
const toggleStatus = async (book) => {
  const newStatus = book.is_read === 1 ? 0 : 1

  await $fetch(`/api/books/${book.id}`, {
    method: 'PUT',
    body: { is_read: newStatus }
  })

  // Update local state immediately
  book.is_read = newStatus
}

const deleteBook = async (book) => {
  await $fetch(`/api/books/${book.id}`, { method: 'DELETE' })
  fetchBooks()
}
</script>

<template>
  <div>
    <div style="display:flex;justify-content: space-between;align-items: center;">
    <h1>My Books</h1>
    <NuxtLink to="/add-book">
      <UButton icon="i-lucide-plus" class="mb-4">Add New Book</UButton>
    </NuxtLink>
    </div>
    <ul style="list-style-type: square;padding-left: 1rem;">
      <li v-for="book in books" :key="book.id" style="padding: 0.2rem;margin-left: 0.7rem;display: flex;align-items: center;">
        <UIcon class="mr-3 size-4" name="i-lucide-book" />
        <strong>{{ book.title }}</strong> &nbsp;by {{ book.author }}
        <label style="margin-left: 1em;">
          <input 
            class="accent-green-600"
            type="checkbox" 
            :checked="book.is_read === 1" 
            @change="toggleStatus(book)" 
          />
          {{ book.is_read === 1 ? 'Read' : 'Unread' }}
        </label>
        <UButton icon="i-lucide-x" size="xs" color="red" variant="soft" @click="deleteBook(book)" style="margin-left: 1em;"/>
        <!-- <Button style="margin-left: 1em;" variant="destructive" @click="deleteBook(book)">Delete</Button> -->
      </li>
    </ul>
  </div>
</template>
