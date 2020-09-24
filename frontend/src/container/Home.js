import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/AddOutlined";
import Grid from "@material-ui/core/Grid/Grid";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab/Fab";
import { reduxForm, Field } from "redux-form";
const list = [
  "visit to doctor",
  "breakfast at 9 PM",
  "sleep at 11 AM",
  "Play ps5 on sunday",
];

const renderField = () => (
  <TextField label="Todo" placeholder="Write your todo here" fullWidth={true} />
);

class Home extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state{

  //   }
  // }
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
            />
          </Grid>
          <Grid>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>

        <Grid container direction="column" item sm>
          {list.map((item) => (
            <Grid container item sm direction="row" justify="center">
              <Grid item sm={10}>
                <Checkbox
                  defaultChecked={false}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                {item}
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

Home = reduxForm({
  form: "todo-form",
})(Home);

export default Home;

// use <s> tag to cross the text
