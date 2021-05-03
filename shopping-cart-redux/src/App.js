import React from "react";
import "./App.css";
import Filter from "./components/Filter";
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

  handleFilterSort = (event) => {
    const sort = event.target.value;

    this.setState((state) => ({
      sort: sort,
      products: this.state.products.sort((a, b) =>
        sort === "Lowest"
          ? a.price > b.price
            ? 1
            : -1
          : sort === "Highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id < b._id
          ? 1
          : -1
      ),
    }));
  };

  handleFilterSize = (event) => {
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>React Shopping Cart</header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                sort={this.state.sort}
                size={this.state.size}
                filterSort={(e) => this.handleFilterSort(e)}
                filterSize={(e) => this.handleFilterSize(e)}
              />
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
