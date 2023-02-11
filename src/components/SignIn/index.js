import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom'
import './styles.scss'

//actions
import { emailSignInStart, googleSignInStart} from '../../redux/User/user.action';

//components

import AuthWrapper from '../AuthWrapper';

// forms and buttons

import FormInput from '../forms/FormInput';
import Button from '../forms/Button';


const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const SignIn = props => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser} = useSelector(mapState)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(()=> {
        if(currentUser){
            resetForm();
            history.push('/');
        }
    }, [currentUser]);


    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({email, password}));        
    }

    const handleGoogleSignIn = () =>{
        dispatch(googleSignInStart());
    }

    const configAuthWrapper = {
           headline: 'Sign In'
    };

        return(
            
            <AuthWrapper {...configAuthWrapper}> 

                    <div className="formWrap">
                        
                        <form onSubmit= {handleSubmit}>

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

                            <div className="links">

                                <Link to = "/recovery">
                                    Forgot password?
                                </Link>

                            </div>

                               {/* <div className="notice">
                                   <p>By signing in, you agree to Beherawi's <Link>Privacy Policy</Link> and <Link>Terms of Use</Link> </p>
                               </div> */}
                                
                               <div className="loginButton">
                                    <Button type = "submit">
                                        LogIn
                                    </Button>
                                </div> 
                            

                            
                                
                              
                                <Link to ="/loginWithPhoneNumber">
                                <div className="signInWithPhone">  
                                  <Button>
                                      Sign in with Phone number
                                    </Button>
                                    </div>
                                </Link>
                             

                                <div className="signInWithGoogle">
                                    <Button onClick = {handleGoogleSignIn}>
                                      Sign in with Google
                                    </Button>
                                </div>
                                
                                <div className="notice">
                                   <p> New to Beherawi :  <Link to="/registration"> Create an account</Link>  </p>
                               </div>
                            



                        </form>
                        
                    </div>

            </AuthWrapper>
          );
}
    

export default SignIn;    