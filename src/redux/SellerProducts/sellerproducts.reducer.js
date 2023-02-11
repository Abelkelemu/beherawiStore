import sellerProductsTypes from "./sellerproducts.types";

const INITIAL_STATE = {
  sellerProducts: [],
  sellerProductsDetails: {},
};

const sellerProductsReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case sellerProductsTypes.SET_SELLER_PRODUCTS:
      return {
        ...state,
        sellerProducts: action.payload
      };
    case sellerProductsTypes.SET_SELLER_PRODUCTS_DETAILS:
      return {
        ...state,
        sellerProductsDetails: action.payload
      };
    default:
      return state;
  }
};

export default sellerProductsReducer;