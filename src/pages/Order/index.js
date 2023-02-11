import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetailsStart } from './../../redux/Orders/orders.actions';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from '../../components/OrderDetails';
import './styles.scss'
const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
  
});

const Order = () => {
const { orderID } = useParams(); 
const dispatch = useDispatch();
const { orderDetails } = useSelector(mapState);
const { orderTotal, fullName,school,fullGrade, phone, country, city, paymentMethod, securityDeposit} = orderDetails;

  useEffect(() => {

    dispatch(
      getOrderDetailsStart(orderID)
    );

  }, []);

  return (
    <div>

      <h3>
        Order ID: #{orderID}
      </h3>

      <OrderDetails order={orderDetails} />

      

      <div className="shipping">
          <h3>Shipping Summary</h3>
              <p>{fullName && 'Full Name : ' } {fullName && fullName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
              <p>{phone && 'Phone No :' } {phone && phone}</p>
              <p>{school && 'School :'} {school && school.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
              <p>{fullGrade && 'Grade : ' } {fullGrade && fullGrade}</p>
              <p>{paymentMethod && 'Payment Method : ' } {paymentMethod && paymentMethod.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
              <p>{country && 'Country : ' } {country && country.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
              <p>{city && 'City :'} {city && city.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
          
      </div>
      
      <h3>
        Total security deposit : <span className="priceOnTheRight">{securityDeposit &&  securityDeposit.toFixed(2)} Br</span> 
      </h3>

      <h3>
        Total price : <span className="priceOnTheRight">{(orderTotal && securityDeposit) && (orderTotal-securityDeposit).toFixed(2)} Br</span> 
      </h3>
     
      <h3>
        Subtotal : <span className="priceOnTheRight">{orderTotal && orderTotal.toFixed(2)} Br</span>
      </h3>

    </div>
  )

}

export default Order;