import { firestore } from "../../firebase/utils";

export const handleSaveSellerProducts = sellerProducts => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('sellerProducts')
      .doc()
      .set(sellerProducts)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};


export const handleGetSellerProducts = uid => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('sellerProducts').orderBy('productCreatedDate','desc');
    ref = ref.where('sellerUserID', '==', uid);

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

export const handleFetchSellerProducts = ({filterType, searchType, startAfterDoc, persistProducts=[]}) => {
  
  

  return new Promise((resolve, reject) => {
      
      
      const pageSize = 6;
      let ref = firestore.collection('sellerProducts'). orderBy('productCreatedDate','desc').limit(pageSize);
    
      if (filterType != null)
    
      {
                if(filterType === 'fiction'  ) 
        {
          ref = ref.where('genres', '==', filterType )
        }
        else if(filterType === 'nonfiction'  ) 
        {
            ref = ref.where('genres', '==', 'nonfiction' )
        }
        else ref = ref.where('subGenres', '==', filterType )  
      }

      if (!filterType && searchType){
        
      const length = searchType.match(/(\w+)/g).length;
      
      const keywords = searchType.split(" ",length)
      ref= ref.where('keywords','array-contains-any', keywords)
       
      }
      if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
      
        ref
        .get() 
        .then(snapshot => {
            const totalCount =snapshot.size;

            const data = [
                ...persistProducts,
                ... snapshot.docs.map(doc => {
                 
                 
                    
                      return{
                        ...doc.data(),
                        documentID:doc.id,
                      }   
                                    
                 })
            ]; 

       
            resolve({
                data,
                queryDoc: snapshot.docs[totalCount-1],
                isLastPage: totalCount < 6
            });
        })
        .catch(err => {
            reject(err);
        })
      

  })
}



export const handleDeleteSellerProduct = (payload)=> {
  const documentID = payload.documentID
  
  return new Promise((resolve, reject) => {
   
    firestore
      .collection('sellerProducts')
      .doc(documentID)
      .delete()
      .then(() => {
      //   console.log(documentID, 2)
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleGetSellerProductDetails = productID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('sellerProducts')
      .doc(productID)
      .get()
      .then(snap => {
        if (snap.exists) {
          resolve({
            ...snap.data(),
            documentID: productID
          })
        }
      })
      .catch(err => {
        reject(err);
      })
  })
}