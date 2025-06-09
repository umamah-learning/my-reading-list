<template>
  <Card class="mb-4">
    <CardContent>
      <h3>{{ book.title }}</h3>
      <p>by {{ book.author }}</p>
      <div class="flex items-center gap-4 mt-2">
        <Switch :checked="book.is_read" @update:checked="toggleStatus" />
        <Button variant="destructive" @click="deleteBook">Delete</Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
const props = defineProps(['book'])
const emit = defineEmits(['updated'])

const toggleStatus = async () => {
  await $fetch(`/api/books/${props.book.id}`, { method: 'PUT' })
  emit('updated')
}

const deleteBook = async () => {
  await $fetch(`/api/books/${props.book.id}`, { method: 'DELETE' })
  emit('updated')
}
</script>
