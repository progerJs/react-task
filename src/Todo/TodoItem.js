import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../context'
import useInputValue from '../hooks/useInputValue'

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '.5rem',
    cursor: 'grab'
  },
  input: {
    marginRight: '1rem'
  }
}

function TodoItem({
  todo, 
  index, 
  onChange, 
  dragStartHandler,
  dragEndHandler,
  dragLeaveHandler,
  dragOverHandler,
  dropHandler 
}) {
  const editText = useInputValue('')
  const { removeTodo, editTodo } = useContext(Context)
  const classes = []

  if (todo.completed) {
    classes.push('done')
  }

  const setEditedName = () => {
    editTodo(editText.bind.value, todo.id)
    editText.clear()
  }

  const handleUpdatedDone = (event) => { 
    if (event.key === "Enter") {
      editTodo(editText.bind.value, todo.id)
      editText.clear()
    }
  }

  return (
    <li 
      style={styles.li} 
      onDragStart={e => dragStartHandler(e, todo)}
      onDragLeave={e => dragLeaveHandler(e)}
      onDragEnd={e => dragEndHandler(e)}
      onDragOver={e => dragOverHandler(e)}
      onDrop={e => dropHandler(e, todo)}
      draggable={true}
    >
      <span className={classes.join(' ')}>
        <input
          type='checkbox'
          checked={todo.completed}
          style={styles.input}
          onChange={() => onChange(todo.id)}
        />
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.name}
      </span>
      <input type='text' value={editText.bind.value} onChange={e => editText.bind.onChange(e)} onKeyDown={handleUpdatedDone} />
      <button onClick={setEditedName}>Edit</button>
      <button className='rm' onClick={removeTodo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

export default TodoItem
