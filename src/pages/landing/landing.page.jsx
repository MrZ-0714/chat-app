import React from "react";
import "./landing.styles.scss";
import { Link } from "react-router-dom";

import CustomButton from "../../components/custom-button/custom-button.component";

const LandingPage = () => (
  <div className="landing-page">
    <h1>Just Chat</h1>
    <Link to="/signin">
      <CustomButton>Sign In</CustomButton>
    </Link>
    <Link to="/signup">
      <CustomButton>Sign Up</CustomButton>
    </Link>
  </div>
);

export default LandingPage;
