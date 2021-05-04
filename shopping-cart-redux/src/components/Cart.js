import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
  render() {
    const { cartItem } = this.props;
    return (
      <div>
        <div>
          {cartItem.length === 0 ? (
            <div className="cart cart-header"> Cart is Empty</div>
          ) : (
            <div className="cart cart-header">
              {cartItem.length} products in the Cart
            </div>
          )}
        </div>
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItem.map((item) => (
                <li key={item._id}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <img src={item.image} alt="item image" />
                    <div style={{ marginLeft: "5px" }}>{item.title}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span>
                      {formatCurrency(item.price)} x {item.count} {"  "}
                    </span>
                    <button
                      className="button primary"
                      onClick={() => this.props.removeItemFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {cartItem.length !== 0 && (
              <div className="total">
                <div style={{ flex: 3, display: "flex", alignItems: "center" }}>
                  Total : {"  "}{" "}
                  {formatCurrency(
                    cartItem.reduce((a, c) => a + c.price * c.count, 0)
                  )}{" "}
                  {"  "}
                </div>
                <div style={{ flex: 1 }}>
                  <button style={{ width: "12rem" }} className="button primary">
                    Proceed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
