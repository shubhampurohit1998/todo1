import React, { Component } from "react";
import "../styles/Profile.css";
import BackGroundImage from "../assets/profile_background.jpg";
import Grid from "@material-ui/core/Grid/Grid";
class Profile extends Component {
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    const {
      profile: { loading, error, data },
    } = this.props;
    return (
      <div className="profile">
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item sm className="profile-upper-section">
            <img
              src={BackGroundImage}
              alt="Background image"
              className="profile-background"
            />
          </Grid>
          <Grid item sm className="profile-lower-section">
            Lower section
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Profile;
