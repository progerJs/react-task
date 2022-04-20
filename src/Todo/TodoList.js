import React, {useState} from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const styles = {
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
}

function TodoList(props) {
  const [currentTodo, setCurrentTodo] = useState(null)

  const dragStartHandler = (e, todo) => {
    console.log('drag', todo);
    setCurrentTodo(todo)
  }
  const dragEndHandler = e => {
    // e.target.style.background = 'white'
  }
  const dragLeaveHandler = e => {
    e.target.style.background = 'white'
  }
  const dragOverHandler = e => {
    e.preventDefault()
    e.target.style.background = 'lightgray'
  }
  const dropHandler = (e, todo) => {
    e.preventDefault()
    props.setTodos(props.todos.map(t => {
      if(t.id === todo.id) {
        return {...t, name: currentTodo.name}
      }
      if (t.id === currentTodo.id) {
        return {...t, name: todo.name}
      }
      return t
    }))
    e.target.style.background = 'white'
  }

  const sortTodos = (a, b) => {
    console.log(a, 'a');
    console.log(b, 'b');
    if(a.id > b.id) {
      return 1
    }else {
      return -1
    }
  }
  return (
    <ul style={styles.ul}>
      {props.todos.sort(sortTodos).map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            index={index}
            onChange={props.onToggle}
            dragStartHandler={dragStartHandler}
            dragEndHandler={dragEndHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragOverHandler={dragOverHandler}
            dropHandler={dropHandler}
          />
        )
      })}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired
}

export default TodoList
