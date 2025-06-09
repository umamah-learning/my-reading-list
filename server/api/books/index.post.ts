import { getDB } from '~/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = await getDB()
  const result = await db.run(
    'INSERT INTO books (title, author) VALUES (?, ?)',
    [body.title, body.author]
  )
  return { id: result.lastID }
})
