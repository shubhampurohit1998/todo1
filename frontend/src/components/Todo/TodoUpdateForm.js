import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FilledInput from "@material-ui/core/FilledInput/FilledInput";
import { reduxForm, Field } from "redux-form";
import validate from "../validate";
import { connect } from "react-redux";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "98%",
    paddingLeft: "10px",
    // paddingRight: "10px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const renderField = ({ input, type, label, meta: { error, touched } }) => (
  <>
    <FilledInput
      id="filled-adornment-todo"
      {...input}
      type={type}
      // placeholder={label}
    />
    {touched && error && <span>{error}</span>}
  </>
);

function TodoUpdateForm(props) {
  const classes = useStyles();
  const { handleClick, handleSubmit, updateTodo, submitSucceeded } = props;
  if (submitSucceeded) {
    handleClick();
  }
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit((data) => updateTodo({ ...data }))}>
        <FormControl fullWidth className={classes.margin} variant="filled">
          {/* <InputLabel htmlFor="filled-adornment-todo">Todo</InputLabel> */}
          <Field
            name="title"
            type="text"
            id="todo"
            component={renderField}
            label="Todo"
          />
        </FormControl>
        <Button size="small" type="submit" color="primary" variant="contained">
          Update
        </Button>
        <Button size="small" color="secondary" onClick={handleClick}>
          Cancel
        </Button>
      </form>
    </div>
  );
}

TodoUpdateForm = reduxForm({
  form: "todo-update-form",
  validate,
})(TodoUpdateForm);

TodoUpdateForm = connect((state) => ({
  initialValues: state.todo.selectedTodo,
}))(TodoUpdateForm);

export default TodoUpdateForm;
