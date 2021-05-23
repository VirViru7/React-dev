import React, { Component } from "react";
import util from "../util";
import Fade from "react-reveal/Fade";
import { removeFromCart } from "../actions/cartActions";
import { connect } from "react-redux";
import { createOrder, clearOrder } from "../actions/orderActions";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

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

  createOrderFromCart = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.userName,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItem,
      total: this.props.cartItem.reduce((a, c) => a + c.price * c.count, 0),
    };

    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
    this.setState({ isProceedCheckOut: false });
  };

  render() {
    const { cartItem, order } = this.props;
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
        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <div className="w-100">
                <div className="text-right">
                  <button className="text-right" onClick={this.closeModal}>
                    x
                  </button>
                </div>
                <div className="order-success">
                  <div>
                    <h3 className="text-green">Your order has been placed.</h3>
                  </div>
                  <div>
                    <label>
                      {" "}
                      Order Id : <b>{order._id}</b>
                    </label>
                  </div>
                  <div className="column">
                    <div className="row p-1 space-between">
                      <div>
                        <b>Name:</b>
                      </div>
                      <div>{order.name}</div>
                    </div>
                    <div className="row p-1 space-between">
                      <div>
                        <b>Email:</b>
                      </div>
                      <div>{order.email}</div>
                    </div>
                    <div className="row p-1 space-between">
                      <div>
                        <b>Address:</b>
                      </div>
                      <div>{order.address}</div>
                    </div>
                    <div className="row p-1 space-between">
                      <div>
                        <b>Total:</b>
                      </div>
                      <div>
                        <div>{util.formatCurrency(order.total)}</div>
                      </div>
                    </div>
                    <div className="row p-1  space-between">
                      <div>
                        <b>cart Items:</b>
                      </div>
                      <div>
                        {order.cartItems.map((item) => (
                          <div class="col">
                            <div key={item._id}>
                              {item.count} x {item.price} {""} {item.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
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
                        onClick={() => this.props.removeItemFromCart(item)}
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
                      <form onSubmit={this.createOrderFromCart}>
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
    order: state.orders.order,
    cartItem: state.carts.cartItems || [],
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    removeItemFromCart: (product) => dispatch(removeFromCart(product)),
    createOrder: (order) => dispatch(createOrder(order)),
    clearOrder: () => dispatch(clearOrder()),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Cart);
