import sellerProductsTypes from "./sellerproducts.types";
import { takeLatest, put, all, call } from 'redux-saga/effects';
// import { handleSaveOrder, handleGetUserOrderHistory,
//   handleGetOrder,handleGetCustomerOrdersHistory } from './orders.helpers';
import { handleSaveSellerProducts,handleGetSellerProducts, handleDeleteSellerProduct,handleGetSellerProductDetails ,handleFetchSellerProducts} from "./sellerproducts.helpers";
import { auth } from './../../firebase/utils';
import { setSellerProducts, setSellerProductsDetails } from "./sellerproducts.actions";




export function* saveSellerProducts({ payload }) {
    try {
      const timestamps = new Date();
      yield handleSaveSellerProducts({
        ...payload,
        sellerUserID: auth.currentUser.uid,
        productCreatedDate: timestamps
      });
      
    } catch (err) {
      console.log(err);
    }
  };
  
  export function* onSaveSellerProductsStart() {
    yield takeLatest(sellerProductsTypes.SAVE_SELLER_PRODUCTS_START, saveSellerProducts);
  };


  export function* getSellerProducts({ payload }) {
    try {
      const sellerProducts = yield handleGetSellerProducts(payload);
      yield put(
        setSellerProducts(sellerProducts)
      );
  
    } catch (err) {
      console.log(err);
    }
  }
  
  export function* onGetSellerProductsStart() {
    yield takeLatest(sellerProductsTypes.GET_SELLER_PRODUCTS_START, getSellerProducts);
  };

 
  export function* deleteSellerProduct({payload}) {
    const history = payload.history
    
    try {
      yield handleDeleteSellerProduct(payload);
      history.push('/myStore');
  
    } catch (err) {
      // console.log(err);
    }
  }
  
  
  export function* onDeleteSellerProductStart() {
    yield takeLatest(sellerProductsTypes.DELETE_SELLER_PRODUCT_START, deleteSellerProduct);
  }

  

  export function* getSellerProductsDetails({ payload }) {
    try {
      const sellerProduct = yield handleGetSellerProductDetails(payload);
   
      yield put(
        setSellerProductsDetails(sellerProduct)
      )
  
    } catch (err) {
      // console.log(err);
    }
  }
  
  export function* onGetSellerProductsDetailsStart() {
    yield takeLatest(sellerProductsTypes.GET_SELLER_PRODUCTS_DETAILS_START, getSellerProductsDetails);
  };



 
  
  
  export function* fetchSellerProducts ({payload}) {
    try{
      const products = yield handleFetchSellerProducts(payload);
      yield put (
        setSellerProducts(products)
      );
    } catch(err){
      //console.log(err)
    }
  
  }
  
  export function* onFetchSellerProductsStart(){
    yield takeLatest(sellerProductsTypes.FETCH_SELLER_PRODUCTS_START,fetchSellerProducts)
  }


export default function* sellerProductsSagas() {
    yield all([
      call(onSaveSellerProductsStart),
      call(onGetSellerProductsStart),
      call(onDeleteSellerProductStart),
      call(onGetSellerProductsDetailsStart),
      call(onFetchSellerProductsStart)
    ])
  }