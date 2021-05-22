import React, { Component } from "react";
import util from "../util";
import Fade from "react-reveal/Fade";
import { removeFromCart } from "../actions/cartActions";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProceedCheckOut: false,
      userName: "",
      email: "",
      address: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      userName: this.state.userName,
      email: this.state.email,
      address: this.state.address,
      cartItem: this.props.cartItem,
    };

    this.props.saveCreateorder(order);
  };

  render() {
    const { cartItem } = this.props;
    return (
      <div>
        <div>
          {cartItem?.length === 0 ? (
            <div className="cart cart-header"> Cart is Empty</div>
          ) : (
            <div className="cart cart-header">
              {cartItem.length} products in the Cart
            </div>
          )}
        </div>
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItem.map((item) => (
                  <li key={item._id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <img src={item.image} alt="item image" />
                      <div style={{ marginLeft: "5px" }}>{item.title}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span>
                        {util.formatCurrency(item.price)} x {item.count} {"  "}
                      </span>
                      <button
                        className="button primary"
                        onClick={() =>
                          this.props.removeItemFromCart(item)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
            {cartItem?.length !== 0 && (
              <>
                <div className="total">
                  <div
                    style={{ flex: 3, display: "flex", alignItems: "center" }}
                  >
                    Total : {"  "}{" "}
                    {util.formatCurrency(
                      cartItem.reduce((a, c) => a + c.price * c.count, 0)
                    )}{" "}
                    {"  "}
                  </div>
                  <div style={{ flex: 1 }}>
                    <button
                      style={{ width: "12rem" }}
                      className="button primary"
                      onClick={() => this.setState({ isProceedCheckOut: true })}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
                {this.state.isProceedCheckOut && (
                  <Fade right cascade>
                    <div className="column w-100">
                      <form onSubmit={this.createOrder}>
                        <div className="mt-2">Email</div>
                        <div>
                          <input
                            type="email"
                            name="email"
                            required
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="mt-2">name</div>
                        <div>
                          <input
                            type="text"
                            name="userName"
                            required
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="mt-2">Address</div>
                        <div>
                          <textarea
                            name="address"
                            required
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="mt-2">
                          <button type="submit" className="button primary">
                            Submit Order
                          </button>
                        </div>
                      </form>
                    </div>
                  </Fade>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItem: state.carts.cartItems || [],
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    removeItemFromCart: (product) =>
      dispatch(removeFromCart(product)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Cart);
