import { getDB } from '~/utils/db'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const db = await getDB()
  await db.run('DELETE FROM books WHERE id = ?', [id])
  return { success: true }
})
