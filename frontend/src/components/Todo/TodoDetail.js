import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";
const TodoDetail = (props) => {
  const {
    markComplete,
    updateTodo,
    deleteTodo,
    todo,
    handleClick,
    closeForm,
    submitSucceeded,
  } = props;

  if (submitSucceeded) {
    closeForm();
  }

  return (
    <ListItem alignItems="flex-start">
      {todo.is_complete ? (
        <>
          <span onClick={() => markComplete(todo)}>
            <CheckCircleRoundedIcon color="primary" />
          </span>
          <ListItemText
            primary={<s>{todo.title}</s>}
            secondary={"Created " + moment(todo.created_at).fromNow()}
            // onClick={() => gotoTodo(todo.id)}
          />
        </>
      ) : (
        <>
          <span onClick={() => markComplete(todo)}>
            <RadioButtonUncheckedRoundedIcon />
          </span>
          <ListItemText
            primary={todo.title}
            secondary={"Created " + moment(todo.created_at).fromNow()}
          />
        </>
      )}

      <span onClick={() => handleClick(todo.id)}>
        <EditIcon color="primary" fontSize="default" />
      </span>
      <span onClick={() => deleteTodo(todo)}>
        <DeleteIcon color="action" fontSize="default" />
      </span>
    </ListItem>
  );
};

export default TodoDetail;
