import React from "react";
import "./App.css";
import Product from "./components/Product";
import data from "./data.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      sort: "",
      size: "",
    };
  }

  render() {
    return (
      <div className="grid-container">
        <header>React Shopping Cart</header>
        <main>
          <div className="content">
            <div className="main">
              <Product products={this.state.products} />
            </div>
            <div className="sidebar">Cart</div>
          </div>
        </main>
        <footer>All Rights Are Reserved</footer>
      </div>
    );
  }
}

export default App;
