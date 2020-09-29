import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Button from "@material-ui/core/Button/Button";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField/TextField";
import { reduxForm, Field, reset } from "redux-form";

const todoFormStyle = {
  padding: "10px 10px 10px 10px",
  display: "flex",
  flexDierectio: "row",
};

const renderField = ({ input, label, meta: { touched, error } }) => (
  <TextField
    label={label}
    placeholder="Write your todo here"
    fullWidth={true}
    {...input}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <NoteAddIcon color="inherit" />
        </InputAdornment>
      ),
    }}
  />
);

class TodoForm extends Component {
  submit = (values) => {
    console.log(values);
  };
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      error,
      submitSucceeded,
      createTodo,
    } = this.props;
    return (
      <form
        onSubmit={handleSubmit((data) => createTodo({ ...data }))}
        style={todoFormStyle}
      >
        <FormControl fullWidth>
          <Field name="todo" type="text" label="Todo" component={renderField} />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          // disabled={pristine || error || submitting}
          type="submit"
          onClick={reset}
          size="small"
        >
          ADD TODO <SendIcon />
        </Button>
      </form>
    );
  }
}

TodoForm = reduxForm({
  form: "todo-form",
})(TodoForm);

export default TodoForm;
