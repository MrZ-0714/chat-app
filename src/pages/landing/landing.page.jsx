import React from "react";
import "./landing.styles.scss";
import { Link } from "react-router-dom";

import CustomButton from "../../components/custom-button/custom-button.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const LandingPage = ({ currentUser }) => (
  <div className="landing-page">
    <h1>Just Chat</h1>
    {currentUser ? (
      <Link to="/chat"> You have already signed in, click me and chat</Link>
    ) : (
      <div>
        <Link to="/signin">
          <CustomButton>Sign In</CustomButton>
        </Link>
        <Link to="/signup">
          <CustomButton>Sign Up</CustomButton>
        </Link>
      </div>
    )}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(LandingPage);
