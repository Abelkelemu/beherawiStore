import React, {useState} from 'react'
import { useHistory, useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.scss'



import FormInput from '../forms/FormInput';
// selectors 

import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';

//action 

import { signOutUserStart } from '../../redux/User/user.action';

//image

import Logo from './../../assets/logo.png'
import cart from './../../assets/cart.png'




 

const HeaderSecond = props => {

    const [nextSearch, setSearch] = useState('');
    const history = useHistory();
    const handleFilter = (e) => {
         e.preventDefault();
         history.push(`/searchresults/${nextSearch}`)
        
    };



   

    return(

        <header className = "wrapper">
            

            <div className="container">
         

            

              

                < div className="searchWrap">
             

                    
                    
                        

                

                        

                      
                        <div className="searchBox">


                            <form onSubmit={handleFilter}>

                            {/* <Link to="/searchresults">
                                ALL 
                            </Link> */}
                            
                             <input
                                 className = "input"
                                 label=""
                                 placeholder = "Title of the book"
                                 type="text"
                                 value={nextSearch}
                                 onChange={e => setSearch(e.target.value.toLowerCase())}
                                 /> 

                            <div className="searchBtn" >

                            
                                <button type='submit' className="fas fa-search" ></button> 
                            
                            </div>
                            

                          </form>  
                        </div>

                
                                    
              </div>
            </div>

        </header>        
    );
 
};



export default HeaderSecond;