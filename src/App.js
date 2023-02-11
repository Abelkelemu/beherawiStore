import React, { useEffect} from 'react';
import { useDispatch} from 'react-redux';
import {Switch, Route} from 'react-router-dom'
import './default.scss';

//components 

import AdminToolbar from './components/AdminToolbar';

//actions

import { checkUserSession } from './redux/User/user.action';

//hoc

import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
import WithSellerAuth from './hoc/withSellerAuth';

//layouts

import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayoutAuth from './layouts/MainLayoutAuth';


//pages

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Order from './pages/Order';
import SearchResults from './pages/SearchResults';
import LoginWithPhoneNumber from './pages/LogInWithPhoneNumber';
import CustomerOrdersDashboard from './pages/CustomerOrdersDashboard';
import CustomerOrders from './pages/CustomerOrders';
import MySellerPlace from './pages/MySellerPlace';
import NewProduct from './pages/NewProduct';
import SearchNewProduct from './pages/SearchNewProduct';
import SellerProductSummary from './pages/SellerProductsSummary';
import SellerProductInfo from './pages/SellerProductsInfo';
import MyAdminPlace from './pages/MyAdminPlace';
import SellerProductInfoForBuyers from './pages/SellerProductInfoForBuyers';


const App = props => {

  const dispatch = useDispatch();

  useEffect (() => {    
    dispatch(checkUserSession());
  }, []); 
    
    return (
      <div className="App">
      
      
        <AdminToolbar/>

         <Switch>  

          <Route exact path="/" render={()=>(
            <MainLayout>
              <Homepage/>
            </MainLayout>      
          )}
          />
          
          <Route exact path="/search" render = {() =>(
            <MainLayout>
              <Search/>
            </MainLayout>
          )}
          />

          <Route exact path="/search/:filterType" render = {() =>(
            <MainLayout>
              <Search/>
            </MainLayout>
          )}
          /> 

          <Route exact path="/searchresults" render = {() =>(
              <MainLayout>
              <SearchResults/>
              </MainLayout>
          )}
          />

         <Route exact path="/searchresults/:searchType" render = {() =>(
            <MainLayout>
              <SearchResults/>
              </MainLayout>
          )}
          />

        <Route exact path ="/sellerProductInfoForBuyers/:productID" render = {() => (
               <MainLayout>
                  <SellerProductInfoForBuyers/>
               </MainLayout>
          )}
          />

      
        <Route exact path="/cart" render = {() =>(
            <MainLayout>
              <Cart/>
            </MainLayout>
          )}
          />

        <Route exact path = "/payment" render={() => (
            <WithAuth>
              <MainLayoutAuth>
                <Payment/>
              </MainLayoutAuth>
            </WithAuth>    
          )}
          />

        <Route exact path="/registration" render={()=>(
            <MainLayoutAuth>
              <Registration/>
            </MainLayoutAuth>
          )}
          />

        <Route exact path="/login" render={()=>  (
              <MainLayoutAuth>
                <Login/>
              </MainLayoutAuth>
          )}
          />

        <Route path="/loginWithPhoneNumber" render={()=>  (
              <MainLayoutAuth>
                <LoginWithPhoneNumber/>
              </MainLayoutAuth>
          )}
          />


        <Route path="/recovery" render = {()=>(
              <MainLayoutAuth>
                 <Recovery/> 
              </MainLayoutAuth>
          )}
          />

        <Route path="/dashboard" render = {()=>(
             <WithAuth>
                <DashboardLayout>
                  <Dashboard/> 
                </DashboardLayout>
              </WithAuth>
          )}
          />

        <Route path="/mySellerPlace" render = {()=>(
            <WithSellerAuth>
                <DashboardLayout>         
                  <MySellerPlace/>
                </DashboardLayout>
              </WithSellerAuth>
          )} 
          />

        <Route exact path="/product/:productID" render = {() =>(
             <WithSellerAuth>
                <DashboardLayout> 
                  <ProductDetails/>             
                </DashboardLayout>
              </WithSellerAuth> 
          )}
          />



         <Route exact path="/newProduct" render = {()=>(
            <WithSellerAuth>
                <DashboardLayout>
                  <NewProduct/>
                </DashboardLayout>
              </WithSellerAuth>
          )} />

         <Route path="/myStore" render = {()=>(
            <WithSellerAuth>
                <DashboardLayout>
                  <SellerProductSummary/>
                </DashboardLayout>
              </WithSellerAuth>
          )} />

          
         <Route exact path ="/sellerProductInfo/:productID" render = {() => (
            <WithSellerAuth>
               <DashboardLayout>
                  <SellerProductInfo/>
               </DashboardLayout>
            </WithSellerAuth>
          )}
          />

         <Route exact path="/searchNewProduct" render = {() =>(
            <WithSellerAuth>
            <DashboardLayout>
              <SearchNewProduct/>
            </DashboardLayout>
          </WithSellerAuth>
          )}
          />

         <Route path="/searchNewProduct/:searchType" render = {() =>(
            <WithSellerAuth>
            <DashboardLayout>
              <SearchNewProduct/>
            </DashboardLayout>
          </WithSellerAuth>
          )}
          /> 


         <Route path="/customerOrdersDashboard" render = {()=>(
           <WithAdminAuth>
                <AdminLayout>
                  <CustomerOrdersDashboard/> 
               </AdminLayout>
           </WithAdminAuth>
          )} />

          <Route exact path ="/order/:orderID" render = {() => (
            <WithAuth>
               <DashboardLayout>
                  <Order/>
               </DashboardLayout>
            </WithAuth>
          )}
          />

          <Route path ="/customerOrders/:orderID" render = {() => (
            <WithAdminAuth>
               <AdminLayout>
                  <CustomerOrders/>
              </AdminLayout>
            </WithAdminAuth>
          )}
          />
        <Route path="/myAdminPlace" render = {()=>(
            <WithAdminAuth>
              <AdminLayout>
                <MyAdminPlace/>
              </AdminLayout>
            </WithAdminAuth>
          )} />
          

          <Route path="/admin" render = {()=>(
            <WithAdminAuth>
              <AdminLayout>
                <Admin/> 
              </AdminLayout>
            </WithAdminAuth>
          )} />

         </Switch>
        
         

      </div>
      
    );
  }

export default App;
