import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './styles.scss';

import { selectCartItems , selectCartTotal, selectCartItemsCount, selectCartTotalHoldOn} from '../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

import Button from './../forms/Button';
import Item from './Item';

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total : selectCartTotal,
  totalItems:selectCartItemsCount,
  totalHoldOn: selectCartTotalHoldOn

  
});

const Checkout = ({ }) => {

  const history = useHistory();
  const { cartItems, total,totalItems, totalHoldOn} = useSelector(mapState);

  const errMsg = 'You have no items in your cart.';

  return (

      
    <div className="checkout">

      <div className="checkoutTitle">

      <h1>
    
        My Shopping Cart 
      </h1>
     </div>
   

      <div className="cart">

        {cartItems.length > 0 ? (

          <table border="0" cellPadding="0" cellSpacing="0">
            
            <tbody>
            
              <div className="totalCart">
                <tr >
                {totalItems} Item(s) In Your Cart
                </tr>
              </div>
              
              <tr>

                  <td>
                    <table border="0" cellSpacing="0" cellPadding="0">

                      <tbody>
                        {cartItems.map((item, pos) => {
                          return (
                            <tr key={pos}>
                              <td>
                                <Item {...item}/>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>

                    </table>
                  </td>

              </tr>

              <tr>

                  <td>
                    <table border="0" cellSpacing="0" cellPadding="0">
                      <tbody>

                        <tr>
                              <td>
                                <table border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>

                                    <tr>
                                          <td>
                                            <h3>
                                            Total security deposit ('Masiyaza'): <span className='pricesOnTheRight'>{totalHoldOn.toFixed(2)}  Br</span> 
                                            </h3>
                                          </td>
                                      </tr>
                                        
                                      <tr>
                                          <td>
                                            <h3>
                                            Total price ({totalItems} Items): <span className='pricesOnTheRight'>{total.toFixed(2)}  Br</span> 
                                            </h3>
                                          </td>
                                      </tr>

                                      <tr>
                                          <td>
                                            <h3>
                                            Subtotal ({totalItems} Items): <span className='pricesOnTheRight'>{(total+totalHoldOn).toFixed(2)}  Br</span>
                                            </h3>
                                          </td>
                                      </tr>

                                    </tbody>
                                </table>
                              </td>
                        </tr>

                        <tr>

                          <td>
                            <table border="0" cellPadding="10" cellSpacing="0">
                              <tbody>

                                <tr>

                                  <td>
                                    <Button onClick={() => history.goBack()}>
                                      Continue Shopping
                                    </Button>   
                                  </td>

                                  <td>
                                    <Button onClick ={()=>history.push('/payment')}>
                                      Proceed To Checkout
                                    </Button>
                                  </td>

                                </tr>

                              </tbody>
                            </table>
                          </td>

                        </tr>

                      </tbody>
                    </table>
                  </td>

              </tr>
            </tbody>
          </table>

        ) : (
            <p>
              {errMsg}
            </p>
          )}
          
      </div>
    </div>
  );
};

export default Checkout;