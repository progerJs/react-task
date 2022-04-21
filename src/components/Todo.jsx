import React, { useRef, useState } from "react";
import { Delete, Build } from "@material-ui/icons";
import { Grid, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  Icon: {
    marginLeft: "auto"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    width: 500,
  }
};

const Todo = (props) => {
  const [fade, setFade] = useState(false)
  const gridRef = useRef();

  const gridClass = fade ? "fade-out" : "";

  const deleteTodo = () => {
    const f = true;
    setFade(f);

    let promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(true);
      }, 500);
    });

    promise.then(() => props.deleteTodo(props.index));
  };

  return (
    <Grid
        xs={12}
        className={`${gridClass}`}
        item
        key={props.index}
        ref={gridRef}
        onDragStart={e => props.dragStartHandler(e, props.todo)}
        onDragLeave={e => props.dragLeaveHandler(e)}
        onDragEnd={e => props.dragEndHandler(e)}
        onDragOver={e => props.dragOverHandler(e)}
        onDrop={e => props.dropHandler(e, props.todo)}
        draggable={true}
      >
        <Paper elevation={2} style={styles.Paper}>
          <span style={styles.Todo}>{props.todo.name}</span>
          <IconButton
            color="primary"
            aria-label="Edit"
            style={styles.Icon}
            onClick={() => props.updateTodo(props.index)}
          >
            <Build fontSize="small" />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={deleteTodo}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Paper>
      </Grid>
  );
}

export default Todo;
