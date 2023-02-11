import {takeLatest, put, all, call, take} from 'redux-saga/effects';

import {v4 as uuidv4} from 'uuid'

// types
import productsTypes from './products.types';

// local functions

import { handleAddProduct, handleFetchProducts, handleDeleteProduct, handleFetchProduct , handleUpdateProductImage , handleFetchSellerProducts} from './products.helpers';
import { auth, storage, firestore } from '../../firebase/utils';
import { setSellerProducts } from '../SellerProducts/sellerproducts.actions';
import { useSelector } from 'react-redux';

//actions

import { setProducts, fetchProductsStart , setProduct, deleteProductStart, updateProductImageStart} from './products.actions';



export function* addProduct ( {payload}) {
 
 
  
    try{
      const timestamp = new Date();

      yield handleAddProduct({
        ...payload,
        productAdminUserUID: auth.currentUser.uid,
        createdDate: timestamp
      });
      yield put(
        fetchProductsStart()
      );

    } catch (err){
        //console.log(err);
    }
}

export function* onAddProductStart () {
   yield takeLatest (productsTypes.ADD_NEW_PRODUCT_START,addProduct)
} 

export function* fetchProducts ({payload}) {
  try{
    const products = yield handleFetchProducts(payload);
    yield put (
      setProducts(products)
    );
  } catch(err){
    //console.log(err)
  }

}

export function* onFetchProductsStart(){
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START,fetchProducts)
}


// export function* fetchSellerProducts ({payload}) {
//   try{
//     const products = yield handleFetchSellerProducts(payload);
//     yield put (
//       setProducts(products)
//     );
//   } catch(err){
//     //console.log(err)
//   }

// }

// export function* onFetchSellerProductsStart(){
//   yield takeLatest(productsTypes.FETCH_SELLER_PRODUCTS_START,fetchSellerProducts)
// }












export function* deleteProduct({payload}) {
  try {
    yield handleDeleteProduct(payload);
    yield put (
      fetchProductsStart()
    );

  } catch (err) {
    // console.log(err);
  }
}


export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(
      setProduct(product)
    );

  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}


export function* updateProductImage ({payload}) {
  try{
    yield handleUpdateProductImage(payload)
    yield put(
      fetchProductsStart()
    );

  }catch(err){
    console.log(err)
  }
}

export function* onUpdateProductImageStart (){
  yield takeLatest(productsTypes.UPDATE_PRODUCT_IMAGE_START, updateProductImage);
}

export default function* productsSagas () {
    yield all ([
      call(onAddProductStart),
      call(onFetchProductsStart),
      call(onDeleteProductStart),
      call(onFetchProductStart),  
      call(onUpdateProductImageStart),
     
    ])
}