import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import TodoList from "../components/TodoList";
import Spinner from "@material-ui/core/CircularProgress/CircularProgress";
import TodoForm from "../components/TodoForm";
// import { getTodo } from "../actions/index";
// import { connect } from "react-redux";
import "../styles/Home.css";

const Home = (props) => {
  const {
    todo: { loading, todos, error },
    deleteTodo,
    createTodo,
    markComplete,
  } = props;

  useEffect(() => {
    props.getTodo();
  }, []);

  return (
    <Grid container direction="column" justify="center" className="home">
      <Grid item sm className="home-upper">
        <TodoForm createTodo={createTodo} />
      </Grid>

      <Grid item sm className="home-lower">
        {loading ? (
          <Spinner className="homepage-spinner" />
        ) : !error ? (
          todos.length === 0 ? (
            <div>Empty list</div>
          ) : (
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              markComplete={markComplete}
            />
          )
        ) : (
          <div>Loading failed!</div>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
