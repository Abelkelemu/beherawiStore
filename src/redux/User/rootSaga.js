import {all, call} from 'redux-saga/effects';


// all the sagas created
import userSagas from './user.sagas';
import productsSagas from '../Products/products.sagas';
import ordersSagas from '../Orders/orders.sagas';
import sellerProductsSagas from '../SellerProducts/sellerproducts.sagas';

export default function* rootSaga() {
    yield all([
        call (userSagas),
        call (productsSagas),
        call (ordersSagas),
        call (sellerProductsSagas)
    ])
} 