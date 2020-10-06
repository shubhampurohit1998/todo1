import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import TodoList from "../components/TodoList";
import Spinner from "@material-ui/core/CircularProgress/CircularProgress";
import TodoForm from "../components/TodoForm";
import "../styles/Home.css";
class Home extends React.Component {
  componentDidMount() {
    this.props.getTodo();
  }

  render() {
    const {
      todo: { loading, todos, error },
      deleteTodo,
      createTodo,
      markComplete,
    } = this.props;
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
            <div>Something went wrong!</div>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default Home;
