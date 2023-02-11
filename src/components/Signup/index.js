import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link,useHistory} from 'react-router-dom'
import './styles.scss'

//action
import { signUpUserStart} from '../../redux/User/user.action';

//components

import AuthWrapper from '../AuthWrapper';

// forms and buttons
import FormInput from '../forms/FormInput';
import Button from './../forms/Button'


const mapState = ({user}) => ({
    currentUser: user.currentUser,
    userErr : user.userErr
});

const Signup = props => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser, userErr} = useSelector(mapState)
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (currentUser){
          reset();
          history.push('/');
        }

    }, [currentUser]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }

    }, [userErr]);
  
    
    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }


    const handleFormSubmit =  event =>{
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }));
    }


    const configAuthWrapper = {
        headline: 'Create Beherawi account'
    };

        return(

            <AuthWrapper {...configAuthWrapper}>

                    <div className="formWrap">

                        {errors.length > 0 && (
                            <ul>
                            {errors.map((err,index) => {
                                return(
                                    <li key={index}>
                                      {err}
                                    </li>
                                )  
                            })} 
                            </ul>
                        )}


                        <form onSubmit={handleFormSubmit}>

                            <FormInput
                            type = "text"
                            name= "displayName"
                            value = {displayName}
                            placeholder = "First name + Father's name"
                            handleChange= {e => setDisplayName(e.target.value)}
                            />

                            <FormInput
                            type = "email"
                            name= "email"
                            value = {email}
                            placeholder = "Email"
                            handleChange= {e => setEmail(e.target.value)}
                            />

                            <FormInput
                            type = "password"
                            name= "password"
                            value = {password}
                            placeholder = "Password"
                            handleChange= {e => setPassword(e.target.value)}
                            />

                            <FormInput
                            type = "password"
                            name= "confirmPassword"
                            value = {confirmPassword}
                            placeholder = "Re-enter password"
                            handleChange= {e => setConfirmPassword(e.target.value)}
                            />

                            <Button type="submit">
                                SignUp
                            </Button>

                            {/* <div className="notice">
                                   <p>By creating an account, you agree to Beherawi's <Link>Privacy Policy</Link> and <Link>Terms of Use</Link> </p>
                            </div> */}

                            <div className="notice">
                                   <p>Already have an account?  <Link to="login">Sign in</Link> </p>
                            </div>

                        </form>
                        
                    </div>

            </AuthWrapper>
        );
    }

export default Signup;