import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import './styles.scss';

// forms and  buttons
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import FormSelect from '../forms/FormSelect';

//actions
 import Item from '../Checkout/Item';
import { saveOrderHistory } from './../../redux/Orders/orders.actions';

//selectors

import { selectCartTotal, selectCartItemsCount, selectCartItems, selectCartTotalHoldOn } from './../../redux/Cart/cart.selectors';


const initialAddressState = {
  country: 'ethiopia',
  city: 'addis ababa',
  schoolName: 'saint joseph school',
  grade: 9,
  section: 'a',
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
  totalHoldOn: selectCartTotalHoldOn
});

const PaymentDetails = () => {


const history = useHistory();
const dispatch = useDispatch();
const { total, itemCount, cartItems, totalHoldOn } = useSelector(mapState);
const [shippingAddress, setShippingAddress] = useState({...initialAddressState });
const [firstName, setFirstName] = useState('');
const [middleName, setMiddleName]= useState('');
const [phone, setPhone]= useState();
const [paymentMethod, setPaymentMethod]= useState('in person')



 const fullName = firstName +" "+ middleName;
 const fullGrade = shippingAddress.grade+" "+ (shippingAddress.section).charAt(0).toUpperCase()+(shippingAddress.section).slice(1)
 const school = shippingAddress.schoolName;


  useEffect(() => {
    if (itemCount < 1) {
      history.push('/dashboard');
    }

  }, [itemCount]);


  const handleShipping = evt => {

    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    });
  };



  const handleFormSubmit = async evt => {
    evt.preventDefault();
    
    if(
        !shippingAddress.country || !shippingAddress.city ||
        !shippingAddress.schoolName || !shippingAddress.grade ||
        !shippingAddress.section || !firstName || !middleName ||
        !phone || !paymentMethod
    ){
        return;
    }
    
      const configOrder = {
      orderTotal: total+totalHoldOn,
      securityDeposit: totalHoldOn,
      fullName,
      fullGrade,
      school,
      phone,
      paymentMethod,
      country:shippingAddress.country,
      city:shippingAddress.city,
      orderItems: cartItems.map(item => {
        const { documentID, productThumbnail, productName,
          price, quantity, provider, sellOrRent } = item;
         
        return {
          documentID,
          productThumbnail,
          productName,
          price,
          quantity,
          provider,
          sellOrRent,
        };
      })
    }      
    
    dispatch(
      saveOrderHistory(configOrder)
    )

  };

  return (
    <div className="paymentDetails">

      <form onSubmit= {handleFormSubmit} >

        <div className="group">

          <h2>
            1.Shipping Address
          </h2>

            <FormSelect
              required
              label="Country"
              name="country"
              options={[{
                value: "ethiopia",
                name: "Ethiopia"
              }]}
              handleChange ={evt => handleShipping(evt)} 
            />

          <FormSelect
              label="City"
              name="city"
              options={[{
                value: "addis ababa",
                name: "Addis Ababa"
              }]}
              handleChange ={evt => handleShipping(evt)} 
            />


          <FormSelect
              label="Name Of Your School"
              name="schoolName"
              options={[{
                value: "saint joseph school",
                name: "Saint Joseph School"
              }]}
              handleChange ={evt => handleShipping(evt)}        
            />


          <FormInput
            required
            label="First Name"
            name="firstName"
            placeholder = "First name"
            type= "text"
            value= {firstName}
            handleChange = {evt => setFirstName(evt.target.value)}
          />

          <FormInput
            required
            label = "Father's Name"
            name ="middleName"
            placeholder = "Father's name"
            type= "text"
            value= {middleName}
            handleChange = {evt => setMiddleName(evt.target.value)}
          />


          <FormSelect
              label="Grade"
              name = "grade"
              options={[
              {
                value: 9,
                name: "Grade 9"
              },{
                value: 10,
                name: "Grade 10"  
              },{
                value: 11,
                name: "Grade 11"  
              },{
                value: 12,
                name: "Grade 12"  
              }
            ]}
              handleChange ={evt => handleShipping(evt)}
            />


          <FormSelect
              label="Section"
              name = "section"
              options={[
              {
                value: "a",
                name: "A"
              },{
                value: "b",
                name: "B" 
              },{
                value: "c",
                name: "C" 
              },{
                value: "d",
                name: "D" 
              },{
                value: "e",
                name: "E" 
              },{
                value: "f",
                name: "F" 
              }
            ]}
              handleChange ={evt => handleShipping(evt)}
            />

          <FormInput
            required
            label = "Phone Number"
            name = "phone"
            placeholder = "Example : 0946725729"
            type= "number"
            value= {phone}
            handleChange = {evt => setPhone(evt.target.value)}
          />
          

        </div>


        <div className="group">

          <h2>
            2. Payment method
          </h2>

          <div className="paymentradio">

            <label>
            <input
                type="radio" 
                value={paymentMethod} 
                name="paymentMethod"
                checked = {true}
                handleChange = {evt => setPaymentMethod(evt.target.value)}
                 />
                In person-cash (Eje be Eje)
            </label>
             

           </div>


        </div>


        <div className="group">
          <h2>
            3. Item and shipping summary
          </h2>

          <h3>Shipping Summary</h3>

          <div className="shippingSummary">
           
           {(firstName && middleName && phone) && [
              <p>Full Name :  {fullName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>, 
              <p>Phone No : {phone}</p>,
              <p>School : {(shippingAddress.schoolName).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>, 
               <p>Grade : {fullGrade}</p>,
              <p>Country : {(shippingAddress.country).charAt(0).toUpperCase()+(shippingAddress.country).slice(1)}</p>,
              <p>City : {(shippingAddress.city).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>,
           ]}

           {(!firstName || !middleName || !phone) &&
                'No Shipping Address Added'          
           }
            
          </div>


          <h3>Item Summary</h3> 

          <div className="itemSummary">
            <div className="wrap">

            {cartItems.map((item, pos) => {
              const {productName} = item
                        return (
                        <div className="itemsList">
                             <tr key={pos}>
                            <td>
                              <Item {...item}/>
                            </td>
                           </tr>
                        </div>
                         
                        );
                      })}

            </div>
            
            </div>
              <div className="amountSummary">
                <h3>{itemCount} Item(s)</h3>
                <h3>Free Beherawi Delivery : <span className='priceOnTheRight'> 0.00 Br</span></h3>
                <h3>Total security deposit : <span className='priceOnTheRight'>{totalHoldOn.toFixed(2)} Br</span></h3>
                <h3>Total price : <span className='priceOnTheRight'>{total.toFixed(2)} Br</span></h3>
                <h3>Subtotal :  <span className='priceOnTheRight'>{(totalHoldOn+total).toFixed(2)} Br</span></h3>
              </div>
             
          

       
        </div>


      <Button type = "submit">
         Place your order
      </Button>
      </form>
    </div>
  );
}

export default PaymentDetails;