import React, { useRef, useState } from "react";
import { Delete, Build } from "@material-ui/icons";
import { Grid, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import {InputLabel, Input, TextField} from '@material-ui/core'

const styles = {
  Icon: {
    marginLeft: "auto"
  },
  Paper: {
    margin: "auto",
    width: 500,
  },
  todoPaper: {
    margin: 'auto',
    width: 200,
    marginTop: 50,
  },
  todoContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  title: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  addBtn: {
    background: '#1976d2',
    color: '#fff', 
    margin: 5
  }, 
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: 50,
  },
  titleTask: {
    width: '100%',
  },
  descriptionTask: {
    width: '100%',
  }
};

const Todo = (props) => {
  const [fade, setFade] = useState(false)
  const gridRef = useRef();
  const [titleTask, setTitleTask] = useState('')
  const [descriptionTask, setDescriptionTask] = useState('')
  const [todoContent, setTodoContent] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const addTask = () => {
    const todo = {
      id: Date.now(),
      title: titleTask,
      description: descriptionTask,
    }
    setTodoContent([...todoContent, todo]);
    setTitleTask('');
    setDescriptionTask('');
    setOpenModal(false);
  }
console.log(todoContent);
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
        <Paper style={styles.Paper}>
          <div elevation={2} style={styles.title} >
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
          </div>
          <Button 
            variant="contained" 
            style={styles.addBtn}
            onClick={handleOpenModal}
          >
            Add
          </Button>

          <div>
            {todoContent.map(todo => 
              <Paper style={styles.todoPaper}>
                <div style={styles.todoContent}>
                  {todo.title}
                </div>
                <div style={styles.todoContent}>
                  {todo.description}
                </div>
              </Paper>  
            )}
          </div>
        </Paper>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={styles.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Write title and description
          </Typography>
          <FormControl style={styles.titleTask}>
            <InputLabel htmlFor="title-task">Title</InputLabel>
            <Input id="title-task" value={titleTask} onChange={e => setTitleTask(e.target.value)} />
          </FormControl>
          <br /><br />
          <FormControl style={styles.descriptionTask}>
            <TextField id="description-task" label="Description" value={descriptionTask} onChange={e => setDescriptionTask(e.target.value)}/>
          </FormControl>
          <Button 
            variant="contained" 
            style={styles.addBtn}
            onClick={addTask}
          >
            Save
          </Button>
        </Box>
      </Modal>
         
      </Grid>
  );
}

export default Todo;
