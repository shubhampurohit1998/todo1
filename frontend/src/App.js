import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Container from "@material-ui/core/Container/Container";
import Spinner from "@material-ui/core/CircularProgress/CircularProgress";
import Logo from "./assets/bestpeers.png";
import Typography from "@material-ui/core/Typography/Typography";
import { connect } from "react-redux";
import {
  login,
  authCheckState,
  logout,
  getTodo,
  createTodo,
  deleteTodo,
  markComplete,
  getSelectedTodo,
} from "./actions/index";
import { useHistory } from "react-router-dom";
import ProtectedRoute from "./protected.route/Protected";
import TodoItem from "./components/TodoItem";
import AppBar from "./components/AppBar";
function App(props) {
  const {
    auth: { token, loading },
    login,
    logout,
    tryAutoLogin,
    getTodo,
    todo,
    createTodo,
    deleteTodo,
    isAuthenticated,
    markComplete,
    getSelectedTodo,
  } = props;

  useEffect(() => {
    tryAutoLogin();
    getTodo();
  }, []);

  const history = useHistory();

  return (
    <div className="App">
      {loading ? (
        <Spinner />
      ) : (
        <Router>
          <AppBar logout={logout} isAuthenticated={isAuthenticated} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (isAuthenticated) {
                  return (
                    <Home
                      getTodo={getTodo}
                      todo={todo}
                      history={history}
                      isAuthenticated={isAuthenticated}
                      createTodo={createTodo}
                      deleteTodo={deleteTodo}
                      markComplete={markComplete}
                    />
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />
            {/* <ProtectedRoute path="/" component={Home} /> */}
            <Route
              path="/login"
              render={() => {
                if (!isAuthenticated) {
                  return <Login login={login} history={history} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route
              path="/signup"
              render={() => {
                return <Signup history={history} />;
              }}
            />
            <Route
              path="/todo/:id"
              render={() => {
                return (
                  <TodoItem
                    getSelectedTodo={getSelectedTodo}
                    todo={todo}
                    markComplete={markComplete}
                  />
                );
              }}
            />
          </Switch>
        </Router>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    todo: state.todo,
    isAuthenticated: state.auth.token ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (values) => {
      dispatch(login(values));
    },
    tryAutoLogin: () => {
      dispatch(authCheckState());
    },
    logout: () => {
      dispatch(logout());
    },
    getTodo: () => {
      dispatch(getTodo());
    },
    createTodo: (values) => {
      dispatch(createTodo(values));
    },
    deleteTodo: (todo) => {
      dispatch(deleteTodo(todo));
    },
    markComplete: (todo_object) => {
      dispatch(markComplete(todo_object));
    },
    getSelectedTodo: (id) => {
      dispatch(getSelectedTodo(id));
    },
  };
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
