import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid/Grid";
import UserCard from "./UserCard";
import UserTodos from "./UserTodos";
const User = (props) => {
  const { id } = useParams();
  const { getSelectedUser, getUserTodo } = props;
  useEffect(() => {
    getSelectedUser(id);
    getUserTodo(id);
  }, []);

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item sm>
          <UserCard {...props} />
        </Grid>
        <Grid item sm>
          <UserTodos {...props} />
        </Grid>
      </Grid>
    </div>
  );
};

export default User;
