import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import TodoList from "../components/TodoList";
import Spinner from "@material-ui/core/CircularProgress/CircularProgress";
import TodoForm from "../components/TodoForm";
class Home extends React.Component {
  state = {
    todo: "",
  };

  handleChange = (event) => {
    this.setState({
      todo: event.target.value,
    });
  };

  componentDidMount() {
    if (this.props.isAuthenticated) this.props.getTodo();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.isAuthenticated !== this.props.isAuthenticated ||
  //     nextProps.todo !== this.props.todo
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.todo !== this.props.todo) {
  //     console.log("Componet is updating");
  //     this.props.getTodo();
  //   }
  // }

  render() {
    const {
      todo: { loading, todos, error },
      deleteTodo,
      createTodo,
      markComplete,
    } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        // alignItems="baseline"
        className="home"
      >
        <Grid container item sm direction="column" alignItems="center">
          <TodoForm createTodo={createTodo} />
        </Grid>

        <Grid item sm>
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
            <div>You are not logged in or connection is slow</div>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default Home;
