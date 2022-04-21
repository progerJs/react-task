import React, { Fragment, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import List from "./components/List";
import { Paper, Grid } from "@material-ui/core";

const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 500
  }
};

const App = () => {
  const [list, setList] = useState([]);
  const re = /^[A-Za-z0-9\b]+$/;
  const addToList = (e, name) => {
    e.preventDefault();
    if (name === '' || re.test(name)) { 
      const li = [ ...list, {
        id: Date.now(),
        name,
        status: "active"
      } ];
      
      setList(li)
    }else {
      alert('Only Latin and numbers are allowed');
    }
    
  };

  const deleteTodo = id => {
    setList(list.filter(todo => todo.id !== id));
  };

  const updateTodo = (id) => {
    setList(list.map(todo => {
      if (todo.id === id) {
        todo.status = "editing";
      }
      return todo;
    }))
  };

  const saveTodo = (e, id, name) => {
    e.preventDefault();
    if (name === '' || re.test(name)) { 
      setList(list.map(todo => {
        if(todo.id === id) {
          todo.name = name;
          todo.status = 'active';
        }
        return todo;
      }))
    }else {
      alert('Only Latin and numbers are allowed');
    }
  };
  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper style={styles.Paper}>
            <AddTodoForm addToList={addToList} />
          </Paper>
        </Grid>
        <Grid item xs={12} style={styles.Paper}>
          <List
            deleteTodo={deleteTodo}
            list={list}
            updateTodo={updateTodo}
            saveTodo={saveTodo}
            setList={setList}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default App;
