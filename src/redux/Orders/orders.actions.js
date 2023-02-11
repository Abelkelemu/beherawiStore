import ordersTypes from './orders.types';

export const saveOrderHistory = order => ({
  type: ordersTypes.SAVE_ORDER_HISTORY_START,
  payload: order
});

export const getUserOrderHistory = uid => ({
  type: ordersTypes.GET_USER_ORDER_HISTORY_START,
  payload: uid
});

export const getCustomerrOrdersHistory = uid => ({
  type: ordersTypes.GET_CUSTOMER_ORDERS_HISTORY_START,
  payload: uid
});

export const getCustomerNewOrdersHistory = uid => ({
  type: ordersTypes.GET_CUSTOMER_NEW_ORDERS_HISTORY_START,
  payload: uid
});

export const setUserOrderHistory = history => ({
  type: ordersTypes.SET_USER_ORDER_HISOTRY,
  payload: history
});

export const getOrderDetailsStart = orderID => ({
  type: ordersTypes.GET_ORDER_DETAILS_START,
  payload: orderID
});

export const setOrderDetails = order => ({
  type: ordersTypes.SET_ORDER_DETAILS,
  payload: order
});

export const updateDeliveryStatusStart = orderID => ({
  type: ordersTypes.UPDATE_DELIVERY_STATUS_START,
  payload: orderID 
})