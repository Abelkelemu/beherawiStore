import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { checkUserIsAdmin } from '../Utils';

//action

import { signOutUserStart } from '../redux/User/user.action';

// components

import Header from './../components/Header';
import VerticalNav from './../components/VerticalNav';
import Footer from './../components/Footer';
import AdminHeader from '../components/AdminHeader';


const mapState = ( {user}) => ({
  currentUser: user.currentUser
});


const AdminLayout = props => {

  const dispatch = useDispatch();
  const {currentUser}= useSelector(mapState)
  const isAdmin = checkUserIsAdmin(currentUser)

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (

    <div className="adminLayout">

      <Header {...props} />

      <div className="controlPanel">

        <div className="sidebar">

          <VerticalNav>

            <ul>

           

              <li>
                <Link to="/admin">
                  Home
                </Link>
              </li>

             
              {/* <li>
                <Link to="/">
                  Messages
                </Link>
              </li> */}

              {/* <li>
                <Link to="/">
                  New sellers requests
                </Link>
              </li> */}

              <li>
                <Link to="/myAdminPlace">
                  New Orders
                </Link>
              </li>

              <li>
                <Link to="/customerOrdersDashboard">
                  Delivered Orders
                </Link>
              </li>

              {/* <li>
                <Link to="/">
                  Available Seller Products
                </Link>
              </li> */}

              {/* <li>
                <Link to="/">
                  New product listing requests
                </Link>
              </li> */}

              {/* <li>
                <Link to="/">
                  Products in stock
                </Link>
              </li> */}

              {/* <li>
                <Link to="/">
                  All Users
                </Link>
              </li> */}

              {/* <li>
                <Link to="/">
                  All Sellers
                </Link>
              </li> */}

              {/* <li>
                <Link to="/">
                  All Admins
                </Link>
              </li> */}

              

              <li>
                <Link to="/admin">
                  All Listed Products 
                </Link>
              </li>

           
              {/* <li>
                <Link to="/">
                   Edit Profile
                </Link>
              </li> */}

              <li>
                <span className="signOut" onClick={() => signOut()}>
                  Sign Out
                </span>
              </li>

              

            </ul>

          </VerticalNav>

        </div>

        <div className="content">
        {isAdmin && <AdminHeader/>}
          {props.children}
        </div>

      </div>

      <Footer />
      
    </div>
  );
};

export default AdminLayout;