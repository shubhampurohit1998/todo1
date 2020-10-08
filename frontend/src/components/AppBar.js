import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { NavLink } from "react-router-dom";

// For Drawer
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
// For Notification
import Badge from "@material-ui/core/Badge";
import NotificationPoper from "./NotificationPoper";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  navLinkStyle: {
    color: "white",
    paddingLeft: "5px",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    logout,
    isAuthenticated,
    searchTodo,
    notification: { loading, error, data: notification_obj },
  } = props;

  const {
    profile: { data },
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    console.log("Handling change");
    if (event.target.value) {
      searchTodo({ title: event.target.value });
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <NavLink to="/" className={classes.navLinkStyle}>
              <span style={{ fontFamily: "'Dancing Script', cursive" }}>
                BestPeers Do
              </span>
            </NavLink>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => handleChange(event)}
            />
          </div>
          <IconButton edge="end">
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" className={classes.navLinkStyle}>
                  <AccountCircleRoundedIcon />
                </NavLink>
                <NavLink to="/">
                  <Badge
                    badgeContent={
                      notification_obj.results &&
                      notification_obj.results.unseen
                    }
                    color="secondary"
                    className={classes.navLinkStyle}
                  >
                    <NotificationPoper {...props} />
                  </Badge>
                </NavLink>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.navLinkStyle}
                >
                  <MoreVertIcon />
                </IconButton>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {data && data.is_agent ? (
                    <StyledMenuItem
                      onClick={() => {
                        handleClose();
                        history.push("/users");
                      }}
                    >
                      <ListItemIcon>
                        <PeopleRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Users" />
                    </StyledMenuItem>
                  ) : null}
                  <StyledMenuItem onClick={logout}>
                    <ListItemIcon>
                      <ExitToAppRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </StyledMenuItem>
                </StyledMenu>
              </>
            ) : (
              <Typography variant="subtitle2" noWrap>
                <NavLink to="/login" className={classes.navLinkStyle}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={classes.navLinkStyle}>
                  Signup
                </NavLink>
              </Typography>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
