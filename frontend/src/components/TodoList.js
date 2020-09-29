import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";
import { useHistory } from "react-router-dom";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import { Typography } from "@material-ui/core";
// import StarRoundedIcon from "@material-ui/icons/StarRounded";
// import StarOutlineRoundedIcon from "@material-ui/icons/StarOutlineRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const TodoList = (props) => {
  const { todos, deleteTodo, markComplete } = props;
  const classes = useStyles();
  const history = useHistory();
  const gotoTodo = (id) => {
    history.push(`/todo/${id}`);
  };

  const [openCompleteList, setOpenCompleteList] = useState(true);

  const activeList = todos.map((todo) =>
    !todo.is_complete ? (
      <>
        <ListItem alignItems="flex-start">
          {todo.is_complete ? (
            <>
              <span onClick={() => markComplete(todo)}>
                <CheckCircleRoundedIcon color="primary" />
              </span>
              <ListItemText
                primary={<s>{todo.title}</s>}
                secondary={"Created " + moment(todo.created_at).fromNow()}
                onClick={() => gotoTodo(todo.id)}
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
                onClick={() => gotoTodo(todo.id)}
              />
            </>
          )}

          <span onClick={() => deleteTodo(todo)}>
            <DeleteIcon color="action" fontSize="large" />
          </span>
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    ) : null
  );

  const completeList = todos.map((todo) =>
    todo.is_complete ? (
      <>
        <ListItem alignItems="flex-start">
          {todo.is_complete ? (
            <>
              <span onClick={() => markComplete(todo)}>
                <CheckCircleRoundedIcon color="primary" />
              </span>
              <ListItemText
                primary={<s>{todo.title}</s>}
                secondary={"Created " + moment(todo.created_at).fromNow()}
                onClick={() => gotoTodo(todo.id)}
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
                onClick={() => gotoTodo(todo.id)}
              />
            </>
          )}

          <span onClick={() => deleteTodo(todo)}>
            <DeleteIcon color="action" fontSize="large" />
          </span>
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    ) : null
  );

  return (
    <List className={classes.root}>
      {activeList}
      <Typography variant="caption">
        {openCompleteList ? (
          <span onClick={() => setOpenCompleteList(!openCompleteList)}>
            <ExpandMoreRoundedIcon color="action" />
          </span>
        ) : (
          <span onClick={() => setOpenCompleteList(!openCompleteList)}>
            <ChevronRightRoundedIcon color="action" />
          </span>
        )}
        Completed
      </Typography>
      {openCompleteList ? completeList : null}
    </List>
  );
};

export default TodoList;
