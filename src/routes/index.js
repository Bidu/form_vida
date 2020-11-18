import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//import { Home } from "../pages/Home";
import About from "../pages/About";
import PME from "../pages/PME";
import { PriceQuote } from "../pages/PriceQuote";



const Routes = () => (
  
  <BrowserRouter forceRefresh={true} >
    <Switch>
      {/*<Route exact path="/" component={Home} />*/}
      <Route exact path="/" >
         <Redirect to="/sobrevoce" />
      </Route>
      <Route exact path="/sobrevoce" component={About} forceRefresh={true} />
      <Route exact path="/cotacao" component={PriceQuote} />   
      <Route exact path="/sobrevoce/pme" component={PME} />    
    </Switch>
  </BrowserRouter>
);

export default Routes;
