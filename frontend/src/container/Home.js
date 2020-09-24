import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/AddOutlined";
import Grid from "@material-ui/core/Grid/Grid";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab/Fab";
import { Field } from "redux-form";
// import { reduxForm, Field } from "redux-form";
const list = [
  { title: "visit to doctor", isDone: false },
  { title: "breakfast at 9 PM", isDone: true },
  { title: "sleep at 11 AM", isDone: false },
  { title: "Play ps5 on sunday", isDone: false },
];

class Home extends React.Component {
  state = {
    todo: "",
  };

  handleChange = (event) => {
    this.setState({
      todo: event.target.value,
    });
  };

  onAddClick = () => {
    if (this.state.todo) {
      list.push(this.state.todo);
      this.setState({ todo: "" });
    }
  };

  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        // alignItems="baseline"
        className="home"
      >
        <Grid
          container
          item
          sm
          justify="space-around"
          className=""
          direction="row"
        >
          <Grid item sm={10}>
            <TextField
              label="Todo"
              placeholder="Write your todo here"
              fullWidth={true}
              onChange={this.handleChange}
              value={this.state.todo}
            />
          </Grid>
          <Grid>
            <Fab color="primary" aria-label="add" onClick={this.onAddClick}>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>

        <Grid container direction="column" item sm>
          {list.map((item) => (
            <Grid container item sm direction="row" justify="center">
              <Grid item sm={10}>
                <Checkbox
                  defaultChecked={item.isDone}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                {item.isDone ? <s>{item.title}</s> : item.title}
                <br />
                <small>created at</small>
              </Grid>
              <Grid item sm={2}>
                <DeleteIcon color="action" />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

// Home = reduxForm({
//   form: "todo-form",
// })(Home);

export default Home;

// use <s> tag to cross the text
