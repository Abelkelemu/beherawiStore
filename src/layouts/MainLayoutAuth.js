import React from 'react';


// components

import Header from './../components/Header';
import Footer from '../components/Footer';





const MainLayoutAuth = props => {
  return (
    <div>
      <Header {...props} />
      <div className="main">
          {props.children}
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayoutAuth;