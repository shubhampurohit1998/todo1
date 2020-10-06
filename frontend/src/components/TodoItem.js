import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Spinner from "@material-ui/core/CircularProgress/CircularProgress";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FilledInput from "@material-ui/core/FilledInput/FilledInput";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "90%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TodoItem = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const [update, setUpdate] = useState(false);
  const {
    getSelectedTodo,
    todo: { selectedTodo, loading, error },
    markComplete,
  } = props;
  useEffect(() => {
    getSelectedTodo(id);
  }, []);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {loading && !error ? (
        <Spinner />
      ) : error ? (
        <div>Something went wrong!</div>
      ) : selectedTodo.length > 0 ? (
        selectedTodo.map((item) => (
          <Grid item sm>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Created {moment(item.created_at).fromNow()}
                </Typography>
                {update ? (
                  <FormControl
                    fullWidth
                    className={classes.margin}
                    variant="filled"
                  >
                    <InputLabel htmlFor="filled-adornment-todo">
                      Todo
                    </InputLabel>
                    <FilledInput
                      id="filled-adornment-todo"
                      value={item.title}
                      // onChange={handleChange("amount")}
                      // startAdornment={
                      //   <InputAdornment position="start">$</InputAdornment>
                      // }
                    />
                  </FormControl>
                ) : (
                  <Typography variant="h5" component="h2">
                    {item.title}
                  </Typography>
                )}
                <Typography className={classes.title} color="textSecondary">
                  Status{" "}
                  {!item.is_complete ? (
                    <span style={{ color: "red" }}> active</span>
                  ) : (
                    <span style={{ color: "blue" }}>
                      completed <CheckCircleRoundedIcon color="primary" />
                    </span>
                  )}
                </Typography>
              </CardContent>
              <CardActions>
                {update ? (
                  <>
                    <Button size="small" color="primary" variant="contained">
                      Save
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => setUpdate(!update)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="small" onClick={() => setUpdate(!update)}>
                      Update
                    </Button>
                    <Button size="small" onClick={() => markComplete(item)}>
                      {item.is_complete
                        ? "Mark as not complete"
                        : "Mark as done"}
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <div>Not found</div>
      )}
    </Grid>
  );
};

export default TodoItem;
