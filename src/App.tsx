import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./components/NavBar";
import Search from "./components/Search";

import "./App.css";

const App: React.FC = () => {
  return (
    <MuiThemeProvider>
      <div>
        <NavBar />
        <Search />
      </div>
    </MuiThemeProvider>
  );
};

export default App;
