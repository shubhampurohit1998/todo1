import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper/Paper";
const useStyles = makeStyles({
  root: {
    width: "100%",
    // backgroundColor: "skyblue",
  },
  media: {
    height: 140,
  },
});
const UserCard = (props) => {
  const classes = useStyles();
  const {
    user: { selectedUser, loading, error },
  } = props;
  return (
    <div className={classes.root}>
      {loading ? (
        <Skeleton variant="rect" />
      ) : error ? (
        <div>Something went wrong</div>
      ) : (
        selectedUser.length > 0 &&
        selectedUser.map((item) => (
          <>
            <Typography variant="h3" component="h3">
              User Details
            </Typography>
            <br />
            <Typography variant="inherit">
              Name:{" "}
              {item.first_name
                ? item.first_name + " " + item.last_name
                : item.username}
            </Typography>{" "}
            <br />
            <Typography variant="inherit">Email: {item.email}</Typography>{" "}
            <br />
            <Typography variant="inherit">
              Status: {item.is_user ? <>User</> : <>Agent</>}
            </Typography>{" "}
            <br />
            <Typography variant="inherit">
              Is Active: {item.is_active ? <>Yes</> : <> NO</>}
            </Typography>{" "}
            <br />
          </>
        ))
      )}
    </div>
  );
};

export default UserCard;
