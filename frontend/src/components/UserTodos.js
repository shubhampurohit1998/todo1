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

const UserTodos = (props) => {
  const { loading, error, todos } = props;
  const [openCompleteList, setOpenCompleteList] = useState(true);
  const classes = useStyles();

  const activeList = todos.map((todo) =>
    !todo.is_complete ? (
      <>
        <ListItem alignItems="flex-start">
          {todo.is_complete ? (
            <>
              <span>
                <CheckCircleRoundedIcon color="primary" />
              </span>
              <ListItemText
                primary={<s>{todo.title}</s>}
                secondary={"Created " + moment(todo.created_at).fromNow()}
              />
            </>
          ) : (
            <>
              <span>
                <RadioButtonUncheckedRoundedIcon />
              </span>
              <ListItemText
                primary={todo.title}
                secondary={"Created " + moment(todo.created_at).fromNow()}
              />
            </>
          )}
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
    ) : null
  );

  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : error ? (
        <div>Something went wrong!</div>
      ) : (
        todos.length > 0 && (
          <List className={classes.root}>
            {activeList}
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
            {openCompleteList ? completeList : null}
          </List>
        )
      )}
    </div>
  );
};

export default UserTodos;
