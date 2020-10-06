import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import _ from "lodash";
import TodoItem from "./TodoItem";
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

  const [openCompleteList, setOpenCompleteList] = useState(true);

  const list = (todo_list) =>
    todo_list.map((todo) => (
      <div key={todo.id}>
        <TodoItem todo={todo} {...props} />
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
