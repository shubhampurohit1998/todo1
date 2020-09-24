import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Container from "@material-ui/core/Container/Container";
import Spinner from "@material-ui/core/CircularProgress/CircularProgress";
import { connect } from "react-redux";
import { login, authCheckState, logout } from "./actions/index";
import { useHistory } from "react-router-dom";
function App(props) {
  const {
    auth: { token, loading },
    login,
    logout,
    tryAutoLogin,
  } = props;

  useEffect(() => {
    tryAutoLogin();
  }, []);

  const history = useHistory();

  return (
    <div className="App">
      <center>BestPeers Do</center>
      {loading ? (
        <Spinner />
      ) : (
        <Router>
          <Link to="/">Home</Link>
          {token ? (
            <div className="home-logout" onClick={logout}>
              Log out
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              // component={Login}
              render={(props) => {
                return <Login login={login} history={history} />;
              }}
            />
            <Route path="/signup" component={Signup} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
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
  };
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
