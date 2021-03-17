import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//redux set up
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "bootstrap/dist/css/bootstrap.min.css";

//import worker from public folder.
const getPathFromPublic = (path) => `${process.env.PUBLIC_URL}/${path}`;
const workerPath = getPathFromPublic("firebase-messaging-sw.js");
const worker = new Worker(workerPath);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
