import React, { useState } from 'react';
import './styles.scss';

const Modal2 = ({ hideModal2, toggleModal2, resetProductImg,children }) => {
  if (hideModal2) return null;

  return [
    <div className="modalOverlay"  onClick={()=> { resetProductImg(); toggleModal2()}} />,
    <div className="modalWrap">
      <div className="modal">
        {children}
      </div>
    </div>
  ];
}

export default Modal2;