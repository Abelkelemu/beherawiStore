import { firestore } from "../../firebase/utils";
import {storage} from '../../firebase/utils';
import {v4 as uuidv4} from 'uuid'




export const handleAddProduct = product => {
  const length = product.productName.match(/(\w+)/g).length;
  const keywords = product.productName.split(" ",length)
 
  


    return new Promise((resolve, reject) => {
       firestore
         .collection('products')
         .doc()
         .set ({
           ...product,
           keywords
           
          })
         .then (() => {
             resolve();
         })
          .catch(err => {
              reject(err);
          })
    });
}

export const handleFetchProducts = ({filterType, searchType, startAfterDoc, persistProducts=[]}) => {
  
  

  return new Promise((resolve, reject) => {
      
      
      const pageSize = 6;
    
    

      let ref = firestore.collection('products'). orderBy('createdDate','desc').limit(pageSize);
      
     

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


// export const handleFetchSellerProducts = ({filterType, searchType, startAfterDoc, persistProducts=[]}) => {
  
  

//   return new Promise((resolve, reject) => {
      
      
//       const pageSize = 6;
//       let ref = firestore.collection('sellerProducts'). orderBy('productCreatedDate','desc').limit(pageSize);
    
//       if (filterType != null)
    
//       {
//                 if(filterType === 'fiction'  ) 
//         {
//           ref = ref.where('genres', '==', filterType )
//         }
//         else if(filterType === 'nonfiction'  ) 
//         {
//             ref = ref.where('genres', '==', 'nonfiction' )
//         }
//         else ref = ref.where('subGenres', '==', filterType )  
//       }

//       if (!filterType && searchType){
        
//       const length = searchType.match(/(\w+)/g).length;
      
//       const keywords = searchType.split(" ",length)
//       ref= ref.where('keywords','array-contains-any', keywords)
       
//       }
//       if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
      
//         ref
//         .get() 
//         .then(snapshot => {
//             const totalCount =snapshot.size;

//             const data = [
//                 ...persistProducts,
//                 ... snapshot.docs.map(doc => {
                 
                 
                    
//                       return{
//                         ...doc.data(),
//                         documentID:doc.id,
//                       }   
                                    
//                  })
//             ]; 

       
//             resolve({
//                 data,
//                 queryDoc: snapshot.docs[totalCount-1],
//                 isLastPage: totalCount < 6
//             });
//         })
//         .catch(err => {
//             reject(err);
//         })
      

//   })
// }







export const handleDeleteProduct = (documentID )=> {
  
    return new Promise((resolve, reject) => {
     
      firestore
        .collection('products')
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

  export const handleUpdateProductImage = (payload) => {
    const tempoID = payload.tempoID 
    const productImg = payload.productImg
    const imgname = uuidv4();
    return new Promise((resolve, reject) => {
     
      const uploadTask = storage.ref(`product-images/${imgname}-${productImg.name}`).put(productImg);
      
      
      uploadTask.on('state_changed' , snapshot => {
                  
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
    }, err => err
    ,() => {
      
      storage.ref(`product-images/${imgname}-${productImg.name}`).getDownloadURL().then(downloadURL => {
      firestore
        .collection('products')
        .doc(tempoID)
        .update({
          'productThumbnail' : downloadURL
        })
        .then(()=>{
          resolve();
        })
        .catch(err=>{
          reject(err);
        })
     

    })

})




    });
    
  }

  export const handleFetchProduct = (productID) => {
    return new Promise((resolve, reject) => {
      firestore
        .collection('products')
        .doc(productID)
        .get()
        .then(snapshot => {
  
          if (snapshot.exists) {
            resolve({
              ...snapshot.data(),
              documentID: productID
            });
          }
        })
        .catch(err => {
          reject(err);
        })
    })
  }
  