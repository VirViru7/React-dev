import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div class="filter">
        <div>{this.props.count} Products</div>
        <div>
          Orders
          <select onChange={this.props.filterSort}>
            <option value="Latest">Latest</option>
            <option value="Lowest">Lowest</option>
            <option value="Highest">Highest</option>
          </select>
        </div>
        <div>
          Size
          <select onChange={this.props.filterSize}>
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
