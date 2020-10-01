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
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import _ from "lodash";

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

  const list = (todo_list) =>
    todo_list.map((todo) => (
      <div key={todo.id}>
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
      </div>
    ));

  const activeList = todos.filter((item) => item.is_complete === false);
  const completeList = _.difference(todos, activeList);
  const sortedCompleteList = _.orderBy(
    completeList,
    (item) => {
      return new Date(item.updated_at);
    },
    ["desc"]
  );

  // console.log(completeList);
  // console.log(sortedCompleteList);

  return (
    <List className={classes.root}>
      {list(activeList)}
      <Typography variant="inherit">
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
      {openCompleteList ? list(sortedCompleteList) : null}
    </List>
  );
};

export default TodoList;
