import React,{useEffect} from 'react'
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';

export default function LoginWithGoogle() {
      const clientID = "350196066760-nr69glijg6rqlr9slj0chcg6q8ie3lq2.apps.googleusercontent.com"
    
      const onSuccess = (response) => {
        console.log(response)
      }
      const onFailure = (response) => {
        console.log("Something went wrong");
      }
      useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: clientID,
          });
        }
        gapi.load("client:auth2", start);
      });
    
      return (
        <div className='btn'>
            <GoogleLogin    
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText="Continue  with Google"
            cookiePolicy={"single_host_origin"}
            />
        </div>
      );
    }
