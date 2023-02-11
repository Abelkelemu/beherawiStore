import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddNewProduct from '../../components/AddNewProduct';
import { getUserOrderHistory } from './../../redux/Orders/orders.actions';
import OrderHistory from './../../components/OrderHistory';
import './styles.scss';


const NewProduct = props => {



return(
        <AddNewProduct/>
   
)


};

export default NewProduct;