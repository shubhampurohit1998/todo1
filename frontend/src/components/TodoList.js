import React from "react";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";
import { useHistory } from "react-router-dom";
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
  return (
    <List className={classes.root}>
      {todos.map((todo) => (
        <>
          <ListItem alignItems="flex-start">
            <Checkbox
              defaultChecked={todo.is_complete}
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onClick={() => markComplete(todo)}
            />
            {todo.is_complete ? (
              <ListItemText
                primary={<s>{todo.title}</s>}
                secondary={"Created " + moment(todo.created_at).fromNow()}
                onClick={() => gotoTodo(todo.id)}
              />
            ) : (
              <ListItemText
                primary={todo.title}
                secondary={"Created " + moment(todo.created_at).fromNow()}
                onClick={() => gotoTodo(todo.id)}
              />
            )}

            <span onClick={() => deleteTodo(todo)}>
              <DeleteIcon color="action" />
            </span>
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
};

export default TodoList;
