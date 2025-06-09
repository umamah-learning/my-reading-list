import { getDB } from '~/utils/db'

export default defineEventHandler(async () => {
  const db = await getDB()
  const books = await db.all('SELECT * FROM books')
  return books
})
