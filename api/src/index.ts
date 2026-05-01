import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prisma } from './lib/prisma'

const app = new Hono()

app.get('/todos', async (c) => {
  const todos = await prisma.todo.findMany()
  return c.json(todos)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
