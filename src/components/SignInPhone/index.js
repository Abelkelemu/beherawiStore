import React, { useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import './styles.scss'

// firebase config utils
import { configureCaptcha } from '../../firebase/utils';

//actions
import { signInSuccess } from '../../redux/User/user.action';

//sagas
import { getSnapshotFromUserAuth } from '../../redux/User/user.sagas';




//components
import Modal from '../Modal';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';






const SignInWithPhoneNumber = props => {
 
    const history = useHistory();
    
    const [hideModal, setHideModal] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [err,setErr] = useState('');
    const [logInBtn, setLogInBtn ] = useState('LogIn')


  


    const resetForm = () => {
        setPhoneNumber('');
    };

    const toggleModal = () => setHideModal(!hideModal);
   
    const configModal = {
        hideModal,
        toggleModal,
      };


      const resetFormModal = () =>{
        setHideModal(true);
      }
      
    

    const onSignInSubmit = e => {

        e.preventDefault();
        setErr('')
        setLogInBtn("Loading...");
        configureCaptcha(onSignInSubmit)
        
        const mobile = "+251" + phoneNumber.slice(1)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(mobile, appVerifier)
            .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            }).then(()=>{
                setErr('')
                toggleModal();
                setLogInBtn('LogIn')
                setPhoneNumber('')
                
            })
            .catch((error) => {
               setErr(error)
               setLogInBtn('LogIn')
               setPhoneNumber('')
            
            });  
                
    }

    const handleSubmit = e => {
        
        e.preventDefault();


        const code = otp
        window.confirmationResult.confirm(code).then((result) => {
        // const user =result.user;
        //console.log(user)
       //getSnapshotFromUserAuth(user);
       // signInSuccess(user)
    }).then(()=>{
        resetFormModal();
       history.push('/')
      window.location.reload();
    })
    .catch((error) => {
        setErr('Please enter the correct verification code')
    });
          
             
    }

    const configAuthWrapper = {
           headline: 'LogIn'
    };

    

        return(
            
            <AuthWrapper {...configAuthWrapper}> 

                    <div className="formWrap">

                        <div>
                            {err && err}
                        </div>

                        Enter your phone number
                        
                        <form onSubmit= {onSignInSubmit}>

                            <div id="sign-in-button"></div>
                            <FormInput
                              type = "number"
                              name= "phoneNumber"
                              value = {phoneNumber}
                              required
                              placeholder = "Example 0911555555"
                              handleChange= {e => setPhoneNumber(e.target.value)}
                            />


                            <Button type = "submit">
                                {logInBtn}
                            </Button>


                        </form>
                        
                    </div>

                    
                    <Modal {...configModal}>
                            
                        <div className="formWrap">

                            <h1>Verification</h1>
                            <br />

                            <div>
                              {err && err}
                            </div>


                            A code has been sent to your phone number.
                            Please, enter the code below.
                            <br />
                            <br />
                        
                            <form onSubmit = {handleSubmit} >
                            
                                    <FormInput
                                    type = "number"
                                    name= "otp"
                                    value = {otp}
                                    required
                                    placeholder = "Enter the verification number"
                                    handleChange= {e => setOtp(e.target.value)}
                                    />
                                    <br/><br />     


                                    <Button type='submit'>
                                        Submit
                                    </Button>
                                    
                            </form>
                        </div>
                    </Modal>

            </AuthWrapper>
          );
}
    

export default SignInWithPhoneNumber;   