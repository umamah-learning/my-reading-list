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
  emit('updated')
}
</script>

<template>
  <div>
    <div style="display:flex;justify-content: space-between;align-items: center;">
    <h1>My Books</h1>
    <NuxtLink to="/add-book">
      <Button class="mb-4" style="background: #ff9999;">Add New Book</Button>
    </NuxtLink>
    </div>
    <ul style="list-style-type: square;padding-left: 1rem;">
      <li v-for="book in books" :key="book.id" style="padding: 0.2rem;margin-left: 0.7rem;">
        <strong>{{ book.title }}</strong> by {{ book.author }}
        <label style="margin-left: 1em;">
          <input 
            type="checkbox" 
            :checked="book.is_read === 1" 
            @change="toggleStatus(book)" 
          />
          {{ book.is_read === 1 ? 'Read' : 'Unread' }}
        </label>
        <Button style="margin-left: 1em;" variant="destructive" @click="deleteBook(book)">Delete</Button>
      </li>
    </ul>
  </div>
</template>
