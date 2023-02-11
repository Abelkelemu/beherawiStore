import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { getUserOrderHistory } from './../../redux/Orders/orders.actions';
import { getCustomerrOrdersHistory } from '../../redux/Orders/orders.actions';
import CustomerOrdersHistory from '../../components/CustomerOrdersHistory';
import './styles.scss';

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data
});

const CustomerOrdersDashboard = props => {
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);

  useEffect(() => {
    dispatch(
      getCustomerrOrdersHistory(currentUser.id)
    );

  }, []);

  return (
    <div>
      <h1>
       Delivered Orders
      </h1>

      <CustomerOrdersHistory orders={orderHistory} />
    </div>
  );
};

export default CustomerOrdersDashboard;