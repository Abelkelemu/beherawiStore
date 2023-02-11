import sellerProductsTypes from "./sellerproducts.types";

export const saveSellerProducts = sellerProducts => ({
  type: sellerProductsTypes.SAVE_SELLER_PRODUCTS_START,
  payload: sellerProducts
});

export const getSellerProducts = uid => ({
  type: sellerProductsTypes.GET_SELLER_PRODUCTS_START,
  payload: uid
});


export const setSellerProducts = history => ({
    type: sellerProductsTypes.SET_SELLER_PRODUCTS,
    payload: history
});

export const getSellerProductsDetailsStart = productID => ({
  type: sellerProductsTypes.GET_SELLER_PRODUCTS_DETAILS_START,
  payload: productID
});

export const setSellerProductsDetails = sellerProduct => ({
  type: sellerProductsTypes.SET_SELLER_PRODUCTS_DETAILS,
  payload: sellerProduct
});

export const deleteSellerProduct = requirements => ({
  
    type: sellerProductsTypes.DELETE_SELLER_PRODUCT_START,
    payload: requirements
  })

  export const updateSellerProductStart = requirements => ({
    type: sellerProductsTypes.UPDATE_SELLER_PRODUCT_START,
    payload: requirements 
})

export const fetchSellerProductsStart = (filters ={}) => ({
  type: sellerProductsTypes.FETCH_SELLER_PRODUCTS_START,
  payload: filters
});

