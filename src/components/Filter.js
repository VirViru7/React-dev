import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchProductsBySize,
  fetchProductsBySort,
} from "../actions/productActions";

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading... </div>
    ) : (
      <div className="filter">
        <div>{this.props.count} Products</div>
        <div>
          Orders
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.fetchProductsBySort(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="Latest">Latest</option>
            <option value="Lowest">Lowest</option>
            <option value="Highest">Highest</option>
          </select>
        </div>
        <div>
          Size
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.fetchProductsBySize(
                this.props.products,
                e.target.value,
                this.props.sort
              )
            }
          >
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.items,
    sort: state.products.sort,
    size: state.products.size,
    filteredProducts: state.products.filteredItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsBySize: (products, size, sort) =>
      dispatch(fetchProductsBySize(products, size, sort)),
    fetchProductsBySort: (products, sort) =>
      dispatch(fetchProductsBySort(products, sort)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
