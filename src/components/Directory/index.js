import React from 'react'
import {useDispatch} from 'react-redux'
import { useHistory, useParams,Link} from 'react-router-dom';
import './styles.scss'

import cart from './../../assets/cart.png';
import SignInWithPhoneNumber from '../SignInPhone'
//components

import FilterSelect from '../forms/FilterSelect';
import user from '../../assets/user.png'
import fiction from '../../assets/fiction.png';
import Button from '../forms/Button'

const Directory = ({}) => {

    const history = useHistory();
    const {filterType} = useParams();

    return( 
       
        <div className="directory">

                <div className="slogan">
                    Your Choice is Our Choice!
                </div>
             {/* <div className="directorySignIn">
             <SignInWithPhoneNumber/>
             </div> */}
                
             

            <div className="wrap">

                <div className="directoryPreview" onClick={() => history.push('/search/ethiopian government textbooks for students')}>
                    <div className="title">
                        <p>Back-to-school Textbooks</p>
                    </div>
                    <div className="thumb">
                        <img src={fiction} /> 
                    </div>
                    <div className="description">
                        <p>Buy or Rent for a good price!</p>
                        <p>Free Beherawi Delivery</p>  
                    </div>     
                </div>

                <div className="directoryPreview" onClick={() => history.push('/search/action and adventure')}>
                    <div className="title">
                        <p>Standardized Test Books</p>
                    </div>
                    <div className="thumb">
                        <img src={fiction} /> 
                    </div>
                    <div className="description">
                        <p>Buy or Rent for a good price!</p>
                        <p>Free Beherawi Delivery</p>  
                    </div>     
                </div>


                <div className="directoryPreview" onClick={() => history.push('/search/action and adventure')}>
                    <div className="title">
                        <p>English Books</p>
                    </div>
                    <div className="thumb">
                        <img src={fiction} /> 
                    </div>
                    <div className="description">
                        <p>Buy or Rent for a good price!</p>
                        <p>Free Beherawi Delivery</p>  
                    </div>     
                </div>
                

                <div className="directoryPreview" onClick={() => history.push('/search/action and adventure')}>
                    <div className="title">
                        <p>Amharic Books</p>
                    </div>
                    <div className="thumb">
                        <img src={fiction} /> 
                    </div>
                    <div className="description">
                        <p>Buy or Rent for a good price!</p>
                        <p>Free Beherawi Delivery</p>  
                    </div>     
                </div>

                <div className="directoryPreview" onClick={() => history.push('/search/action and adventure')}>
                    <div className="title">
                        <p>Action and Adventure</p>
                    </div>
                    <div className="thumb">
                        <img src={fiction} /> 
                    </div>
                    <div className="description">
                        <p>Buy or Rent for a good price!</p>
                        <p>Free Beherawi Delivery</p>  
                    </div>     
                </div>

                <div className="directoryPreview" onClick={() => history.push('/search/action and adventure')}>
                    <div className="title">
                        <p>Business</p>
                    </div>
                    <div className="thumb">
                        <img src={fiction} /> 
                    </div>
                    <div className="description">
                        <p>Buy or Rent for a good price!</p>
                        <p>Free Beherawi Delivery</p>  
                    </div>     
                </div>


                <div className="directoryPreview" onClick={() => history.push('/search/action and adventure')}>
                    <div className="title">
                        <p>Romance</p>
                    </div>
                    <div className="thumb">
                        <img src={fiction} /> 
                    </div>
                    <div className="description">
                        <p>Buy or Rent for a good price!</p>
                        <p>Free Beherawi Delivery</p>  
                    </div>     
                </div>

                <div className="directoryPreview" onClick={() => history.push('/search/action and adventure')}>
                    <div className="title">
                        <p>Programming</p>
                    </div>
                    <div className="thumb">
                        <img src={fiction} /> 
                    </div>
                    <div className="description">
                        <p>Buy or Rent for a good price!</p>
                        <p>Free Beherawi Delivery</p>  
                    </div>     
                </div>

            </div>

            <div className="slogan">
                    Thanks for choosing us!
            </div>
        </div>
    )
}

export default Directory