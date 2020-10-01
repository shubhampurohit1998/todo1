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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
    <div>
      <Card className={classes.root}>
        {loading ? (
          <Skeleton variant="rect" />
        ) : error ? (
          <div>Something went wrong</div>
        ) : (
          selectedUser.length > 0 &&
          selectedUser.map((item) => (
            <>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image=""
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.first_name + " " + item.last_name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </>
          ))
        )}
      </Card>
    </div>
  );
};

export default UserCard;
