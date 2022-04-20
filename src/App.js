import React from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'

const AddTodo = React.lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
      }, 2000)
    })
)

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading] = React.useState(false)

  function toggleTodo(id) {
      setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(name) {
    setTodos(
      todos.concat([
        {
          name,
          id: Date.now(),
          completed: false
        }
      ])
    )
  }

  function editTodo(updatedName, id) {
    console.log();
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.name = updatedName;
      }
      return todo;
    }))
  }

  return (
    <Context.Provider value={{ removeTodo, editTodo }}>
      <div className='wrapper'>
        <h1>React task</h1>
        <Modal />

        <React.Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} setTodos={setTodos} onToggle={toggleTodo}  />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  )
}

export default App
