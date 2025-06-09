import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const getDB = async () => {
  return open({
    filename: './data/reading-list.db',
    driver: sqlite3.Database
  })
}
