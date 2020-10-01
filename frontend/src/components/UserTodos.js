import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";
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
const UserTodos = (props) => {
  const {
    todo: { loading, error, todos },
  } = props;
  const [openCompleteList, setOpenCompleteList] = useState(true);
  const classes = useStyles();

  const list = (todo_list) =>
    todo_list.map((todo) => (
      <>
        <ListItem alignItems="flex-start">
          {todo.is_complete ? (
            <>
              <CheckCircleRoundedIcon color="primary" />
              <ListItemText
                primary={<s>{todo.title}</s>}
                secondary={"Created " + moment(todo.created_at).fromNow()}
              />
            </>
          ) : (
            <>
              <RadioButtonUncheckedRoundedIcon />
              <ListItemText
                primary={todo.title}
                secondary={"Created " + moment(todo.created_at).fromNow()}
              />
            </>
          )}
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    ));

  const activeList = todos.filter((item) => item.is_complete === false);
  const completeList = _.difference(todos, activeList);
  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : error ? (
        <div>Something went wrong!</div>
      ) : todos.length > 0 ? (
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
          {openCompleteList ? <div>{list(completeList)}</div> : null}
        </List>
      ) : (
        <div>This user has no Todo's</div>
      )}
    </div>
  );
};

export default UserTodos;
