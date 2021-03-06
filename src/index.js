import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import App from "./App.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import Activate from "./screens/Activate.jsx";
import Private from "./screens/Private.jsx";
import Admin from "./screens/Admin.jsx";
import ForgetPassword from "./screens/ForgetPassword.jsx";
import ResetPassword from "./screens/ResetPassword.jsx";
import Navbar from "./components/navbar.component";
import InvoicesList from "./components/invoices-list.component";
import EditInvoice from "./components/edit-invoice.component";
import CreateInvoice from "./components/create-invoice.component";
import CreateUser from "./components/create-user.component";

import "react-toastify/dist/ReactToastify.css";
require('dotenv').config()
ReactDOM.render(
  <BrowserRouter>
    <Switch>

      <Route path="/" exact render={(props) => <App {...props} />} />
      <Route path = "/home" exact component = {InvoicesList} />
      <Route path = "/navbar" exact component = {Navbar} />
      <Route path = "/edit/:id" component = {EditInvoice} />
      <Route path = "/create" exact component = {CreateInvoice} />
      <Route path = "/user" exact component = {CreateUser} />
      <Route path="/login" exact render={(props) => <Login {...props} />} />
      <Route
        path="/register"
        exact
        render={(props) => <Register {...props} />}
      />
      <Route
        path="/users/password/forget"
        exact
        render={(props) => <ForgetPassword {...props} />}
      />
      <Route
        path="/users/password/reset/:token"
        exact
        render={(props) => <ResetPassword {...props} />}
      />
      <Route
        path="/users/activate/:token"
        exact
        render={(props) => <Activate {...props} />}
      />
      <Route path="/private" exact component={Private} />
      <Route path="/admin" exact component={Admin} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
