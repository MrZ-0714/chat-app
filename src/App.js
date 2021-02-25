import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./pages/landing/landing.page";
import SignUp from "./components/sign-up/sign-up.component";
import SignIn from "./components/sign-in/sign-in.component";
import ChatPage from "./pages/chat/chat.page";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route
              exact
              path="/chat"
              render={() =>
                this.props.currentUser ? <ChatPage /> : <SignIn />
              }
            />
          </Switch>
        </header>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
