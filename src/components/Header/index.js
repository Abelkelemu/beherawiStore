import React, {useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import './styles.scss'


import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';


import { signOutUserStart } from '../../redux/User/user.action';


import Logo from './../../assets/logo.png'
import cart from './../../assets/cart.png'
import userImg from './../../assets/user.png'



const mapState = (state) => ({
    currentUser : state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
 });
 

const Header = props => {


    const dispatch = useDispatch();
    const {currentUser,totalNumCartItems} = useSelector(mapState);
    const [clicked, setClicked] = useState(false); 

    const signOut = () => {
        dispatch(signOutUserStart());
        
    };

    const signOutMenu = () => {
        dispatch(signOutUserStart());
        setClicked(!clicked)
    };

    const handleClick = () => {
        setClicked(!clicked)
    } 

    return(

        <header className = "header">

            <div className="wrap">
            
             {clicked && ( <div className="modalOverlay" onClick={() => {handleClick()}} />)}
            
                  <div className="menu-icon" onClick={()=>{handleClick()}}>
                  
                        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                  </div>
            
                  <ul className = {clicked ? 'nav-menu active' : 'nav-menu'}>
                     
                    {!currentUser && (
                            <li >
                            <Link to="/login" onClick={()=>handleClick()}>
                             <span> <img src={userImg}/> </span> <span> <Link to="/login" onClick={()=>handleClick()}> Welcome, Sign in  </Link> </span>  
                            </Link>
                           </li>
                    )}

                    {currentUser && (
                            <li>
                           
                             <span> <img src={userImg}/> </span> <span> Hello, </span> <span> {currentUser.displayName && (currentUser.displayName.split(" ")[0])[0].toUpperCase()+ (currentUser.displayName.split(" ")[0]).substring(1)} </span> 
                             
                           </li>
                    )}        
                     

                     <li>
                       <Link to="/" >
                          Beherawi.com
                       </Link> 
                     </li>

                     <li>
                       <Link to="/dashboard">
                         My Orders
                       </Link> 
                     </li>

                     <li>
                       <Link to="/cart">
                         My Shopping Cart
                       </Link> 
                     </li>

                     {/* <li>
                       <Link>
                         Cancel Orders
                       </Link> 
                     </li> */}

                    {!currentUser && 
                      <li>
                        <div className="signUp" >
                          <Link to="/registration">
                            Sign Up
                          </Link>
                        
                        </div>
                      </li>
                    }

                    {currentUser && 
                          <li>
                            <div className="signOut" onClick={() => signOutMenu()}>
                            Sign Out
                            </div>
                          </li>
                    }


                  </ul>

                  <div className="logo">
                      <Link to="/">
                      <img src = {Logo} alt= "Abel LOGO"/>
                      </Link>

                  </div>

              

                  <div className="callToActions">

                    <ul>
                      
                        <li>
                            <div >
                            <Link to="/cart">
                            <img src = {cart} alt= "cart"/>  <span className="desktop">Cart</span> <span className ="totalCart"> {totalNumCartItems}</span> 
                            </Link>
                            </div>   
                        </li>


                    
            
                        {currentUser && [
                              
                              <li>
                
                              <Link to="/dashboard">
                                  Orders
                              </Link>   
                          
                             </li>,

                             <li>
                                <span onClick={() => signOut()} className="desktop">
                                    LogOut
                                </span>
                            </li>
                            
                        ]}

                        {!currentUser && [
                        

                            <li>
                                <Link to="/registration" className="desktop">
                                    SignUp
                                </Link>   
                            </li>,

                            <li>
                                <Link to="/login">
                                    Login
                                </Link>   
                            </li>

                        
                        ]}            

                    </ul>                 
                  </div>
            </div>

        </header>        
    );
 
};

Header.defaultProps ={
    currentUser:null
 };

export default Header;