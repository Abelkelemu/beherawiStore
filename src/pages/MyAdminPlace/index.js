import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerNewOrdersHistory } from '../../redux/Orders/orders.actions';
import CustomerOrdersHistory from '../../components/CustomerOrdersHistory';
import OrderHistory from '../../components/OrderHistory';



const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data
});

const MyAdminPlace = props => {

        const dispatch = useDispatch();
        const { currentUser, orderHistory } = useSelector(mapState);
      
        useEffect(() => {
          dispatch(
            getCustomerNewOrdersHistory(currentUser.id)
          );
      
        }, [OrderHistory]);
      
        return (
          <div>
            <h1>
              New Orders
            </h1>
      
            <CustomerOrdersHistory orders={orderHistory} />
          </div>
        );


};

export default MyAdminPlace;