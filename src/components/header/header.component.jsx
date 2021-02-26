import React from "react";
import "./header.styles.scss";

//redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signoutCurrentUserAction } from "../../redux/user/user.action";

//firebase
import { signOutCurrentUser } from "../../firebase/firebase.utils";

const Header = ({ currentUser, signOutCurrentUserProps }) => {
  return (
    <div className="header">
      {currentUser ? (
        <div
          className="option"
          onClick={() => {
            signOutCurrentUser();
            signOutCurrentUserProps();
          }}
        >
          Sign Out
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutCurrentUserProps: () => dispatch(signoutCurrentUserAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
