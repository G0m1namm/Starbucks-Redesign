import { Auth } from "aws-amplify"
 
export const signOut = (callback) => {
    Auth.signOut()
    .then(user =>  {console.log(callback); callback()})
    .catch(err => console.log(err));
}