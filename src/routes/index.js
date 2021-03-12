import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//import { Home } from "../pages/Home";
import About from "../pages/About";
import Success from "../pages/Success";
import { PriceQuote } from "../pages/PriceQuote";
import Quiz from "../pages/Quiz";
import Payment from "../pages/Payment";

import Checkout from "../pages/Checkout";

const Routes = () => (
  <BrowserRouter forceRefresh={false}>
    <Switch>
      {/*<Route exact path="/" component={Home} />*/}
      <Route exact path="/">
        <Redirect to="/sobre-voce" />
      </Route>
      <Route exact path="/sobre-voce" component={About} forceRefresh={false} />
      <Route exact path="/cotacao/:id" component={PriceQuote} />
      <Route exact path="/questionario/:id" component={Quiz} />
      <Route exact path="/checkout/:id" component={Payment} />
      <Route exact path="/sucesso/:id" component={Success} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
