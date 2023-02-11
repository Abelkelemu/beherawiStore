import React from 'react';

// components

import Header from './../components/Header';
import HeaderSecond from '../components/HeaderSecond';
import Footer from '../components/Footer';
import HeaderThird from '../components/HeaderThird';


const HomepageLayout = props => {
  return (
    <div className="fullHeight">
      <Header {...props} />
      <HeaderSecond {...props}/>
      <HeaderThird {...props}/>
          {props.children}
      <Footer/>
    </div>
  );
};

export default HomepageLayout;