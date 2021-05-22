import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  FILTER_PRODUCTS_BY_SORT,
} from "../types";

import util from "../util";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  let data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const fetchProductsBySize = (products, size, sort) => (dispatch) => {
  let updatedProd = products;
  if (sort != "" && sort != undefined && sort != null) {
    updatedProd = util.sortProducts(updatedProd, sort);
  }
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? updatedProd
          : updatedProd?.filter(
              (item) => item.availableSizes.indexOf(size) >= 0
            ),
    },
  });
};

export const fetchProductsBySort = (filteredproducts, sort) => (dispatch) => {
  let prod = util.sortProducts(filteredproducts, sort);
  dispatch({
    type: FILTER_PRODUCTS_BY_SORT,
    payload: { items: prod, sort: sort },
  });
};
