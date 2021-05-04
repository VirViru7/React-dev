import React, { Component } from "react";
import formatCurrency from "../util";

export default class Product extends Component {
  render() {
    return (
      <div>
        <ul className="products">
          {this.props.products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id}>
                  <img src={product.image} alt="product image" />
                  <p>{product.title}</p>
                </a>
              </div>
              <div className="product-price">
                <div> {formatCurrency(product.price)}</div>
                <button
                  onClick={() => this.props.addCart(product)}
                  className="button primary"
                >
                  Add To Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
