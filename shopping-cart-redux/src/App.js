import React from "react";
import "./App.css";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Product from "./components/Product";
import data from "./data.json";
import { store } from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      sort: "",
      size: "",
      cartItem: JSON.parse(localStorage.getItem("cartItem")) || [],
    };
  }

  handleFilterSort = (event) => {
    let sort;
    if (event?.target) {
      sort = event.target.value;
    } else {
      sort = event;
    }

    this.setState((state) => ({
      sort: sort,
      products: state.products.sort((a, b) =>
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
    if (this.state.sort !== "") {
      this.handleFilterSort(this.state.sort);
    }
  };

  addToCart = (product) => {
    const cartItem = [...this.state.cartItem];
    let isAlreadyExist = false;

    cartItem.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        isAlreadyExist = true;
      }
    });

    if (!isAlreadyExist) {
      cartItem.push({ ...product, count: 1 });
    }

    this.setState({ cartItem: cartItem });
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  };

  removeItemFromCart = (item) => {
    const array = this.state.cartItem.filter((cart) => cart._id !== item._id);
    this.setState({ cartItem: array });
    localStorage.setItem("cartItem", JSON.stringify(array));
  };

  saveCreateorder = (order) => {
    alert(`need to save this order : ${order.userName}`);
  };

  render() {
    return (
      <Provider store={store}>
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
                <Product
                  products={this.state.products}
                  addCart={this.addToCart}
                />
              </div>
              <div className="sidebar">
                <Cart
                  cartItem={this.state.cartItem}
                  removeItemFromCart={this.removeItemFromCart}
                  saveCreateorder={this.saveCreateorder}
                />
              </div>
            </div>
          </main>
          <footer>All Rights Are Reserved</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
