import {takeLatest, call, all,put} from 'redux-saga/effects'

//actions
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError } from './user.action';

//local functions

import { auth, handleUserProfile, getCurrentUser, GoogleProvider} from '../../firebase/utils';
import { handleResetPasswordAPI } from './user.helpers';

// scripts
import userTypes from "./user.types";

export function* getSnapshotFromUserAuth(user, additionalData = {}){
    try{    
        const userRef = yield call(handleUserProfile, { userAuth : user , additionalData});
        const snapshot = yield userRef.get();
        yield put(
        signInSuccess({
            id: snapshot.id,
            ...snapshot.data()
        })
        );
        
    }catch(err) {
        //console.log(err);
    }
}

export function* emailSignIn ({payload: {email,password} }) {
    try{
      
    const {user} =  yield auth.signInWithEmailAndPassword(email,password);
    yield getSnapshotFromUserAuth(user); 

          } catch (err){
              //console.log(err);
          }
}

export function* onEmailSignInStart(){
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
    try {
      const userAuth = yield getCurrentUser();
      if (!userAuth) return;
      yield getSnapshotFromUserAuth(userAuth);
  
    } catch (err) {
      // console.log(err);
    }
  } 

export function* onCheckUserSession (){
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser(){
    try{
        yield auth.signOut();
        yield put(
            signOutUserSuccess()  
        )
    } catch(err){
        //console.log(err)
    }
}


export function*  onSignOutUserStart(){
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}


export function* signUpUser ({payload:{
    displayName,
    email,
    password,
    confirmPassword
}}) {

    if(password !== confirmPassword){
        const err = ['Passwords don\'t match'];
        yield put(
            userError(err)
        );
        return;
    }
  
    try{
  
        const {user} = yield auth.createUserWithEmailAndPassword(email,password);
        const additionalData = {displayName};
        yield getSnapshotFromUserAuth(user, additionalData )
;
  
    } catch(err){
        console.log(err);
    }
}

export function* onSignUpUserStart (){
    yield takeLatest  (userTypes.SIGN_UP_USER_START, signUpUser)
}


export function* resetPassword ({ payload: {email}}){
    
     try{ 
      yield call(handleResetPasswordAPI, email);
      yield put(
        resetPasswordSuccess()
    );
  
          } catch(err) {
              yield put(
                userError(err)
              )
          } 
}

export function* onResetPasswordStart(){
    yield takeLatest(userTypes.RESET_PASSWORD_START,resetPassword);
}


export function* googleSignIn(){
    try{
        const {user} = yield auth.signInWithRedirect(GoogleProvider);
        yield getSnapshotFromUserAuth(user)
     }catch(err){
        //console.log(err)
     }
}

export function* onGoogleSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START,googleSignIn)
}

// export function* phoneNumberSignIn(){
//     try{
        
//         yield configureCaptcha()
//         console.log('good')
//      }catch(err){
//         //console.log(err)
//      }
// }

// export function* onPhoneNumberSignInStart() {
//     yield takeLatest(userTypes.PHONE_NUMBER_SIGN_IN_START,phoneNumberSignIn);
// }





export default function* userSagas() {
      yield all ([
          call(onEmailSignInStart), 
          call(onCheckUserSession),
          call(onSignOutUserStart),
          call(onSignUpUserStart),
          call(onResetPasswordStart),
          call(onGoogleSignInStart),
     
        ])
}