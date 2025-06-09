import { getDB } from '~/utils/db'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const db = await getDB()
  const book = await db.get('SELECT is_read FROM books WHERE id = ?', [id])
  const newStatus = book.is_read ? 0 : 1
  await db.run('UPDATE books SET is_read = ? WHERE id = ?', [newStatus, id])
  return { success: true }
})
