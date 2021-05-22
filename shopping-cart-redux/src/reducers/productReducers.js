import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  FILTER_PRODUCTS_BY_SORT,
} from "../types";
export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        filteredItems: action.payload?.items,
        size: action.payload?.size,
      };
    case FILTER_PRODUCTS_BY_SORT:
      return {
        ...state,
        filteredItems: action.payload?.items,
        sort: action.payload?.sort,
      };
    default:
      return state;
  }
};
