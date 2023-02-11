import cartTypes from './cart.types';

export const addProduct = (nextCartItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: nextCartItem
});

export const removeCartItem = (cartItem) => ({
  type: cartTypes.REMOVE_CART_ITEM,
  payload: cartItem
});

export const reduceCartItem = (cartItem) => ({
  type: cartTypes.REDUCE_CART_ITEM,
  payload: cartItem
});

export const increaseDays = (cartItem) => ({
  type: cartTypes.INCREASE_DAYS,
  payload: cartItem
})

export const decreaseDays = (cartItem) => ({
  type: cartTypes.DECREASE_DAYS,
  payload: cartItem
})



export const clearCart = () => ({
  type: cartTypes.CLEAR_CART
})