import React from 'react'
import { Link } from 'react-router-dom'
import sellerHeader from '../SellerHeader'
import './styles.scss'


const MySellerArea = props => {

    return(

      <div className='mySellerArea'>
          <h1>Welcome to Beherawi.com </h1>
          <p>Sell and Rent on <Link to="/">Beherawi.com</Link></p>


          <div className="sellerAreaLinks">
            <p>To add a new product from Beherawi's catalog, click here <Link className="link" to="/newProduct">Add a new product.</Link></p>
          </div>
      </div>

      
  
    )
}

export default MySellerArea