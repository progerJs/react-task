import React, {useState} from "react";
import Todo from "../components/Todo";
import EditTodo from "../components/EditTodo";
import { Grid } from "@material-ui/core";

const List = (props) => {
    const [currentTodo, setCurrentTodo] = useState(null)
    
    const dragStartHandler = (e, todo) => {
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
      props.setList(props.list.map(t => {
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
      if(a.id > b.id) {
        return 1
      }else {
        return -1
      }
    }

    const renderTodo = (todo) => {
        if (!props.list.length) {
          return null;
        }
        if (todo.status === "active") {
            return (
            <Todo
                key={todo.id}
                index={todo.id}
                todo={todo}
                deleteTodo={props.deleteTodo.bind(null, todo.id)}
                updateTodo={props.updateTodo}
                dragStartHandler={dragStartHandler}
                dragEndHandler={dragEndHandler}
                dragLeaveHandler={dragLeaveHandler}
                dragOverHandler={dragOverHandler}
                dropHandler={dropHandler}
            />
            );
        } else if (todo.status === "editing") {
            return (
            <EditTodo
                key={todo.id}
                index={todo.id}
                todo={todo}
                saveTodo={props.saveTodo}
            />
            );
        }
    };
    
    return (
        <Grid container>
            {props.list.sort(sortTodos).map((item) => {
              return renderTodo(item)
            }
              )}
        </Grid>
    );
}

export default List;
