const util = {};

util.formatCurrency = (num) => {
  return "$" + Number(num?.toFixed(2)).toLocaleString() + " ";
};

util.sortProducts = (filteredproducts, sort) => {
  let sortedItems = filteredproducts ? [...filteredproducts] : [];
  sortedItems?.sort((a, b) =>
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
  );
  return sortedItems;
};

export default util;
