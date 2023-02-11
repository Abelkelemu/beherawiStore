import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserIsSeller } from '../Utils';



// actions
import { signOutUserStart } from '../redux/User/user.action';


// comonents
import Header from './../components/Header';
import VerticalNav from './../components/VerticalNav';
import Footer from './../components/Footer';
import SellerHeader from '../components/SellerHeader';
import AdminHeader from '../components/AdminHeader';
import HeaderSecond from '../components/HeaderSecond';

const mapState = ( {user}) => ({
  currentUser: user.currentUser
});

const DashBoardLayout = props => {
  const dispatch = useDispatch();
  const {currentUser}= useSelector(mapState)

    const isSeller = checkUserIsSeller(currentUser);
   

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="dashboardLayout">

      <Header {...props} />
      

      <div className="controlPanel">

        <div className="sidebar">

          <VerticalNav>
            <ul>

              <li>
                <Link to="/">
                  Home
                </Link>
              </li>

              {/* <li>
                <Link to="/dashboard">
                  Order History
                </Link>
              </li> */}

              {/* <li>
                <Link to="/">
                  Request A Product
                </Link>
              </li>

              <li>
                <Link to="/mySellerPlace">
                  My Seller Area
                </Link>
              </li>


              <li>
                <Link to="/">
                   Edit Profile
                </Link>
              </li>

              <li>
                <Link to="/">
                   Contact Us
                </Link>
              </li> */}
             

              {/* <li>
                <span className="signOut" onClick={() => signOut()}>
                  Sign Out
                </span>
              </li> */}

             


            </ul>
          </VerticalNav>
        </div>

        <div className="content">
          {isSeller && <SellerHeader/>}

          {props.children}
        </div>
      </div>

      
      
      <Footer />
    </div>
  );
};

export default DashBoardLayout;