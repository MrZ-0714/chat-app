import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import NavBar from "./components/Nav-bar/nav-bar.component";
import SignUp from "./components/sign-up/sign-up.component";
import SignIn from "./components/sign-in/sign-in.component";
// import WithSpinner from "./components/with-spinner-hoc/with-spinner-hoc.component";

import SearchPage from "./pages/search/search.page";
import FriendsPage from "./pages/friends/friends.page";
import ChatPage from "./pages/chat/chat.page";
import LandingPage from "./pages/landing/landing.page";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

// const FriendsPageWithSpinner = WithSpinner(FriendsPage);

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
              path="/friends"
              render={() =>
                currentUser ? (
                  <FriendsPage currentUser={currentUser} />
                ) : (
                  <SignIn />
                )
              }
            />
            <Route exact path="/search" render={() => <SearchPage />} />
          </Switch>
        </header>

        <footer className="App-footer">{currentUser && <NavBar />}</footer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
