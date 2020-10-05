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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "../styles/form.css";
const renderField = ({
  input,
  label,
  type,
  meta: { error, warning, touched, asyncValidating },
}) => (
  <div className={asyncValidating ? "async-validating" : ""}>
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

const radioButton = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel value="user" control={<Radio />} label="User" />
      <FormControlLabel value="agent" control={<Radio />} label="Agent" />
    </RadioGroup>
  </FormControl>
);

class Signup extends React.Component {
  submit = (values) => {
    alert("Form submitted successfully.....");
    console.log(values);
  };

  // componentDidUpdate() {
  //   if (this.props.submitSucceeded) {
  //     this.props.history.push("/");
  //   }
  // }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid,
      history,
      submitFailed,
      submitSucceeded,
    } = this.props;
    if (submitSucceeded) {
      history.push("/login");
    }
    return (
      <div>
        <Grid container direction="row" alignItems="baseline" className="form">
          <Grid item sm></Grid>
          <Grid item sm >
            <Typography component="h1" variant="h3" className="form-heading">
              Signup
            </Typography>
            <form onSubmit={handleSubmit((data) => this.submit({ ...data }))}>
              <Field
                name="email"
                label="Email*"
                type="text"
                component={renderField}
                className="form-field"
              />
              <Field
                name="password"
                label="Password1*"
                type="password"
                component={renderField}
                className="form-field"
              />
              <Field
                name="re_password"
                label="Password2*"
                type="password"
                component={renderField}
                className="form-field"
              />
              <Field name="user_type" value="user" component={radioButton}>
                <Radio value="user" label="User" />
                <Radio value="agent" label="Agent" />
              </Field>
              <br />
              {submitFailed ? <small>Something went wrong</small> : null}
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={pristine || submitting || invalid}
              >
                Signup <ArrowForwardOutlinedIcon />
                {submitting ? <CircularProgress color="secondary" /> : ""}
              </Button>
              <br />
              <Link to="/login">
                <small>Already a user? login here</small>
              </Link>
            </form>
          </Grid>
          <Grid item sm></Grid>
        </Grid>
      </div>
    );
  }
}

Signup = reduxForm({
  form: "signup-form",
  validate,
  asyncValidate,
  asyncBlurFields: ["email"],
})(Signup);

export default Signup;
