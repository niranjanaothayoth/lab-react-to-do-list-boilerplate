
import { useEffect, useState } from 'react'
import './App.css'
import { TodoForm, TodoItem, ThemeBtn } from './components/index.js'
import { TodoProvider, ThemeProvider } from './contexts/index.js'
import todoIcon from "/todoIcon.png"
function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => (
      prev.map((prevTodo) => (
        prevTodo.id === id ? todo : prevTodo
      ))
    ))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleCompleted = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = () => {
    setThemeMode("light")
  }
  const darkTheme = () => {
    setThemeMode("dark")
  }

  //actual change in theme using JS
  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])
  


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleted }}>

      <div className="bg-[#ffffff] dark:bg-[#202124] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto  rounded-lg px-4 py-3  text-[#212121] dark:text-[#fff]">
          <h1 className="text-3xl font-bold text-center mb-8 mt-2 flex items-center justify-center">Manage Your Todos <img src={todoIcon} alt="Todo List Icon" className='w-[3rem] ml-2' /></h1>
          <div className="mb-8">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
          <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
            <div className='fixed right-4 bottom-4 flex p-2'>
              <ThemeBtn />
            </div>
          </ThemeProvider>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
