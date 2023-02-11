import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { removeCartItem, addProduct, reduceCartItem , increaseDays, decreaseDays} from '../../../redux/Cart/cart.action';
const Item = (product) => {

  const dispatch = useDispatch();

  // const dd = String(today.getDate()).padStart(2, '0');
  // const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // const yyyy = today.getFullYear();
  const {
    productName,
    author,
    condition,
    productThumbnail,
    price,
    quantity,
    isbn10,
    isbn13,
    bookCover,
    provider,
    holdOn,
    sellOrRent,
    documentID,
    days,
  } = product;
   

  const handleRemoveCartItem = (documentID) => {
    dispatch(
      removeCartItem({
        documentID
      })
    );
  }

  const handleAddProduct = (product) => {
    dispatch(
      addProduct(product)
    )
  }

  const handleReduceItem = (product) => {
    dispatch(
      reduceCartItem(product)
    );
  }
  const handleIncreaseDays = (product) => {
    dispatch(
      increaseDays(product)
    );
  }

  const returnDate = (week) => {
    var myCurrentDate=new Date();
    var myFutureDate = new Date(myCurrentDate)
    myFutureDate.setDate(myFutureDate.getDate()+days)
    return moment(myFutureDate).format('ddd Do /MMM/YYYY') ;
  }

  const handleDecreaseDays = (product) => {
    dispatch(
      decreaseDays(product)
    );
  }

  return (

    <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>

          <td>
            <img src={productThumbnail} alt={productName} />
          </td>

          <td>
           
            <div className="productName">
              <tr>
                {productName&& productName.charAt(0).toUpperCase()+productName.slice(1)}
              </tr>
            </div>

            <div className="author">
              <tr>
                {author && 'by :'} {author&&  author.charAt(0).toUpperCase()+author.slice(1)}
              </tr>
            </div>

            <div className="condition">
              <tr>
                {bookCover && bookCover.charAt(0).toUpperCase()+bookCover.slice(1) } {bookCover && " | "} {condition&&  condition.charAt(0).toUpperCase()+condition.slice(1)}
              </tr>
            </div>
    
            <tr>
              {isbn10 && 'ISBN-10 : '} {isbn10&&  isbn10}
            </tr>

            <tr>
              {isbn13 && 'ISBN-13 : '} {isbn13&&  isbn13}
            </tr>

            <div className="delete">
              <tr  className="cartBtnDelete remove" onClick ={() => handleRemoveCartItem(documentID)}>
                Delete
              </tr>
            </div>
               
          </td>

          <td>

              <span> Quantity : &nbsp;&nbsp;&nbsp;      </span>
              <span className="cartBtn"
                  onClick = {() =>handleReduceItem(product)}
                >
                
                {`-`}
              
              </span>

                <span className="quantity">
                  {quantity}
                </span>

                <span className="cartBtn"
                  onClick = {() =>handleAddProduct(product)}
                >
                  {`+`}
        
              </span>

              
                
              {sellOrRent && sellOrRent == 'rent' && [
                <tr>

                  
                  <br />
                  <br />

                  <span> No of Days : </span>
                  <span className="cartBtn"
                    onClick = {() =>handleDecreaseDays(product)}
                  >
                  
                    {`-`}
              
                   </span>
    
                  <span className="quantity">
                     {days}
                  </span>
    
                  <span className="cartBtn"
                  onClick = {() =>handleIncreaseDays(product)}
                  >
                   {`+`}
                  </span>
                
                </tr>
               ]
              }

              {sellOrRent && sellOrRent == 'rent' && 
                <tr>
                  <br />
                  <span>
                    <br />
                    Return Date : {returnDate(days)}
                    
                  </span>
                </tr>
              }


          </td>

         

          <td>

          

            {sellOrRent && sellOrRent == 'rent' && [
               <div className="price">
               <tr>
                 Security deposit ('Masiyaza') 
               </tr>
             </div>,
               <tr>
               Each : {holdOn} Br
            </tr>,
   
            <div className="amount">
                <tr>
                  {quantity} item(s) : {quantity*holdOn} Br
                </tr>
            </div>,
           <br />
             ]
             }

          <div className="price">
              <tr>
                Price
              </tr>
            </div>
            
          {sellOrRent && sellOrRent == 'sell' && [
               
            <tr>
            Each : {price} Br
         </tr>,

         <div className="amount">
             <tr>
               Total : {quantity*price} Br
             </tr>
         </div>
          ]
          }

       {sellOrRent && sellOrRent == 'rent' && [
               
              <tr>
               Each : {price} Br / day
            </tr>,
   
            <div className="amount">
                <tr>
                {quantity} item(s) : {(quantity*price).toFixed(2)} Br / day
                </tr>
            </div>,
            <div className="price">
            <tr>
              <br />
            </tr>
            <tr>
            Total security deposit : {quantity*holdOn} Br
            </tr>
           
            <tr>
              
              Total Price : {(quantity*price*days).toFixed(2)} Br / {days} days
            </tr>

            <tr>
              
              Subtotal : {(quantity*price*days+quantity*holdOn).toFixed(2)} Br
            </tr>
        </div>
             ]
             }
            

           

          </td>
          
        </tr>
        
      </tbody>
    </table>
  );
}

export default Item;