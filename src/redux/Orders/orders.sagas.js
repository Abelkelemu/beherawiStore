import ordersTypes from './orders.types';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleSaveOrder, handleGetUserOrderHistory,
  handleGetOrder,handleGetCustomerOrdersHistory,handleGetCustomerNewOrdersHistory, handleUpdateDeliveryStatus  } from './orders.helpers';
import { auth } from './../../firebase/utils';
import { clearCart } from './../Cart/cart.action';
import { setUserOrderHistory, setOrderDetails } from './orders.actions';

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(
      setUserOrderHistory(history)
    );

  } catch (err) {
    console.log(err);
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
};


export function* getCustomerOrdersHistory({ payload }) {
  try {
    const history = yield handleGetCustomerOrdersHistory(payload);
    yield put(
      setUserOrderHistory(history)
    );

  } catch (err) {
    console.log(err);
  }
}

export function* onGetCustomerOrdersHistoryStart() {
  yield takeLatest(ordersTypes.GET_CUSTOMER_ORDERS_HISTORY_START, getCustomerOrdersHistory);
};


export function* getCustomerNewOrdersHistory({ payload }) {
  try {
    const history = yield handleGetCustomerNewOrdersHistory(payload);
    yield put(
      setUserOrderHistory(history)
    );

  } catch (err) {
    console.log(err);
  }
}

export function* onGetCustomerNewOrdersHistoryStart() {
  yield takeLatest(ordersTypes.GET_CUSTOMER_NEW_ORDERS_HISTORY_START, getCustomerNewOrdersHistory);
};



export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
      delivered: false
    });
    yield put(
      clearCart()
    )

  } catch (err) {
    // console.log(err);
  }
};

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);
    console.log(order)
    yield put(
      setOrderDetails(order)
    )

  } catch (err) {
    // console.log(err);
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
};


export function* updateDeliveryStatus ({payload}) {

  const history = payload.history
  try{
    yield handleUpdateDeliveryStatus (payload)
    history.push('/myAdminPlace')
    // const history = yield handleGetCustomerNewOrdersHistory(payload);
    // yield put(
    //   setUserOrderHistory(history)
    // );
   
    
    // yield put(
    //   setOrderDetails(order)
    // )

  }catch(err){
    console.log(err)
  }
}

export function* onUpdateDeliveryStatus(){
  yield takeLatest(ordersTypes.UPDATE_DELIVERY_STATUS_START, updateDeliveryStatus);
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
    call(onGetCustomerOrdersHistoryStart),
    call(onGetCustomerNewOrdersHistoryStart),
    call(onUpdateDeliveryStatus),
  ])
}