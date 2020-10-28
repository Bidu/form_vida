import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../assets/img/logo-bidu.svg";
import TemporaryDrawer from "./menu";

export class Header extends Component {
  render() {
    return (
      <>
        <header className="header">
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <IconButton aria-label="search" color="dark">
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4} className="logo-bidu">
              <a href="https://www.bidu.com.br/" title="Bidu">
                <img src={logo} alt="Bidu" />
              </a>
            </Grid>
            <Grid item xs={4} className="txt-right"></Grid>
          </Grid>
        </header>
        {/*<div className="search-mobile">
            <form className="">
              <input 
                itemprop="query-input" 
                type="text" 
                className="search-field simple-input" 
                id="search-text" 
                name="s" 
                searchform-5e87b784a1b20="Pesquisar" 
                placeholder="Buscar"
              />
              <button 
                type="submit" 
                className="search-submit"
              >
                  <SearchIcon/>
                </button>
            </form>
          </div>*/}
        <TemporaryDrawer />
      </>
    );
  }
}
