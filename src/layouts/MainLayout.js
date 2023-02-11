import React from 'react';


// components

import Header from './../components/Header';
import Footer from '../components/Footer';
import HeaderSecond from '../components/HeaderSecond';
import HeaderThird from '../components/HeaderThird';




const MainLayout = props => {
  return (
    <div>
      <Header {...props} />
      <HeaderSecond {...props}/>
      <HeaderThird {...props}/>
      <div className="main">
          {props.children}
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;