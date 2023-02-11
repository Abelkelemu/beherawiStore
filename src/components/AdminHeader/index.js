import React, {useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import './styles.scss'


 

const AdminHeader = props => { 
    
    return(

        <div className="adminHeader">

            <div className="adminWrap">

                <div className="adminCallToActions">

                    <ul>
                        <li>
                            <Link to='/admin'>
                            Add A New Product Listing
                            </Link>
                        </li>

                        
                    </ul>

                </div>

            </div>

        </div>  
    );
 
};

export default AdminHeader;