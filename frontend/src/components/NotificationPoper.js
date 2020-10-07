import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Spinner from "@material-ui/core/CircularProgress/CircularProgress";
import _ from "lodash";
// import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const {
    notification: { loading, error, data },
    markSeen,
  } = props;

  console.log(data);

  return (
    <div>
      <span onClick={handleClick}>
        <NotificationsIcon />
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {/* <Typography className={classes.typography}> */}
        <List className={classes.root}>
          {loading ? (
            <Spinner size="small" />
          ) : error ? (
            <div>Something went wrong!</div>
          ) : (
            data.results &&
            data.results.map((item) => (
              <div key={item.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={_.capitalize(item.seen_by)}
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      item.seen ? (
                        _.capitalize(item.seen_by) + ", " + item.message
                      ) : (
                        <b>
                          {_.capitalize(item.seen_by) + ", " + item.message}
                        </b>
                      )
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                    onClick={() => markSeen(item)}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))
          )}
        </List>
        {/* </Typography> */}
      </Popover>
    </div>
  );
}
