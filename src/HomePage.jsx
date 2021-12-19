import React, { Component } from "react";
import HomeSearchPage from "./HomeSearchPage";
import "./style/HomePage.css";

import Header from "./Header";

class HomePage extends Component {
  state = {
    serarchfield: "",
  };

  render() {
    return (
      <div className="container">
        <Header />
        <HomeSearchPage searchChange={this.onSearchChange} />
      </div>
    );
  }

  onSearchChange = (e) => {
    this.setState({ serarchfield: e.target.value });
  };
}

export default HomePage;
