import React from "react";
import "./landing.styles.scss";
import { Link } from "react-router-dom";

import CustomButton from "../../components/custom-button/custom-button.component";
import { auth } from "../../firebase/firebase.utils";

const LandingPage = () => (
  <div className="landing-page">
    <h1>Just Chat</h1>
    <Link to="/signin">
      <CustomButton>Sign In</CustomButton>
    </Link>
    <Link to="/signup">
      <CustomButton>Sign Up</CustomButton>
    </Link>
    <CustomButton onclick={() => auth.signOut()}>
      SIGN OUT
    </CustomButton>
  </div>
);

export default LandingPage;
