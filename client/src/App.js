import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./components/Menu";

import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  // <Routes>
  //   <Route exact path="/" component={Home}></Route>
  //   <Route exact path="/login" component={Login}></Route>
  //   <Route exact path="/register" component={Register}></Route>
  // </Routes>
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <Container>
        <Menu />
        <App />
      </Container>
    </Router>
  );
};

export default AppWrapper;
