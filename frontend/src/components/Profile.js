import React, { Component, useEffect } from "react";
import "../styles/Profile.css";
import BackGroundImage from "../assets/profile_background.jpg";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Spinner from "@material-ui/core/CircularProgress/CircularProgress";
const Profile = (props) => {
  const {
    profile: { loading, error, data },
  } = props;
  useEffect(() => {
    props.getProfile();
  }, []);
  console.log(props.profile.data);
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
          {loading && !error ? (
            <Spinner />
          ) : error ? (
            <div>Profile loading failed</div>
          ) : (
            data && <div>{data.first_name}</div>
          )}
          Lower section
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
