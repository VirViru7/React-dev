import React, { Component } from "react";
import util from "../util";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div> Loading....</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a href={"#" + product._id}>
                      <img
                        src={product.image}
                        alt="product image"
                        onClick={() => this.openModal(product)}
                      />
                      <p>{product.title}</p>
                    </a>
                  </div>
                  <div className="product-price">
                    <div> {util.formatCurrency(product.price)}</div>
                    <button
                      onClick={() =>
                        this.props.addCart(product)
                      }
                      className="button primary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen="true" onRequestClose={this.closeModal}>
            <Zoom>
              <div className="w-100">
                <div className="text-right">
                  <button onClick={this.closeModal}>x</button>
                </div>
                <div className="w-100 row">
                  <div>
                    <img src={product.image} alt="productImage" />
                  </div>
                  <div className="m-1">
                    <div className="m-1">
                      <b>{product.title}</b>
                    </div>
                    <div className="m-1">{product.description}</div>
                    <div class="row m-1">
                      <label className="p-1">Available Sizes : </label>
                      <div class="row">
                        {product.availableSizes.map((p) => (
                          <div className="modal-product-size">{p}</div>
                        ))}
                      </div>
                    </div>
                    <div class="row space-between">
                      <div className="p-1">
                        {util.formatCurrency(product.price)}
                      </div>
                      <div>
                        <button className="button primary">Add To Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.filteredItems,
    cartItem: state.carts.cartItems || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
