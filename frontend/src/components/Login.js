import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import { reduxForm, Field, hasSubmitFailed } from "redux-form";
import Button from "@material-ui/core/Button/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography/Typography";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import validate from "./validate";
import "../styles/form.css";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const renderField = ({
  input,
  label,
  type,
  meta: { error, warning, touched, asyncValidating },
}) => (
  <div>
    <TextField
      {...input}
      type={type}
      label={label}
      placeholder={label}
      error={touched && error}
      fullWidth
    />
    <center>
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </center>
    <br />
  </div>
);

class Login extends React.Component {
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };
  render() {
    const {
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid,
      submitSucceeded,
      submitFailed,
    } = this.props;
    const { login } = this.props;
    return (
      <div>
        {submitSucceeded ? (
          <div>
            <Snackbar open={submitSucceeded} autoHideDuration={6000}>
              <Alert severity="success">You are successfully logged in.</Alert>
            </Snackbar>
          </div>
        ) : submitFailed ? (
          <Snackbar open={submitSucceeded} autoHideDuration={6000}>
            <Alert severity="danger">Login failed!</Alert>
          </Snackbar>
        ) : null}
        <Grid container direction="row" alignItems="baseline" className="form">
          <Grid item sm></Grid>
          <Grid item sm alignItems="center">
            <Typography component="h1" variant="h3" className="form-heading">
              Login
            </Typography>
            <form onSubmit={handleSubmit((data) => login({ ...data }))}>
              <Field
                name="email"
                label="Email*"
                type="text"
                component={renderField}
                className="form-field"
              />
              <Field
                name="password"
                label="Password*"
                type="password"
                component={renderField}
                className="form-field"
              />
              {error && <strong>{error}</strong>}
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={pristine || submitting || invalid}
              >
                Login <ArrowForwardOutlinedIcon />
                {submitting ? <CircularProgress color="secondary" /> : ""}
              </Button>
              <br />
              <Link to="/signup">
                <small>don't have account? signup here</small>
              </Link>
            </form>
          </Grid>
          <Grid item sm></Grid>
        </Grid>
      </div>
    );
  }
}

Login = reduxForm({
  form: "login-form",
  validate,
  // asyncValidate,
  // asyncChangeFields: ["email"],
})(Login);

export default Login;
