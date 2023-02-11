import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory } from './../../redux/Orders/orders.actions';
import { getSellerProducts } from '../../redux/SellerProducts/sellerproducts.actions';

import SellerProductsList from '../../components/SellerProductsList';
import OrderHistory from './../../components/OrderHistory';
import './styles.scss';

const mapState = ({ user, sellerProductsData }) => ({
  currentUser: user.currentUser,
  sellerProducts: sellerProductsData.sellerProducts.data,
 
});

const SellerProductSummary = props => {
  const dispatch = useDispatch();
  const { currentUser, sellerProducts } = useSelector(mapState);

  useEffect(() => {
    dispatch(
      getSellerProducts(currentUser.id)
    );

  }, []);

  return (
    <div>
        
      <h1>
        My Store
      </h1>

      <SellerProductsList sellerProducts={sellerProducts} />
    </div>
  );
};

export default SellerProductSummary;