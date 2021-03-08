import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import LandingPage from "./pages/landing/landing.page";
import SignUp from "./components/sign-up/sign-up.component";
import SignIn from "./components/sign-in/sign-in.component";
import ChatPage from "./pages/chat/chat.page";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (currentUser ? <ChatPage /> : <LandingPage />)}
            />
            <Route
              exact
              path="/signin"
              render={() => (currentUser ? <ChatPage /> : <SignIn />)}
            />
            <Route
              exact
              path="/signup"
              render={() => (currentUser ? <ChatPage /> : <SignUp />)}
            />
            <Route
              exact
              path="/chat"
              render={() => (currentUser ? <ChatPage /> : <SignIn />)}
            />
            <Route
              exact
              path="/signintest"
              render={() => <SignIn />}
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
