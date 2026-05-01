import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prisma } from '@/lib/prisma'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(cors({
  origin: '*'
}))

app.get('/todos', async (c) => {
  const todos = await prisma.todo.findMany()
  return c.json(todos)
})

app.get('/todos/:id', async (c) => {
  const id = c.req.param('id')
  if (!id) return c.status(400)
  const todos = await prisma.todo.findFirst({where: { id }})
  return c.json(todos)
})

app.post('/todos', async (c) => {
  const { text } = await c.req.json()
  const todo = await prisma.todo.create({data: {text}})
  return c.json(todo)
})

app.put('/todos/:id', async (c) => {
  const id = c.req.param('id')
  if (!id) return c.status(400)
  const { text, done } = await c.req.json()
  const todo = await prisma.todo.updateMany({
    where: {id},
    data: {
      text,
      done
    }
  })
  return c.json(todo)
})

app.delete('/todos/:id', async (c) => {
  const id = c.req.param('id')
  if (!id) return c.status(400)
  const _deleted = await prisma.todo.delete({where: {id}})
  return c.body(null, 204)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
