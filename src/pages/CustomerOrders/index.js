import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getOrderDetailsStart } from './../../redux/Orders/orders.actions';
import { useDispatch, useSelector } from 'react-redux';
import CustomerOrdersDetails from '../../components/CustomerOrdersDetails';
import Button  from '../../components/forms/Button'
import Modal from '../../components/Modal';
import './styles.scss'
import { updateDeliveryStatusStart } from './../../redux/Orders/orders.actions';

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
  delivered: ordersData.orderDetails.delivered
});

const CustomerOrders = () => {
const { orderID } = useParams(); 
const history = useHistory();
const dispatch = useDispatch();
const { orderDetails, delivered } = useSelector(mapState);
const { orderTotal, fullName,school,fullGrade, phone, country, city, paymentMethod} = orderDetails;
const [hideModal, setHideModal] = useState(true);

const toggleModal = () => {
  setHideModal(!hideModal);  
}

const configModal = {
  hideModal,
  toggleModal,
};

  useEffect(() => {

    dispatch(
      getOrderDetailsStart(orderID)
    );

  }, []);

  const handleSubmit = () => {
 
    dispatch(
      updateDeliveryStatusStart({
        orderID,
      history})  
        )
      
      
  }

  const configDelivered = {
    type: 'button'
 };

  return (
    <div className="customerOrders">
  <div className="deliveredModal">
  <Modal className="modal"{...configModal}>
     <p>Are you sure all products have been delivered to the customer?</p> 
     
     <div className="yesNo">
     <Button onClick ={ ()  =>handleSubmit()}>
        Yes
      </Button>
  
      
      <br />
      <Button onClick ={ ()  =>toggleModal()}>
        No
      </Button>

     </div>
    
   </Modal>
  </div>
  

      <h5>
        Order ID: #{orderID}
      </h5>

      <CustomerOrdersDetails order={orderDetails} />

      <h3>
        Subtotal: {orderTotal}
      </h3>

      <div className="shippingSummary">
          <h3>Shipping Summary</h3>
              <p>{fullName && 'Full Name : ' } {fullName && fullName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
              <p>{phone && 'Phone No :' } {phone && phone}</p>
              <p>{school && 'School :'} {school && school.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
              <p>{fullGrade && 'Grade : ' } {fullGrade && fullGrade}</p>
              <p>{paymentMethod && 'Payment Method : ' } {paymentMethod && paymentMethod.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
              <p>{country && 'Country : ' } {country && country.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
              <p>{city && 'City :'} {city && city.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
          
      </div>

       {!delivered && 
       (<Button {...configDelivered} onClick ={()  =>toggleModal() }>
       Delivered
     </Button>)}
       

    </div>
  )

}

export default CustomerOrders;