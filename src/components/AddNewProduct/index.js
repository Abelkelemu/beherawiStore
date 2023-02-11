import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

import SearchBarAddNewProduct from '../SearchBarAddNewProduct'



const AddNewProduct = props => {

    return(
   
     <div className="addNewProduct">
      
       <h1>Add a new Product</h1>
       <p>First search in Beherawi's catalog</p>
       
       <div className="search-bar">  
          <SearchBarAddNewProduct/>
       </div>

       {/* <p>If you have not found the product in Beherawi's catalog, please: <Link>Create a new product Listing</Link></p> */}
        
     </div>

    
    )
}

export default AddNewProduct