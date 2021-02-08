import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//import { Home } from "../pages/Home";
import About from "../pages/About";
import PME from "../pages/PME";
import Home from "../pages/Home";
import Success from "../pages/Success";
import { PriceQuote } from "../pages/PriceQuote";
import Questionario from "../pages/Questionario";
import Checkout from "../pages/Checkout";

const Routes = () => (
  <BrowserRouter forceRefresh={true}>
    <Switch>
      {/*<Route exact path="/" component={Home} />*/}
      <Route exact path="/">
        <Redirect to="/sobre-voce" />
      </Route>
      <Route exact path="/sobre-voce" component={About} forceRefresh={true} />
      <Route exact path="/cotacao" component={PriceQuote} />
      <Route exact path="/questionario" component={Questionario} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/sucesso" component={Success} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
