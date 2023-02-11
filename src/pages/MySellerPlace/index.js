import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MySellerArea from '../../components/MySellerArea';
import { getUserOrderHistory } from './../../redux/Orders/orders.actions';
import OrderHistory from './../../components/OrderHistory';
import './styles.scss';


const MySellerPlace = props => {



return(
        <MySellerArea/>
   
)


};

export default MySellerPlace;