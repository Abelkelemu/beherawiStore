import React, {useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import './styles.scss'


 

const SellerHeader = props => {


    
    return(

         <div className="sellerHeader">

       <div className="sellerWrap">

         < div className="sellerCallToActions">

             <ul>
                 <li>
                     <Link to='/newProduct'>
                     Add A New Product
                     </Link>
                   
                 </li>

                 <li>
                     <Link to='/myStore'>
                     My Store
                     </Link>
                 </li>
             </ul>

         </div>

       </div>

    </div>  
    );
 
};



export default SellerHeader;