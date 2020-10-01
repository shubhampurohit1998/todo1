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
// import Spinner from "@material-ui/core/CircularProgress/CircularProgress";

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
  getUsersList,
  getProfile,
  getSelectedUser,
  getUserTodo,
} from "./actions/index";
import { useHistory } from "react-router-dom";
// import ProtectedRoute from "./protected.route/Protected";
import TodoItem from "./components/TodoItem";
import AppBar from "./components/AppBar";
import Profile from "./components/Profile";
import Users from "./components/UserTable";
import User from "./components/User";
function App(props) {
  const {
    auth: { loading },
    login,
    tryAutoLogin,
    getTodo,
    todo,
    createTodo,
    deleteTodo,
    isAuthenticated,
    markComplete,
    getSelectedTodo,
    profile,
    getProfile,
  } = props;

  useEffect(() => {
    tryAutoLogin();
    getTodo();
  }, []);

  const history = useHistory();

  return (
    <div className="App">
      <Router>
        <AppBar {...props} />
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
          <Route
            path="/profile"
            render={() => {
              if (isAuthenticated) {
                return <Profile profile={profile} getProfile={getProfile} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            path="/users"
            exact
            render={() => {
              if (isAuthenticated) {
                return <Users {...props} />;
              }
            }}
          />
          <Route
            exact
            path="/users/:id"
            render={() => {
              if (isAuthenticated) {
                return <User {...props} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    todo: state.todo,
    isAuthenticated: state.auth.token ? true : false,
    user: state.user,
    profile: state.profile,
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
    getUsersList: () => {
      dispatch(getUsersList());
    },
    getProfile: () => {
      dispatch(getProfile());
    },
    getSelectedUser: (id) => {
      dispatch(getSelectedUser(id));
    },
    getUserTodo: (id) => {
      dispatch(getUserTodo(id));
    },
  };
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
