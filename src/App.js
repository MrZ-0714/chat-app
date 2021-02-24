import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./pages/landing/landing.page";
import SignUp from "./components/sign-up/sign-up.component";
import SignIn from "./components/sign-in/sign-in.component";
import ChatPage from "./pages/chat/chat.page";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/chat" component={ChatPage} />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
