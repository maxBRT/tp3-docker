import { useEffect, useState } from 'react'
import './App.css'


import axios, { type AxiosResponse } from "axios";
import * as React from "react";


type Todo = {
  id: string
  text: string
  done: boolean
}

function App() {
  const [task, setTask] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response: AxiosResponse<Todo[]> = await axios.get("/api/todos")
        const todos = response.data
        console.log(todos)
        setTodos(todos)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []);

  const createTodo = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!task.trim()) return
    try {
      const response: AxiosResponse<Todo> = await axios.post("/api/todos", { text: task })
      setTodos([...todos, response.data])
      setTask("")
    } catch (e) {
      setError(e)
    }
  }

  const toggleTodo = async (id: string, done: boolean) => {
    try {
      await axios.put(`/api/todos/${id}`, { done: !done })
      setTodos(todos.map(t => t.id === id ? { ...t, done: !done } : t))
    } catch (e) {
      setError(e)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`/api/todos/${id}`)
      setTodos(todos.filter(t => t.id !== id))
    } catch (e) {
      setError(e)
    }
  }


  return (
    <>
      {error && (<div className="error-message">Error: {error.message || JSON.stringify(error)}</div>)}
      {loading && (<div>Loading...</div>)}
      <section id="center">
        <div>
          <h1>Todo List</h1>
        </div>
        <form onSubmit={createTodo}>
          <input className="task-input" type="text" onChange={(e) => setTask(e.target.value)} value={task} />
          <button
            type="submit"
            className="counter"
          >
            +
          </button>
        </form>
        <ul className="todo-list">
          {todos.map((t: Todo) => (
            <li key={t.id} className={`todo-item ${t.done ? 'done' : ''}`}>
              <div className="todo-content">
                <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id, t.done)} />
                <p>{t.text}</p>
              </div>
              <button className="delete-btn" onClick={() => deleteTodo(t.id)}>×</button>
            </li>
          ))}
        </ul>
      </section>

    </>
  )
}

export default App
