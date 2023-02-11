import { auth } from "../../firebase/utils";

export const handleResetPasswordAPI = (email) => {

    const config = {
        url: 'http://www.beherawi.com/login'
     };  

    return new Promise((resolve,reject) => {
        auth.sendPasswordResetEmail(email, config)
             .then(() => {
               resolve();
             })
             .catch (()=> {
                const err = ['Email not registered. Please try again'];
                reject(err)  
             });
    })
};