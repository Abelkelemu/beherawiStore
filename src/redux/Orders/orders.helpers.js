import { firestore } from './../../firebase/utils';

export const handleSaveOrder = order => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('orders')
      .doc()
      .set(order)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const handleGetUserOrderHistory = uid => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('orders').orderBy('orderCreatedDate', 'desc');
    ref = ref.where('orderUserID', '==', uid);
    


    ref
      .get()
      .then(snap => {
        const data = [
          ...snap.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];

        resolve({ data });
      })
      .catch(err => {
        reject(err);
      });


  });
};

export const handleGetCustomerOrdersHistory = uid => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('orders').orderBy('orderCreatedDate', 'desc');
    ref = ref.where('delivered', '==', true);

    ref
      .get()
      .then(snap => {
        const data = [
          ...snap.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];

        resolve({ data });
      })
      .catch(err => {
        reject(err);
      });


  });
};

export const handleGetCustomerNewOrdersHistory = payload => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('orders').orderBy('orderCreatedDate', 'desc');
   ref = ref.where('delivered', '==', false);

    ref
      .get()
      .then(snap => {
        const data = [
          ...snap.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];

        resolve({ data });
      })
      .catch(err => {
        reject(err);
      });


  });
};

export const handleGetOrder = orderID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('orders')
      .doc(orderID)
      .get()
      .then(snap => {
        if (snap.exists) {
          resolve({
            ...snap.data(),
            documentID: orderID
          })
        }
      })
      .catch(err => {
        reject(err);
      })
  })
}


export const handleUpdateDeliveryStatus = payload => {
  const orderID = payload.orderID
  return new Promise((resolve, reject) => {
    firestore
      .collection('orders')
      .doc(orderID)
      .update({
        'delivered' : true
      })
      .then(()=>{
        resolve();
      })
      .catch(err=>{
        reject(err);
      })
  })
}

