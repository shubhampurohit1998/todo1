import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import { reduxForm, Field } from "redux-form";
import Button from "@material-ui/core/Button/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography/Typography";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import validate from "./validate";
import asyncValidate from "./AsyncValidate";
import "./form.css";
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
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid,
      submitSucceeded,
    } = this.props;
    const { login } = this.props;
    return (
      <div>
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
