import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import './styles.scss';

import {checkUserIsAdmin} from './../../Utils'
import { checkUserIsSeller } from './../../Utils';


const mapState = ( {user}) => ({
    currentUser: user.currentUser
});

const AdminToolbar = props => {

    const {currentUser}= useSelector(mapState)
    const isAdmin = checkUserIsAdmin(currentUser);
    const isSeller = checkUserIsSeller(currentUser)

    if(!isAdmin && !isSeller) return null;

    return (

        <div className="adminToolbar">
           
           <div className="wrap">

            <ul>

                {isAdmin && (
                    <li>
                      <Link to="/myAdminPlace">
                         My Admin Area
                      </Link> 
                    </li>
                 )}
               
                {isSeller && (
                    <li>
                    <Link to="/mySellerPlace">
                       My Seller Area
                    </Link> 
                 </li>
                )}
                
            </ul>
            
            </div>

        </div>

    );
}

export default AdminToolbar