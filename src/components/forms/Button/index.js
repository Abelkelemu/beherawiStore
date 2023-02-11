import React from 'react'
import './styles.scss'

const Button = ({children, disabled, ...otherProps}) => {
    return(
        <button className="btn" {...otherProps} disabled= {disabled}>
            {children}
        </button>
    );
}

export default Button